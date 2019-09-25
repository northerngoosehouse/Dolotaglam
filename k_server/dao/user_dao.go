package dao

import (
	"Dolotaglam/k_server/models"
	"cloud.google.com/go/firestore"
	"context"
	firebase "firebase.google.com/go"
	"fmt"
	"log"
)

type UserDao struct {
	Ctx    context.Context
	Client *firestore.Client
}

func NewUserDao() (*UserDao, error) {
	userDao := new(UserDao)

	ctx := context.Background()
	conf := &firebase.Config{ProjectID: "todo-management-line-bot"}
	app, err := firebase.NewApp(ctx, conf)
	if err != nil {
		log.Printf("%s", err.Error())
		return &UserDao{}, err
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Printf("%s", err.Error())
		return &UserDao{}, nil
	}
	// defer client.Close()

	userDao.Ctx = ctx
	userDao.Client = client

	return userDao, nil
}

func (dao *UserDao) Save(user models.User) error {
	_, _, err := dao.Client.Collection("user").Add(dao.Ctx, user)
	if err != nil {
		log.Printf("%s", err)
		return err
	}

	return nil
}

func (dao *UserDao) Get(userId string) (models.User, error) {
	userRef, err := dao.Client.Collection("user").Doc(userId).Get(dao.Ctx)
	if err != nil {
		return models.User{}, err
	}
	rowUser := userRef.Data()
	log.Printf("Document data: %#v\n", rowUser)

	user, err := models.Map2UserStruct(rowUser)
	if err != nil {
		return models.User{}, err
	}
	return user, nil
}
