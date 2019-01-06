import ApiError from './ApiError';
export default class NotFoundApiError extends ApiError {
  constructor(message: string = 'NOT FOUND') {
    super(
      404,
      'NOT FOUND',
      message,
    );
  }
}
