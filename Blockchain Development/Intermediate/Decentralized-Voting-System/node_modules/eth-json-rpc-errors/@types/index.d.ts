
export interface IEthereumRpcError<T> {
  code: number; // must be an integer
  message: string;
  data?: T;
  stack?: any; // non-standard but not forbidden, and useful if it exists
}

export interface IEthereumProviderError<T> extends IEthereumRpcError<T> {}

type DefaultError = { code: number, message: string }

export interface IErrorOptions {
  message?: string | null,
  data?: any,
}

export interface IRpcServerErrorOptions extends IErrorOptions {
  code: number,
}

export interface IProviderCustomErrorOptions extends IErrorOptions {
  code: number,
  message: string,
}

export interface ISerializeError {
  (error: any, fallbackError?: DefaultError): IEthereumRpcError<any>
}

export interface IGetMessageFromCode {
  (error: any, fallbackMessage?: string): string
}

export interface IEthErrors {
  rpc: {
    invalidInput: (opts?: string | IErrorOptions) => IEthereumRpcError<any>,
    resourceNotFound: (opts?: string | IErrorOptions) => IEthereumRpcError<any>,
    resourceUnavailable: (opts?: string | IErrorOptions) => IEthereumRpcError<any>,
    transactionRejected: (opts?: string | IErrorOptions) => IEthereumRpcError<any>,
    methodNotSupported: (opts?: string | IErrorOptions) => IEthereumRpcError<any>,
    parse: (opts?: string | IErrorOptions) => IEthereumRpcError<any>,
    invalidRequest: (opts?: string | IErrorOptions) => IEthereumRpcError<any>,
    invalidParams: (opts?: string | IErrorOptions) => IEthereumRpcError<any>,
    methodNotFound: (opts?: string | IErrorOptions) => IEthereumRpcError<any>,
    internal: (opts?: string | IErrorOptions) => IEthereumRpcError<any>,
    server: (opts: IRpcServerErrorOptions) => IEthereumRpcError<any>,
  },
  provider: {
    userRejectedRequest: (opts?: string | IErrorOptions) => IEthereumProviderError<any>,
    unauthorized: (opts?: string | IErrorOptions) => IEthereumProviderError<any>,
    unsupportedMethod: (opts?: string | IErrorOptions) => IEthereumProviderError<any>,
    custom: (opts: IProviderCustomErrorOptions) => IEthereumProviderError<any>,
  }
}

// maybe export this once valid codes and messages can be extended at runtime

// export interface IIsValidCode {
//   (number: code): boolean
// }
