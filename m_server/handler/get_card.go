package handler

import (
	"context"
	"github.com/intel-go/fastjson"
	"github.com/osamingo/jsonrpc"
	"log"
	"m_server/dao"
	"m_server/models"
)

type (
	GetCardHandler struct{}
	GetCardParams struct{
		CardId string `json:"card_id"`
	}
	GetCardResult struct{
		Card models.Card `json:"card"`
		Message string `json:"Message"`
	}
)
func (h GetCardHandler)ServeJSONRPC(ctx context.Context, params *fastjson.RawMessage) (interface{}, *jsonrpc.Error) {
	var cp GetCardParams
	if err := jsonrpc.Unmarshal(params, &cp); err != nil {
		log.Print("[fail] failed unmarshal data")
		return GetCardResult{Card: models.Card{}, Message: "failed unmarshal data"}, err
	}

	cDao, err := dao.NewCardDao()
	if err != nil {
		log.Print("[fail] failed create card dao")
		if value, ok := err.(*jsonrpc.Error); ok {
			return GetCardResult{Card: models.Card{}, Message: "failed create firestore ref"}, value
		}
		return nil, nil
	}
	defer cDao.Client.Close()

	card, err := cDao.Get(cp.CardId)
	if err != nil {
		log.Print("[fail] failed get card from datastore")
		if value, ok := err.(*jsonrpc.Error); ok {
			return GetCardResult{Card: models.Card{}, Message: "failed get card from datasotre"}, value
		}
		return nil, nil
	}

	return GetCardResult{Card: card, Message: "complete"}, nil
}