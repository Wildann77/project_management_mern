export class CustomError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.name = "CustomError";
    if (errorCode) this.errorCode = errorCode;
  }
}
