/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default class Response {
  code: number;

  data: any;

  desc: any;

  static Desc: any = {
    Unauthorized: {
      en: 'You are not authorized to do this operation',
      es: 'No estas autorizado para hacer esta operación'
    }
  };

  static Codes = {

    // 1×× Informational
    Continue          : 100,
    SwitchingProtocols: 101,
    Processing        : 102,

    // 2×× Success
    Ok                         : 200,
    Created                    : 201,
    Accepted                   : 202,
    NonAuthoritativeInformation: 203,
    NoContent                  : 204,
    ResetContent               : 205,
    PartialContent             : 206,
    MultiStatus                : 207,
    AlreadyReported            : 208,
    IMUsed                     : 209,

    // 3×× Redirection
    MultipleChoices  : 300,
    MovedPermanently : 301,
    Found            : 302,
    SeeOther         : 303,
    NotModified      : 304,
    UseProxy         : 305,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,

    // 4×× Client Error
    BadRequest                     : 400,
    Unauthorized                   : 401,
    PaymentRequired                : 402,
    Forbidden                      : 403,
    NotFound                       : 404,
    MethodNotAllowed               : 405,
    NotAcceptable                  : 406,
    ProxyAuthenticationRequired    : 407,
    RequestTimeout                 : 408,
    Conflict                       : 409,
    Gone                           : 410,
    LengthRequired                 : 411,
    PreconditionFailed             : 412,
    PayloadTooLarge                : 413,
    RequestURITooLong              : 414,
    UnsupportedMediaType           : 415,
    RequestedRangeNotSatisfiable   : 416,
    ExpectationFailed              : 417,
    ImATeapot                      : 418,
    MisdirectedRequest             : 421,
    UnprocessableEntity            : 422,
    Locked                         : 423,
    FailedDependency               : 424,
    UpgradeRequired                : 426,
    PreconditionRequired           : 428,
    TooManyRequests                : 429,
    RequestHeaderFieldsTooLarge    : 431,
    ConnectionClosedWithoutResponse: 444,
    UnavailableForLegalReasons     : 451,
    ClientClosedRequest            : 499,

    // 5×× Server Error
    InternalServerError          : 500,
    NotImplemented               : 501,
    BadGateway                   : 502,
    ServiceUnavailable           : 503,
    GatewayTimeout               : 504,
    HTTPVersionNotSupported      : 505,
    VariantAlsoNegotiates        : 506,
    InsufficientStorage          : 507,
    LoopDetected                 : 508,
    NotExtended                  : 510,
    NetworkAuthenticationRequired: 511,
    NetworkConnectTimeoutError   : 599
  };

  constructor(code: number, data: any, desc: any) {
    this.code = code;
    this.data = data;
    this.desc = desc;
  }

  stringify(): any {
    return _stringify(this);
  }

  static create(code: number, data: any, desc: any): Response {
    const response = new Response(code, data, desc);
    return response;
  }

  static stringify(code: number, data: any, desc: any): any {
    const response = new Response(code, data, desc);
    return response.stringify();
  }

  static ok(data: any, desc?: any) {
    const response = new Response(200, data, desc);
    return response;
  }

  static created(data: any, desc?: any) {
    const response = new Response(201, data, desc);
    return response;
  }

  static error(code: number, data: any, desc?: any) {
    const response = new Response(code, data, desc);
    return response;
  }
}

function _stringify(response: Response): any {
  const data: any = {
    code: response.code,
    data: response.data,
    desc: response.desc
  };
  return data;
}
