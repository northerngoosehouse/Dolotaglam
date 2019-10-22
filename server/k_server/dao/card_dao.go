package dao

import (
	cdatastore "cloud.google.com/go/datastore"
	"context"
	"go.mercari.io/datastore"
	"go.mercari.io/datastore/clouddatastore"
	"k_server/models"
	"log"
)

type CardDao struct {
	Ctx    context.Context
	Client datastore.Client
}

func NewCardDao() (*CardDao, error) {
	ctx := context.Background()

	dsClient, err := cdatastore.NewClient(ctx, "dolotagram-254717")
	if err != nil {
		log.Printf("[fail] failed create cloud datastore client")
		return nil, err
	}

	client, err := clouddatastore.FromClient(ctx, dsClient)
	if err != nil {
		log.Printf("[fail] failed create client for cloud datastore")
		return nil, err
	}

	var cardDao CardDao
	cardDao.Ctx = ctx
	cardDao.Client = client

	return &cardDao, nil
}

func (dao *CardDao) Save(card models.Card) error {
	log.Printf("[start] start save on user dao")
	defer log.Printf("[end] end save on user dao")
	key := dao.Client.IncompleteKey("card", nil)

	log.Printf("card : %v", card)
	key, err := dao.Client.Put(dao.Ctx, key, &card)
	if err != nil {
		log.Printf("[fail] failed save user for datastore : %s", err.Error())
		return err
	}
	return nil
}

/*
func (dao *CardDao) Get(cardId string) (models.Card, error) {
	cardRef, err := dao.Client.Collection("card").Doc(cardId).Get(dao.Ctx)
	if err != nil {
		return models.Card{}, err
	}
	rowCard := cardRef.Data()
	log.Printf("Document data: %#v\n", rowCard)

	card, err := models.Map2CardStruct(rowCard)
	if err != nil {
		return models.Card{}, err
	}
	return card, nil
}

 */
