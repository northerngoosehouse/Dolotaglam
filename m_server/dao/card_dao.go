package dao

import (
	"m_server/models"
	"cloud.google.com/go/firestore"
	"context"
	firebase "firebase.google.com/go"
	"google.golang.org/api/iterator"
	"log"
)

type CardDao struct {
	Ctx    context.Context
	Client *firestore.Client
}

func NewCardDao() (*CardDao, error) {
	cardDao := new(CardDao)

	ctx := context.Background()
	conf := &firebase.Config{ProjectID: "todo-management-line-bot"}
	app, err := firebase.NewApp(ctx, conf)
	if err != nil {
		log.Printf("%s", err.Error())
		return &CardDao{}, err
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Printf("%s", err.Error())
		return &CardDao{}, nil
	}
	// defer client.Close()

	cardDao.Ctx = ctx
	cardDao.Client = client

	return cardDao, nil
}

func (dao *CardDao) Get(cardId string) (models.Card, error) {
	cardRef, err := dao.Client.Collection("card").Doc(cardId).Get(dao.Ctx)
	if err != nil {
		return models.Card{}, err
	}
	rowUser := cardRef.Data()
	log.Printf("Document data: %#v\n", rowUser)

	card, err := models.Map2CardStruct(rowUser)
	if err != nil {
		return models.Card{}, err
	}
	return card, nil
}

func (dao *CardDao) GetAll(userId string) ([]models.Card, error) {
	ctx := context.Background()

	var cards []models.Card
	iter := dao.Client.Collection("card").Where("userId", "==", userId).Documents(ctx)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}
		card, err := models.Map2CardStruct(doc.Data())
		cards = append(cards, card)
	}

	return cards, nil
}
