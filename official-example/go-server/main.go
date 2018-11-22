package main

import (
	"fmt"
	pb "github.com/zypcloudy/grpc-web-demo/official-example/go-server/protos"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"log"
	"net"
)

const port = ":9090"

type echoServiceServer struct {
}

func newServer() *echoServiceServer {
	var server echoServiceServer
	return &server
}

func (server *echoServiceServer) Echo(ctx context.Context, request *pb.EchoRequest) (*pb.EchoResponse, error) {
	fmt.Println("Echo")
	msg := request.Message
	fmt.Println(msg)
	var response pb.EchoResponse
	response.Message = msg
	return &response, nil
}
func (server *echoServiceServer) EchoAbort(ctx context.Context, request *pb.EchoRequest) (*pb.EchoResponse, error) {
	fmt.Println("EchoAbort")
	return nil, nil
}

func (server *echoServiceServer) NoOp(context.Context, *pb.Empty) (*pb.Empty, error) {
	fmt.Println("NoOp")
	return nil, nil
}

func (server *echoServiceServer) ServerStreamingEcho(*pb.ServerStreamingEchoRequest, pb.EchoService_ServerStreamingEchoServer) error {
	fmt.Println("ServerStreamingEcho")
	return nil
}

func (server *echoServiceServer) ServerStreamingEchoAbort(*pb.ServerStreamingEchoRequest, pb.EchoService_ServerStreamingEchoAbortServer) error {
	fmt.Println("ServerStreamingEchoAbort")
	return nil
}

func (server *echoServiceServer) ClientStreamingEcho(pb.EchoService_ClientStreamingEchoServer) error {
	fmt.Println("ClientStreamingEcho")
	return nil
}
func (server *echoServiceServer) FullDuplexEcho(pb.EchoService_FullDuplexEchoServer) error {
	fmt.Println("FullDuplexEcho")
	return nil
}

func (server *echoServiceServer) HalfDuplexEcho(pb.EchoService_HalfDuplexEchoServer) error {
	fmt.Println("HalfDuplexEcho")
	return nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterEchoServiceServer(s, newServer())
	reflection.Register(s)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
