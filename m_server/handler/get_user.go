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
		userId string
	}
	GetUserResult struct{
		user models.User
		message string
	}
)

func (h GetUserHandler)ServeJSONRPC(ctx context.Context, params *fastjson.RawMessage) (interface{}, *jsonrpc.Error) {
	var up GetUserParams
	if err := jsonrpc.Unmarshal(params, &up); err != nil {
		return nil, err
	}

	uDao, err := dao.NewUserDao()
	if err != nil {
		log.Printf("[fail] failed create user dao")
		if value, ok := err.(*jsonrpc.Error); ok {
			return nil, value
		}
		return nil, nil
	}

	user, err := uDao.Get(up.userId)
	if err != nil {
		log.Printf("[fial] failed get user from datastore: %s", err.Error())
		if value, ok := err.(*jsonrpc.Error); ok {
			return nil, value
		}
		return nil, nil
	}

	return GetUserResult{user: user, message: "complete!"}, nil
}
