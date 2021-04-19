package main

import (
	"html/template"
	"io"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

const (
	DefaultServerPort = "8080"
)

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func main() {
	serverPort := os.Getenv("SERVER_PORT")
	if serverPort == "" {
		serverPort = DefaultServerPort
	}

	t := &Template{
		templates: template.Must(template.ParseGlob("/web/templates/*.html.tmpl")),
	}
	// Echo instance
	e := echo.New()
	e.Renderer = t

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Routes
	e.GET("/", home)

	e.Logger.Fatal(e.Start(":" + serverPort))
}

func home(c echo.Context) error {
	return c.Render(http.StatusOK, "home", nil)
}
