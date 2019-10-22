package handler

import (
	"context"
	"fmt"
	"github.com/intel-go/fastjson"
	"github.com/osamingo/jsonrpc"
	"k_server/dao"
	"k_server/models"
	sDao "k_server/storage_access_objects"
	"log"
)

const (
	USER_GCS_URL = "http://storage.googleapis.com/user_image"
)

type (
	SaveUserHandler struct{}
	SaveUserParams  struct {
		Name string `json:"name"`
		MailAddress string `json:"mail_address"`
		TopImage string `json:"top_image"`
	}
	SaveUserResult struct {
		Message string `json:"message"`
	}
)

func (h SaveUserHandler) ServeJSONRPC(ctx context.Context, data *fastjson.RawMessage) (interface{}, *jsonrpc.Error) {
	log.Print("[start] save user")
	defer log.Print("[end] save user")

	log.Printf("rowUser data : %v", data)

	var up SaveUserParams
	if err := jsonrpc.Unmarshal(data, &up); err != nil {
		return SaveUserResult{Message: "failed unmarshal data"}, err
	}
	log.Printf("userdata from request : %v", up)

	uDao, err := dao.NewUserDao()
	if err != nil {
		log.Printf("[fail] create user dao")
		return SaveUserResult{Message: "failed save user method"}, nil
	}
	defer uDao.Client.Close()

	// トプ画の保存
	tDao, err := sDao.NewTopImageDao()
	if err != nil {
		log.Printf("[fail] failed create top image dao : %s", err.Error())
		return SaveUserResult{Message: "failed save user top image"}, nil
	}
	defer tDao.Client.Close()

	err = tDao.Store(up.TopImage, up.MailAddress)
	if err != nil {
		log.Printf("[fail] failed save user top image : %s", err.Error())
		return SaveUserResult{Message: "failed save user top image"}, nil
	}

	// gcsの画像を一般公開
	err = tDao.PublishImage(tDao.BucketName, up.MailAddress)
	if err != nil {
		log.Printf("[fail] failed publish user top image data : %s", err.Error())
		return SaveCardResult{Message: "failed publish user top image data"}, nil
	}

	// トプ画のurl取得
	imageUrl := fmt.Sprintf("%s/%s", USER_GCS_URL, up.MailAddress)
	log.Printf("[info] user top image url : %s", imageUrl)

	// ユーザーデータの保存
	user := models.User{
		Name: up.Name,
		MailAddress: up.MailAddress,
		TopImageUrl: imageUrl,
	}
	log.Printf("servejsonrpc : %v", user)
	err = uDao.Save(user)
	if err != nil {
		log.Printf("[fail] save user")
		return SaveUserResult{Message: "failed save user for data store"}, nil
	}

	return SaveUserResult{Message: "complete save user"}, nil
}
