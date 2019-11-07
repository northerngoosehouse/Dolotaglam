package handler

import (
	"context"
	"github.com/intel-go/fastjson"
	"github.com/osamingo/jsonrpc"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
	"log"
	"os"
)

type (
	LoginHandler struct{}
	LoginParams  struct {
		UserId string `json:"user_id"`
		Password string `json:"password"`
	}
	LoginResult struct {
		Message string `json:"message"`
	}
)

func (h LoginHandler) ServeJSONRPC(ctx context.Context, data *fastjson.RawMessage) (interface{}, *jsonrpc.Error) {
	// JWTの認証と、メアド、パスワードの認証
	opt := option.WithCredentialsFile(os.Getenv("CREDENTIALS"))
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		log.Printf("[fail] failed create firebase app: %s", err.Error())
		return LoginResult{Message: "internal server error"}, nil
	}
	auth, err := app.Auth(ctx)
	if err != nil {
		log.Printf("[fail' failed create firebase app: %s", err.Error())
		return LoginResult{Message: "internal server error"}, nil
	}

	// クライアントからのJWT取得

	authJwt :=
}
