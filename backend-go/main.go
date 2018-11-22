package main

import (
	"fmt"
	pb "github.com/zypcloudy/grpc-web-demo/backend-go/protos"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"log"
	"net"
)

const port = ":9090"

type loginServiceServer struct {
}

func newServer() *loginServiceServer {
	var server loginServiceServer
	return &server
}

func (server *loginServiceServer) Login(ctx context.Context, request *pb.LoginRequest) (*pb.LoginResponse, error) {
	account := request.Account
	fmt.Println(account)
	password := request.Password
	fmt.Println(password)
	var response pb.LoginResponse
	response.Account = account
	response.Message = "success"
	response.Name = "carl"
	return &response, nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterLoginServiceServer(s, newServer())
	reflection.Register(s)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
