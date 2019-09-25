package main

import (
	"Dolotaglam/k_server/handler"
	"Dolotaglam/k_server/models"
	"fmt"
	"github.com/osamingo/jsonrpc"
	"log"
	"net/http"
	"os"
)

func main() {
	log.Print("[start] start main")
	defer log.Print("[end] end main")

	port := os.Getenv("PORT")
	log.Printf("port : %s", port)
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}

	// rcpサーバーのメソッド登録
	mr := jsonrpc.NewMethodRepository()

	if err := mr.RegisterMethod("K.SaveUser", handler.SaveUserHandler{}, handler.SaveUserParams{}, handler.SaveUserResult{}); err != nil {
		log.Printf(err)
	}

	if err := mr.RegisterMethod("K.SaveCard", handler.SaveCardHandler{}, SaveCardParams{}, SaveCardResult{}); err != nil {
		log.Printf(err)
	}

	// エンドポイントの登録
	http.Handle("/jrpc", mr)
	http.HandleFunc("jrpc/debug", mr.ServerDebug)

	// HTTPサーバの起動
	log.Printf("Listening on port %s", port)
	if err := http.ListenAndServe(fmt.Sprintf(":%s", port), nil); err != nil {
		log.Printf("[Fail] failed exec server :%s", err)
	}
}
