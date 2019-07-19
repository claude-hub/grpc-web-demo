const { HelloRequest,RepeatHelloRequest } = require('./helloworld_pb.js');
const { GreeterClient } = require('./helloworld_grpc_web_pb.js');

var client = new GreeterClient('http://localhost:8880',
  null, null);

// simple unary call
var request = new HelloRequest();
request.setName('World');

client.sayHello(request, {}, (err, response) => {
  console.log('简单调用：', response.getMessage());
});

// server streaming call
var streamRequest = new RepeatHelloRequest();
streamRequest.setName('World');
streamRequest.setCount(5);

var stream = client.sayRepeatHello(streamRequest, {});
stream.on('data', (response) => {
  console.log('服务端流式返回：', response.getMessage());
});
// stream.on('status', function (status) {
//   if (status.metadata) {
//     console.log("流式调用：Received metadata,", status.metadata);
//   }
// });
// stream.on('error', function (err) {
//   echoapp.EchoApp.addRightMessage('Error code: ' + err.code + ' "' +
//     err.message + '"');
// });
// stream.on('end', function () {
//   console.log("stream end signal received");
// });
