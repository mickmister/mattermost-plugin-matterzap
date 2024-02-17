package main

import (
	"encoding/json"
	"net/http"
)

const (
	KVWebhookPrefix = "webhook-"
	KVWebhookIndex  = "webhooks"
)

type Zap struct {
	ID                string   `json:"id"`
	Name              string   `json:"name"`
	ChannelIDs        []string `json:"channel_ids"`
	MessageTemplate   string   `json:"message_template"`
	ConditionTemplate string   `json:"condition_template"`
	UserID            string   `json:"user_id"`
}

type Webhook struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	UserID string `json:"user_id"`
}

type WebhookIndex []*Webhook

func (p *Plugin) httpGetWebhooks(w http.ResponseWriter, r *http.Request) {
	b, appErr := p.API.KVGet(KVWebhookIndex)
	if appErr != nil {
		http.Error(w, "failed to get webhook index: "+appErr.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")

	if len(b) == 0 {
		w.Write([]byte("[]"))
		return
	}

	w.Write(b)
}

func (p *Plugin) err(w http.ResponseWriter, r *http.Request, errString string) {
	http.Error(w, errString, http.StatusInternalServerError)
	p.API.LogError(errString)
}

func (p *Plugin) httpCreateWebhook(w http.ResponseWriter, r *http.Request) {
	b, appErr := p.API.KVGet(KVWebhookIndex)
	if appErr != nil {
		p.err(w, r, "failed to get webhook index: "+appErr.Error())
		return
	}

	webhookIndex := WebhookIndex{}
	if len(b) > 0 {
		err := json.Unmarshal(b, &webhookIndex)
		if err != nil {
			p.err(w, r, "failed to marshal webhook index: "+err.Error())
			return
		}
	}

	var web Webhook
	err := json.NewDecoder(r.Body).Decode(&web)
	if err != nil {
		p.err(w, r, "failed to unmarshal webhook definition: "+err.Error())
		return
	}
	r.Body.Close()

	indexBytes, err := json.Marshal(webhookIndex)
	if err != nil {
		p.err(w, r, "failed to marshal webhook index: "+err.Error())
		return
	}

	appErr = p.API.KVSet(KVWebhookIndex, indexBytes)
	if appErr != nil {
		p.err(w, r, "failed to save webhook index: "+appErr.Error())
		return
	}

	w.Header().Add("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(web)
	if err != nil {
		p.err(w, r, "failed to write response: "+err.Error())
		return
	}
}

func (p *Plugin) httpGetWebhook(w http.ResponseWriter, r *http.Request, webhookID string) {
}

func (p *Plugin) httpRunWebhook(w http.ResponseWriter, r *http.Request, webhookID string) {
}
