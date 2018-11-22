#!/usr/bin/env bash
protoc -I=../protos login.proto \
--js_out=import_style=commonjs:../frontend-vue/src/protos \
--grpc-web_out=import_style=commonjs,mode=grpcwebtext:../frontend-vue/src/protos
