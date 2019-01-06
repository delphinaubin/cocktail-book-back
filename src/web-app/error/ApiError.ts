export default class ApiError extends Error {
  constructor(
    public status: number,
    public name: string,
    message: string) {
    super(message);
  }
}
