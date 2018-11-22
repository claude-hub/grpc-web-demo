#!/usr/bin/env bash

protoc -I=../protos login.proto \
--go_out=plugins=grpc:../backend-go/protos
