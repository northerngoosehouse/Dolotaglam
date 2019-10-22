package dao

import (
	cdatastore "cloud.google.com/go/datastore"
	"context"
	"go.mercari.io/datastore"
	"go.mercari.io/datastore/clouddatastore"
	"k_server/models"
	"log"
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

func (dao *UserDao) Save(user models.User) error {
	log.Printf("[start] start save on user dao")
	defer log.Printf("[end] end save on user dao")
	key := dao.Client.IncompleteKey("user", nil)

	log.Printf("user : %v", user)
	key, err := dao.Client.Put(dao.Ctx, key, &user)
	if err != nil {
		log.Printf("[fail] failed save user for datastore : %s", err.Error())
		return err
	}
	return nil
}

/*
func (dao *UserDao) Get(userId string) (models.User, error) {
	log.Printf("[start] start get user on user dao")
	defer log.Printf("[end] end get user on user dao")
	key
}
*/
