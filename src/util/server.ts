import grpcWeb from 'grpc-web';
// @ts-ignore
import {EchoServiceClient} from './echo_grpc_web_pb';
// @ts-ignore
import {EchoRequest, EchoResponse} from './echo_pb';


class EchoApp {
    echoService_: EchoServiceClient;

    constructor(echoService: EchoServiceClient) {
        this.echoService_ = echoService;
    }

    request(params:Object){
        return new Promise((resolve, reject) => {
            const request = new EchoRequest();
            request.setMessage(params);
            this.echoService_.echo(
                // request, {'custom-header-1': 'value1'},
                request, null,
                (err: grpcWeb.Error, response: EchoResponse) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(response.getMessage())
                    }
                }
            )
        })
    }
}
let echoService = new  EchoServiceClient('http://123.207.242.177:8080', null, null);
export  const server = new EchoApp(echoService);