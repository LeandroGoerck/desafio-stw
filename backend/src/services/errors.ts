import CustomError from './customError';

const thisIdDoesNotExist = new CustomError('Wrong Id!', 404);

export default {
  thisIdDoesNotExist,
};