package dao

import (
	"Dolotaglam/k_server/models"
	"cloud.google.com/go/firestore"
	"context"
	firebase "firebase.google.com/go"
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

func (dao *CardDao) Save(user models.User) error {
	_, _, err := dao.Client.Collection("card").Add(dao.Ctx, user)
	if err != nil {
		log.Printf("%s", err)
		return err
	}

	return nil
}

func (dao *CardDao) Get(userId string) (models.Card, error) {
	cardRef, err := dao.Client.Collection("card").Doc(userId).Get(dao.Ctx)
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
