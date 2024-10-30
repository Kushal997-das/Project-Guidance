
export interface IJsonRpcError<T> {
  code: number; // must be an integer
  message: string;
  data?: T;
  stack?: any; // non-standard but not forbidden, and useful if it exists
}

export interface IEthJsonRpcError<T> extends IJsonRpcError<T> {}

type DefaultError = { code: number, message: string }

export interface ISerializeError {
  (error: any, fallbackError?: DefaultError): IJsonRpcError<any>
}

export interface IGetMessageFromCode {
  (error: any, fallbackMessage?: string): string
}

export interface IRpcErrors {
  parse: (message?: string | null, data?: any) => IJsonRpcError<any>,
  invalidRequest: (message?: string | null, data?: any) => IJsonRpcError<any>,
  invalidParams: (message?: string | null, data?: any) => IJsonRpcError<any>,
  methodNotFound: (message?: string | null, data?: any) => IJsonRpcError<any>,
  internal: (message?: string | null, data?: any) => IJsonRpcError<any>,
  server: (code: number, message?: string | null, data?: any) => IJsonRpcError<any>,
  eth: {
    userRejectedRequest: (message?: string | null, data?: any) => IEthJsonRpcError<any>,
    unauthorized: (message?: string | null, data?: any) => IEthJsonRpcError<any>,
    unsupportedMethod: (message?: string | null, data?: any) => IEthJsonRpcError<any>,
    custom: (code: number, message: string | null, data?: any) => IEthJsonRpcError<any>,
  }
}

// maybe export this once valid codes and messages can be extended at runtime

// export interface IIsValidCode {
//   (number: code): boolean
// }
