import BadRequestApiError from './BadRequestApiError';
export default class InvalidArgumentApiError extends BadRequestApiError {
  constructor(message: string = '') {
    super(`INVALID ARGUMENT ${message}`);
  }
}
