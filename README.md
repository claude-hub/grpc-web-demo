### 准备envoy代理

```
docker pull envoyproxy/envoy
docker run -d -p 8080:8080 -v /home/carl/config/envoy/envoy.yaml:/etc/envoy/envoy.yaml --restart=always  envoyproxy/envoy
```

envoy.yaml 配置如下,最后一行的监听是宿主机的ip,通过ifconfig,找到docker0的ip
```
admin:
  access_log_path: /tmp/admin_access.log
  address:
    socket_address: { address: 0.0.0.0, port_value: 9901 }

static_resources:
  listeners:
  - name: listener_0
    address:
      socket_address: { address: 0.0.0.0, port_value: 8080 }
    filter_chains:
    - filters:
      - name: envoy.http_connection_manager
        config:
          codec_type: auto
          stat_prefix: ingress_http
          route_config:
            name: local_route
            virtual_hosts:
            - name: local_service
              domains: ["*"]
              routes:
              - match: { prefix: "/" }
                route:
                  cluster: echo_service
                  max_grpc_timeout: 0s
              cors:
                allow_origin:
                - "*"
                allow_methods: GET, PUT, DELETE, POST, OPTIONS
                allow_headers: keep-alive,user-agent,cache-control,content-type,content-transfer-encoding,custom-header-1,x-accept-content-transfer-encoding,x-accept-response-streaming,x-user-agent,x-grpc-web,grpc-timeout
                max_age: "1728000"
                expose_headers: custom-header-1,grpc-status,grpc-message
                enabled: true
          http_filters:
          - name: envoy.grpc_web
          - name: envoy.cors
          - name: envoy.router
  clusters:
  - name: echo_service
    connect_timeout: 0.25s
    type: logical_dns
    http2_protocol_options: {}
    lb_policy: round_robin
    hosts: [{ socket_address: { address: 172.17.0.1, port_value: 9090 }}]
```

### Postgresql安装

`docker run --name postgres01 -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d --restart=always postgres`

```
CREATE USER root WITH PASSWORD 'root';

ALTER ROLE root LOGIN;

CREATE DATABASE cashbox OWNER postgres;

GRANT ALL PRIVILEGES ON DATABASE cashbox TO root;
```
### proto生成代码

在protos目录下执行

```
//vue-js生成
protoc -I=. echo.proto \
--js_out=import_style=commonjs:../vue-example/src/protos \
--grpc-web_out=import_style=commonjs,mode=grpcwebtext:../vue-example/src/protos

//ts-example-js
protoc -I=. echo.proto \
--js_out=import_style=commonjs:../ts-example \
--grpc-web_out=import_style=commonjs,mode=grpcwebtext:../ts-example

//go生成
protoc -I=. echo.proto \
--go_out=plugins=grpc:../go-server/protos
```
