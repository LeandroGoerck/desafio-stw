export default class CustomError extends Error {
  public name = 'CustomError';
  constructor(public message: string, public status: number) {
    super(message);
    this.status = status;
  }
}