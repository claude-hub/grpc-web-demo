/**
 * @fileoverview gRPC-Web generated client stub for protos
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.protos = require('./login_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.protos.LoginServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.protos.LoginServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.protos.LoginServiceClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.protos.LoginServiceClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.protos.LoginRequest,
 *   !proto.protos.LoginResponse>}
 */
const methodInfo_LoginService_Login = new grpc.web.AbstractClientBase.MethodInfo(
  proto.protos.LoginResponse,
  /** @param {!proto.protos.LoginRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.protos.LoginResponse.deserializeBinary
);


/**
 * @param {!proto.protos.LoginRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.protos.LoginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.protos.LoginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.protos.LoginServiceClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/protos.LoginService/Login',
      request,
      metadata,
      methodInfo_LoginService_Login,
      callback);
};


/**
 * @param {!proto.protos.LoginRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.protos.LoginResponse>}
 *     The XHR Node Readable Stream
 */
proto.protos.LoginServicePromiseClient.prototype.login =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.login(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.protos;

