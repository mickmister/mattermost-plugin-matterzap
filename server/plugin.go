package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"sync"
	"text/template"

	"github.com/mattermost/mattermost-server/v6/plugin"
)

// Plugin implements the interface expected by the Mattermost server to communicate between the server and plugin processes.
type Plugin struct {
	plugin.MattermostPlugin

	// configurationLock synchronizes access to the configuration.
	configurationLock sync.RWMutex

	// configuration is the active plugin configuration. Consult getConfiguration and
	// setConfiguration for usage.
	configuration *configuration
}

// ServeHTTP demonstrates a plugin that handles HTTP requests by greeting the world.
func (p *Plugin) ServeHTTP(c *plugin.Context, w http.ResponseWriter, r *http.Request) {
	switch {
	case r.URL.Path == "/run-template":
		p.runTemplate(w, r)
		return
	case r.URL.Path == "/webhooks" || strings.HasPrefix(r.URL.Path, "/webhooks/"):
		p.handleWebhooksRoute(w, r)
		return
	}

	fmt.Fprint(w, "Hello, world!")
}

func (p *Plugin) handleWebhooksRoute(w http.ResponseWriter, r *http.Request) {
	switch {
	case r.URL.Path == "/webhooks" && r.Method == "GET":
		p.httpGetWebhooks(w, r)
		return
	case r.URL.Path == "/webhooks" && r.Method == "POST":
		p.httpCreateWebhook(w, r)
		return
	}

	webhookID := strings.TrimPrefix(r.URL.Path, "/webhooks/")
	switch {
	case r.Method == "GET":
		p.httpGetWebhook(w, r, webhookID)
		return
	case r.Method == "POST":
		p.httpRunWebhook(w, r, webhookID)
		return
	}
}

func (p *Plugin) runTemplate(w http.ResponseWriter, r *http.Request) {
	if r.Header.Get("Mattermost-User-Id") == "" {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	templateString := r.URL.Query().Get("template")
	dataString := r.URL.Query().Get("data")

	var data map[string]interface{}
	err := json.Unmarshal([]byte(dataString), &data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	t := template.New("main")
	t.Funcs(template.FuncMap{
		"userID": func(username string) string {
			user, appErr := p.API.GetUserByUsername(username)
			if appErr != nil {
				return "error: " + appErr.Error()
			}

			return user.Id
		},
	})

	tpl, err := t.Parse(templateString)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = tpl.ExecuteTemplate(w, "main", data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

// See https://developers.mattermost.com/extend/plugins/server/reference/
