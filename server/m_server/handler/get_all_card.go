package handler

import (
	"context"
	"github.com/intel-go/fastjson"
	"github.com/osamingo/jsonrpc"
	"log"
	"m_server/dao"
	"m_server/models"
)

type(
	GetAllCardHandler struct {}
	GetAllCardParams struct {
		UserId string `json:"user_id"`
	}
	GetAllCardResult struct {
		Cards []models.Card `json:"cards"`
		Message string `json:"message"`
	}
)

func (h GetAllCardHandler) ServeJSONRPC(ctx context.Context, params *fastjson.RawMessage) (interface{}, *jsonrpc.Error) {
	var cp GetAllCardParams
	if err := jsonrpc.Unmarshal(params, &cp); err != nil {
		log.Print("[fail] failed unmarshal data")
		return GetAllCardResult{Cards: []models.Card{}, Message: "failed unmarshal data"}, err
	}

	cDao, err := dao.NewCardDao()
	if err != nil {
		log.Printf("[fail] failed create card dao")
		return GetAllCardResult{Cards: []models.Card{}, Message: "failed unmarshal data"}, nil
	}
	defer cDao.Client.Close()

	cards, err := cDao.GetAll(cp.UserId)
	if err != nil {
		log.Print("[fail] failed get all cards from datastore")
		return GetAllCardResult{Cards: []models.Card{}, Message: "failed get cards from datastore"}, nil
	}

	return GetAllCardResult{Cards: cards, Message: "complete"}, nil
}
