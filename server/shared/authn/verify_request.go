package authn

import (
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
	"log"
	"net/http"
)

func WithVerifyRequest(f http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		// firebase sdk
		opt := option.WithCredentialsFile(os.Getenv("Credentials"))
		app, err := firebase.NewApp(ctx, nil, opt)
		if err != nil {
			log.Printf("[fail] failed create firebase app: %s", err.Error())
			os.Exit(1)
		}

		auth, err := app.Auth(ctx)
		if err != nil {
			log.Printf("[fail] failed create firebase app: %s", err.Error())
			os.Exit(1)
		}

		// クライアントからのjwt取得
		authHeader := r.Header.Get("AuthnToken")
		clientToken := strings.Replace(authHeader, "Bearer ", "", 1)

		// 認証
		token, err := auth.VerifyIDToken(ctx, clientToken)
		if err != nil {
			log.Printf("[fail] failed verify token : %s", err.Error())
			w.WriteHeader(http.StatusUnauthorized)
			_, _ = w.Write([]byte("error verifying ID token"))
			return
		}

		log.Printf("token is ok: %v", token)
	}
}
