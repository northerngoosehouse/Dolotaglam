package main

import (
	"fmt"
	"github.com/osamingo/jsonrpc"
	"log"
	"m_server/handler"
	"net/http"
	"os"
)

func main(){
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

	if err := mr.RegisterMethod("K.GetUser", handler.GetUserHandler{}, handler.GetUserParams{}, handler.GetUserResult{}); err != nil {
		log.Print(err)
	}

	if err := mr.RegisterMethod("K.GetCard", handler.GetCardHandler{}, handler.GetCardParams{}, handler.GetCardResult{}); err != nil {
		log.Print(err)
	}
	if err := mr.RegisterMethod("K.GetAllCard", handler.GetAllCardHandler{}, handler.GetAllCardParams{}, handler.GetAllCardResult{}); err != nil {
		log.Print(err)
	}

	// エンドポイントの登録
	http.Handle("/jrpc", mr)
	http.HandleFunc("/jrpc/debug", mr.ServeDebug)

	// HTTPサーバの起動
	log.Printf("Listening on port %s", port)
	if err := http.ListenAndServe(fmt.Sprintf(":%s", port), nil); err != nil {
		log.Printf("[Fail] failed exec server :%s", err)
	}
}
