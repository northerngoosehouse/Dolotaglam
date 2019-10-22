package storage_access_objects

import (
	"cloud.google.com/go/storage"
	"context"
	"encoding/base64"
	"log"
)

type TopImageDao struct {
	CommonImageDao
	BucketName string
}

func NewTopImageDao() (*TopImageDao, error) {
	ctx := context.Background()

	client, err := storage.NewClient(ctx)
	if err != nil {
	log.Printf("failed to create gcs client : %v", err)
	return nil, err
	}

	var d TopImageDao
	Ctx = ctx
	Client = client
	d.BucketName = "user_image"
	return &d, nil
}

func (dao *TopImageDao)Store(data string, email string) error {
	log.Printf("[start] store image data for gcs")
	defer log.Printf("[end] store image data for gcs")
	bucketName := "user_image" // GCSバケット名
	objName := email

	// GCS writer
	w := dao.Client.Bucket(bucketName).Object(objName).NewWriter(Ctx)
	defer w.Close()
	w.ContentType = "image/png" // 任意のContentTypeに置き換える

	// 保存するデータのデコード
	imageData, err := base64.StdEncoding.DecodeString(data)
	if err != nil {
		return err
	}

	// upload : write object body
	if _, err := w.Write(imageData); err != nil {
		log.Printf("failed to write object body : %v", err)
		return err
	}

	return nil
}
