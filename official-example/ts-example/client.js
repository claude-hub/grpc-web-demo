"use strict";
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
exports.__esModule = true;
var grpcWeb = require("grpc-web");
var $ = require("jquery");
// Uncomment either one of the following:
// Option 1: import_style=commonjs+dts
var echo_grpc_web_pb_1 = require("./echo_grpc_web_pb");
// Option 2: import_style=typescript
// import {EchoServiceClient} from './EchoServiceClientPb';
var echo_pb_1 = require("./echo_pb");
var EchoApp = /** @class */ (function () {
    function EchoApp(echoService) {
        this.echoService_ = echoService;
    }
    EchoApp.addMessage = function (message, cssClass) {
        $('#first').after($('<div/>').addClass('row').append($('<h2/>').append($('<span/>').addClass('label ' + cssClass).text(message))));
    };
    EchoApp.addLeftMessage = function (message) {
        this.addMessage(message, 'label-primary pull-left');
    };
    EchoApp.addRightMessage = function (message) {
        this.addMessage(message, 'label-default pull-right');
    };
    EchoApp.prototype.echo = function (msg) {
        EchoApp.addLeftMessage(msg);
        var request = new echo_pb_1.EchoRequest();
        request.setMessage(msg);
        var call = this.echoService_.echo(request, { 'custom-header-1': 'value1' }, function (err, response) {
            if (err) {
                if (err.code !== grpcWeb.StatusCode.OK) {
                    EchoApp.addRightMessage('Error code: ' + err.code + ' "' + err.message + '"');
                }
            }
            else {
                setTimeout(function () {
                    EchoApp.addRightMessage(response.getMessage());
                }, EchoApp.INTERVAL);
            }
        });
        call.on('status', function (status) {
            if (status.metadata) {
                console.log('Received metadata');
                console.log(status.metadata);
            }
        });
    };
    EchoApp.prototype.echoError = function (msg) {
        EchoApp.addLeftMessage(msg);
        var request = new echo_pb_1.EchoRequest();
        request.setMessage(msg);
        this.echoService_.echoAbort(request, {}, function (err, response) {
            if (err) {
                if (err.code !== grpcWeb.StatusCode.OK) {
                    EchoApp.addRightMessage('Error code: ' + err.code + ' "' + err.message + '"');
                }
            }
        });
    };
    EchoApp.prototype.repeatEcho = function (msg, count) {
        EchoApp.addLeftMessage(msg);
        if (count > EchoApp.MAX_STREAM_MESSAGES) {
            count = EchoApp.MAX_STREAM_MESSAGES;
        }
        var request = new echo_pb_1.ServerStreamingEchoRequest();
        request.setMessage(msg);
        request.setMessageCount(count);
        request.setMessageInterval(EchoApp.INTERVAL);
        var stream = this.echoService_.serverStreamingEcho(request, { 'custom-header-1': 'value1' });
        var self = this;
        stream.on('data', function (response) {
            EchoApp.addRightMessage(response.getMessage());
        });
        stream.on('status', function (status) {
            if (status.metadata) {
                console.log('Received metadata');
                console.log(status.metadata);
            }
        });
        stream.on('error', function (err) {
            EchoApp.addRightMessage('Error code: ' + err.code + ' "' + err.message + '"');
        });
        stream.on('end', function () {
            console.log('stream end signal received');
        });
    };
    EchoApp.prototype.send = function (e) {
        var _msg = $('#msg').val();
        var msg = _msg.trim();
        $('#msg').val(''); // clear the text box
        if (!msg)
            return false;
        if (msg.indexOf(' ') > 0) {
            var count = msg.substr(0, msg.indexOf(' '));
            if (/^\d+$/.test(count)) {
                this.repeatEcho(msg.substr(msg.indexOf(' ') + 1), Number(count));
            }
            else if (count === 'err') {
                this.echoError(msg.substr(msg.indexOf(' ') + 1));
            }
            else {
                this.echo(msg);
            }
        }
        else {
            this.echo(msg);
        }
    };
    EchoApp.prototype.load = function () {
        var self = this;
        $(document).ready(function () {
            // event handlers
            $('#send').click(self.send.bind(self));
            $('#msg').keyup(function (e) {
                if (e.keyCode === 13)
                    self.send(e); // enter key
                return false;
            });
            $('#msg').focus();
        });
    };
    EchoApp.INTERVAL = 500; // ms
    EchoApp.MAX_STREAM_MESSAGES = 50;
    return EchoApp;
}());
var echoService = new echo_grpc_web_pb_1.EchoServiceClient('http://localhost:8080', null, null);
var echoApp = new EchoApp(echoService);
echoApp.load();
