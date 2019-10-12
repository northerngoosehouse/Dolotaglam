package dao

import (
	cdatastore "cloud.google.com/go/datastore"
	"context"
	"go.mercari.io/datastore"
	"go.mercari.io/datastore/clouddatastore"
	"log"
	"m_server/models"
	"strconv"
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

func (dao *CardDao) Get(cardId string) (models.Card, error) {
	log.Printf("[start Mserver] cdao get")
	defer log.Printf("[end Mserver] cdao get")

	cardIdInt, err := strconv.ParseInt(cardId, 10, 64)
	if err != nil {
		log.Printf("[fail] failed strconv a to i")
		return models.Card{}, err
	}
	key := dao.Client.IDKey("card", cardIdInt, nil)

	var card models.Card
	err = dao.Client.Get(dao.Ctx, key, &card)
	if err != nil {
		log.Printf("[fail] failed get card from datastore : %s", err.Error())
		return models.Card{},err
	}
	card.Id = cardId
	return card, err
}

func (dao *CardDao) GetAll(userId string) ([]models.Card, error) {
	log.Printf("[start] card getAll")
	defer log.Printf("[end Mserver] card getAll")

	query := dao.Client.NewQuery("card").Filter("UserId = ", userId)

	var cards []models.Card
	keys, err := dao.Client.GetAll(dao.Ctx, query, &cards)
	if err != nil {
		log.Printf("[fail] failed get all card from datastore : %s", err.Error())
		return nil, err
	}
	for i, key := range keys {
		cards[i].Id = key.String()
	}
	return cards, nil
}
