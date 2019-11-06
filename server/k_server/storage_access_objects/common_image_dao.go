package storage_access_objects

import (
	"cloud.google.com/go/storage"
	"context"
)

type CommonImageDao struct {
	Ctx context.Context
	Client *storage.Client
}

type Image interface {
	PublishImage(key string)
}

func (dao *CommonImageDao)PublishImage(bucketName string, objName string) error {
	// 保存したデータの一般公開の設定
	acl := dao.Client.Bucket(bucketName).Object(objName).ACL()
	if err := acl.Set(dao.Ctx, storage.AllUsers, storage.RoleReader); err != nil {
		return err
	}

	return nil
}
