/**
 *
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const {HelloRequest, RepeatHelloRequest,
       HelloReply} = require('./helloworld_pb.js');
const {GreeterClient} = require('./helloworld_grpc_web_pb.js');

var client = new GreeterClient('http://' + window.location.hostname + ':8880',
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
  console.log('流式调用：', response.getMessage());
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
  

// deadline exceeded
// var deadline = new Date();
// deadline.setSeconds(deadline.getSeconds() + 1);

// client.sayHelloAfterDelay(request, {deadline: deadline.getTime()},
//   (err, response) => {
//     console.log('Got error, code = ' + err.code +
//                 ', message = ' + err.message);
//   });
