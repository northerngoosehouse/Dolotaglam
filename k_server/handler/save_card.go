package handler

import (
	"context"
	"github.com/intel-go/fastjson"
	"github.com/osamingo/jsonrpc"
	"k_server/dao"
	"k_server/models"
	"log"
	"time"
)

type (
	SaveCardHandler struct{}
	SaveCardParams  struct {
		UserId    string    `json:"user_id"`
		ChekiUrl  string    `json:"cheki_url"`
		EventDate time.Time `json:"event_date"`
		CreatedAt time.Time `json:"created_at"`
		Report    string    `json:"report"`
	}
	SaveCardResult struct {
		Message string `json:"message"`
	}
)

func (h SaveCardHandler) ServeJSONRPC(ctx context.Context, data *fastjson.RawMessage) (interface{}, *jsonrpc.Error) {

	var cp SaveCardParams
	log.Printf("1")
	if err := jsonrpc.Unmarshal(data, &cp); err != nil {
		return SaveCardResult{Message: "failed unmarshal data"}, err
	}
	log.Printf("2")

	cDao, err := dao.NewCardDao()
	if err != nil {
		log.Printf("[fail] failed create card dao")
		return SaveCardResult{Message: "failed save card method"}, nil
	}
	defer cDao.Client.Close()

	card := models.Card{
		UserId: cp.UserId,
		ChekiUrl: cp.ChekiUrl,
		EventDate: cp.EventDate,
		CreatedAt: cp.CreatedAt,
		Report: cp.Report,
		}
	err = cDao.Save(card)
	if err != nil {
		log.Printf("[fail] failed save card")
		return SaveCardResult{Message: "failed save card for datastore"}, nil
	}

	return SaveCardResult{Message: "complete save card"}, nil
}
