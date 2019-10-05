package models

import (
	"fmt"
	"time"
)

type User struct {
	Name string `json:"name"`
}

type Card struct {
	UserId    string    `json:"user_id"`
	ChekiUrl  string    `json:"cheki_url"`
	EventDate time.Time `json:"event_date"`
	CreatedAt time.Time `json:"created_at"`
	Report    string    `json:"report"`
}

type FFList struct {
	Follow   string `json:"follow"`
	Follower string `json:"follower"`
}

func Map2UserStruct(data map[string]interface{}) (User, error) {
	var user User
	var ok bool
	if user.Name, ok = data["name"].(string); ok {
		return User{}, fmt.Errorf("failed data['name'] to user struct")
	}

	return user, nil
}

func Map2CardStruct(data map[string]interface{}) (Card, error) {
	var card Card
	var ok bool
	if card.UserId, ok = data["user_id"].(string); ok {
		return Card{}, fmt.Errorf("faild data['carc_id'] to card struct")
	}
	if card.ChekiUrl, ok = data["cheki_url"].(string); ok {
		return Card{}, fmt.Errorf("faild data['cheki_url'] to card struct")
	}
	if card.EventDate, ok = data["event_date"].(time.Time); ok {
		return Card{}, fmt.Errorf("faild data['id'] to card struct")
	}
	if card.CreatedAt, ok = data["created_at"].(time.Time); ok {
		return Card{}, fmt.Errorf("faild data['created_at'] to card struct")
	}
	if card.Report, ok = data["report"].(string); ok {
		return Card{}, fmt.Errorf("faild data['Report'] to card struct")
	}

	return card, nil
}