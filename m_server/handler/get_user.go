package handler

import (
	"m_server/dao"
	"m_server/models"
	"context"
	"github.com/intel-go/fastjson"
	"github.com/osamingo/jsonrpc"
	"log"
)

type(
	GetUserHandler struct{}
	GetUserParams struct{
		UserId string `json:"user_id"`
	}
	GetUserResult struct{
		User models.User `json:"user"`
		Message string `json:"message"`
	}
)

func (h GetUserHandler)ServeJSONRPC(ctx context.Context, params *fastjson.RawMessage) (interface{}, *jsonrpc.Error) {
	log.Printf("[start] start get user on jsonrpc")
	defer log.Printf("[end] end get user on jsonrpc")
	var up GetUserParams
	if err := jsonrpc.Unmarshal(params, &up); err != nil {
		return GetUserResult{User: models.User{}, Message:"failed unmarshal"}, err
	}

	uDao, err := dao.NewUserDao()
	if err != nil {
		log.Printf("[fail] failed create user dao")
		if value, ok := err.(*jsonrpc.Error); ok {
			return nil, value
		}
		return nil, nil
	}
	defer uDao.Client.Close()

	user, err := uDao.Get(up.UserId)
	if err != nil {
		log.Printf("[fial] failed get user from datastore: %s", err.Error())
		if value, ok := err.(*jsonrpc.Error); ok {
			return nil, value
		}
		return nil, nil
	}

	return GetUserResult{User: user, Message: "complete!"}, nil
}
