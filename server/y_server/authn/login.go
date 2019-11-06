package authn

import (
	"context"
	"github.com/intel-go/fastjson"
	"github.com/osamingo/jsonrpc"
	"time"
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
}
