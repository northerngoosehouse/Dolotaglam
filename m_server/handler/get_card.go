package handler

import (
	"m_server/dao"
	"m_server/models"
	"context"
	"github.com/intel-go/fastjson"
	"github.com/osamingo/jsonrpc"
	"log"
	"net/http"
)

type (
	GetCardHandler struct{}
	GetCardParams struct{
		cardId string
	}
	GetCardResult struct{
		status int
		card models.Card
		message string
	}
)
func (h GetCardHandler)ServeJSONRPC(ctx context.Context, params *fastjson.RawMessage) (interface{}, *jsonrpc.Error) {
	var cp GetCardParams
	if err := jsonrpc.Unmarshal(params, &cp); err != nil {
		log.Print("[fail] failed unmarshal data")
		return GetCardResult{status: http.StatusBadRequest, card: models.Card{}, message: "failed unmarshal data"}, err
	}

	cDao, err := dao.NewCardDao()
	if err != nil {
		log.Print("[fail] failed create card dao")
		if value, ok := err.(*jsonrpc.Error); ok {
			return GetCardResult{status: http.StatusInternalServerError, card: models.Card{}, message: "failed create firestore ref"}, value
		}
		return nil, nil
	}

	card, err := cDao.Get(cp.cardId)
	if err != nil {
		log.Print("[fail] failed get card from datastore")
		if value, ok := err.(*jsonrpc.Error); ok {
			return GetCardResult{status: http.StatusInternalServerError, card: models.Card{}, message: "failed get card from datasotre"}, value
		}
		return nil, nil
	}

	return GetCardResult{status: http.StatusOK, card: card, message: "complete"}, nil
}