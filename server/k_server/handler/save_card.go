package handler

import (
	"context"
	"fmt"
	"github.com/google/uuid"
	"github.com/intel-go/fastjson"
	"github.com/osamingo/jsonrpc"
	"k_server/dao"
	"k_server/models"
	s_dao "k_server/storage_access_objects"
	"log"
	"time"
)

const (
	CARD_GCS_URL = "http://storage.googleapis.com/card_image"
)

type (
	SaveCardHandler struct{}
	SaveCardParams  struct {
		UserId    string    `json:"user_id"`
		ChekiData string    `json:"cheki_data"`
		EventDate time.Time `json:"event_date"`
		CreatedAt time.Time `json:"created_at"`
		Report    string    `json:"report"`
	}
	SaveCardResult struct {
		Message string `json:"message"`
	}
)

func (h SaveCardHandler) ServeJSONRPC(ctx context.Context, data *fastjson.RawMessage) (interface{}, *jsonrpc.Error) {
	log.Printf("[start] save card")
	defer log.Printf("[end] save card")

	var cp SaveCardParams
	if err := jsonrpc.Unmarshal(data, &cp); err != nil {
		return SaveCardResult{Message: "failed unmarshal data"}, err
	}
	// リクエストの中身確認
	log.Printf("[info] content of request : %v", cp)
	// データの中身を確認
	log.Printf("[info] image data : %s", cp.ChekiData[:5])

	cDao, err := dao.NewCardDao()
	if err != nil {
		log.Printf("[fail] failed create card dao")
		return SaveCardResult{Message: "failed save card method"}, nil
	}
	defer cDao.Client.Close()

	// cardのuuidを生成
	id, err := uuid.NewUUID()
	if err != nil {
		log.Printf("[fail] failed create uuid for card id : %s", err)
		return nil, nil
	}
	uuId := id.String()

	// idを利用して、画像のデータをgcsに保存
	iDao, err := s_dao.NewImageDao()
	if err != nil {
		log.Printf("[fail] failed create image dao : %s", err.Error())
		return nil, nil
	}
	defer iDao.Client.Close()
	err = iDao.Store(cp.ChekiData, uuId)
	if err != nil {
		log.Printf("[fail] failed store card image data for gcs : %s", err.Error())
		return SaveCardResult{Message: "failed store card image data for gcs"}, nil
	}

	// gcsの画像を一般公開
	err = iDao.PublishImage(uuId, iDao.BucketName)
	if err != nil {
		log.Printf("[fail] failed publish card image data : %s", err.Error())
		return SaveCardResult{Message: "failed publish card image data"}, nil
	}

	// 画像のurlを作成
	imageUrl := fmt.Sprintf("%s/%s", CARD_GCS_URL, uuId)

	log.Printf("%s", imageUrl)
	log.Printf("uuid:%s", uuId)

	card := models.Card{
		Id:        uuId,
		UserId:    cp.UserId,
		ChekiUrl:  imageUrl,
		EventDate: cp.EventDate,
		CreatedAt: cp.CreatedAt,
		Report:    cp.Report,
	}
	err = cDao.Save(card)
	if err != nil {
		log.Printf("[fail] failed save card : %s ", err.Error())
		return SaveCardResult{Message: "failed save card for datastore"}, nil
	}

	return SaveCardResult{Message: "complete save card"}, nil
}
