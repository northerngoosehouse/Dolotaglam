package main

import (
	"fmt"
	"github.com/osamingo/jsonrpc"
	"k_server/handler"
	"log"
	"net/http"
	"os"
)

func main() {
	log.Printf("[start] start main")
	defer log.Printf("[end] end main")

	port := os.Getenv("PORT")
	log.Printf("port : %s", port)
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}

	// rcpサーバーのメソッド登録
	mr := jsonrpc.NewMethodRepository()

	if err := mr.RegisterMethod("K.SaveUser", handler.SaveUserHandler{}, handler.SaveUserParams{}, handler.SaveUserResult{}); err != nil {
		log.Printf("%s", err.Error())
	}

	if err := mr.RegisterMethod("K.SaveCard", handler.SaveCardHandler{}, handler.SaveCardParams{}, handler.SaveCardResult{}); err != nil {
		log.Printf("%s", err.Error())
	}

	// エンドポイントの登録
	http.Handle("/jrpc", mr)
	http.HandleFunc("jrpc/debug", mr.ServeDebug)

	// HTTPサーバの起動
	log.Printf("Listening on port %s", port)
	if err := http.ListenAndServe(fmt.Sprintf(":%s", port), nil); err != nil {
		log.Printf("[Fail] failed exec server :%s", err)
	}
}
