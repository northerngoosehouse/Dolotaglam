package handler

import (
	"Dolotaglam/k_server/dao"
	"Dolotaglam/k_server/models"
	"context"
	"github.com/intel-go/fastjson"
	"github.com/osamingo/jsonrpc"
	"google.golang.org/api/chat/v1"
)

type (
	SaveCardHandler struct{}
	SaveCardParams  struct {
		card models.Card
	}
	SaveCardResult struct {
		message string
	}
)

func (h SaveUserHandler) SaveCard(ctx context.Context, data *fastjson.RawMessage) (interface{}, *jsonrpc.Error) {

	var card models.Card
	if err := jsonrpc.Unmarshal(data, &card); err != nil {
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

	return SaveCardResult{message: "complete save user"}, nil
}
