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

type(
	GetAllCardHandler struct {}
	GetAllCardParams struct {
		userId string
	}
	GetAllCardResult struct {
		status int
		cards []models.Card
		message string
	}
)

func (h GetAllCardHandler) ServeJSONRPC(ctx context.Context, params *fastjson.RawMessage) (interface{}, *jsonrpc.Error) {
	var cp GetAllCardParams
	if err := jsonrpc.Unmarshal(params, &cp); err != nil {
		log.Print("[fail] failed unmarshal data")
		return GetAllCardResult{status: http.StatusBadRequest, cards: []models.Card{}, message: "failed unmarshal data"}, err
	}

	cDao, err := dao.NewCardDao()
	if err != nil {
		log.Printf("[fail] failed create card dao")
		return GetAllCardResult{status: http.StatusInternalServerError, cards: []models.Card{}, message: "failed unmarshal data"}, nil
	}

	cards, err := cDao.GetAll(cp.userId)
	if err != nil {
		log.Print("[fail] failed get all cards from datastore")
		return GetAllCardResult{status: http.StatusInternalServerError, cards: []models.Card{}, message: "failed get cards from datastore"}, nil
	}

	return GetAllCardResult{status: http.StatusOK, cards: cards, message: "complete"}, nil
}
