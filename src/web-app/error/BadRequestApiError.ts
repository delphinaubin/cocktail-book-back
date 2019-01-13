import ApiError from './ApiError';
export default class NotFoundApiError extends ApiError {
  constructor(message: string = 'BAD REQUEST') {
    super(
      400,
      'BAD REQUEST',
      message,
    );
  }
}
