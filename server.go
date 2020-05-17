package main

import (
	"fmt"
	"log"
	"net/http"
)

const port = 8080

func main() {
	log.Printf("Starting file server at %d port\n", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), http.FileServer(http.Dir("."))))
}
