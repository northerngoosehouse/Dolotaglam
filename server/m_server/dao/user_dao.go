package dao

import (
	"go.mercari.io/datastore"
	"go.mercari.io/datastore/clouddatastore"
	"m_server/models"
	"context"
	"log"
	cdatastore "cloud.google.com/go/datastore"
	"strconv"
)

type UserDao struct {
	Ctx    context.Context
	Client datastore.Client
}

func NewUserDao() (*UserDao, error) {
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

	var userDao UserDao
	userDao.Ctx = ctx
	userDao.Client = client

	return &userDao, nil
}


func (dao *UserDao) Get(userId string) (models.User, error) {
	log.Printf("[start] start get user")
	defer log.Printf("[end] end get user")
	id, err := strconv.ParseInt(userId, 10, 64)
	if err != nil {
		log.Printf("[fail] failed parse stringId to int64 Id : %s", err.Error())
	}
	key := dao.Client.IDKey("user", id,nil)

	var user models.User
	if err := dao.Client.Get(dao.Ctx, key, &user); err != nil {
		log.Printf("[fail] failed get user from datastore : %s", err.Error())
		return models.User{}, err
	}
	user.Id = userId

	return user, nil
}
