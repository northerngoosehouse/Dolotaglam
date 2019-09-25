package handler

import (
	"Dolotaglam/k_server/dao"
	"Dolotaglam/k_server/models"
	"context"
	"github.com/intel-go/fastjson"
	"github.com/osamingo/jsonrpc"
)

type (
	SaveUserHandler struct{}
	SaveUserParams  struct {
		user models.User
	}
	SaveUserResult struct {
		message string
	}
)

func (h SaveUserHandler) SaveUser(ctx context.Context, data *fastjson.RawMessage) (interface{}, *jsonrpc.Error) {

	var user models.User
	if err := jsonrpc.Unmarshal(data, &user); err != nil {
		return nil, err
	}

	uDao, err := dao.NewUserDao()
	if err != nil {
		return nil, err
	}

	err = uDao.Save(user)
	if err != nil {
		return nil, err
	}

	return SaveUserResult{message: "complete save user"}, nil
}
