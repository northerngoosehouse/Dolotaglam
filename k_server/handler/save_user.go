package handler

import (
	"context"
	"github.com/intel-go/fastjson"
	"github.com/osamingo/jsonrpc"
	"k_server/dao"
	"k_server/models"
	"log"
)

type (
	SaveUserHandler struct{}
	SaveUserParams  struct {
		Name string `json:"name"`
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

	user := models.User{Name: up.Name}
	log.Printf("servejsonrpc : %v", user)
	err = uDao.Save(user)
	if err != nil {
		log.Printf("[fail] save user")
		return SaveUserResult{Message: "failed save user for datastore"}, nil
	}

	return SaveUserResult{Message: "complete save user"}, nil
}
