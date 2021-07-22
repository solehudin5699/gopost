import { post } from '../types';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  data: { id: 0 },
};

const postReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case post.pending:
      return {
        ...prevState,
        isLoading: true,
      };
    case post.fulfilled:
      return {
        ...prevState,
        isLoading: false,
        data: action.data,
        isSuccess: true,
        isError: false,
        message: action.message,
      };
    case post.rejected:
      return {
        ...prevState,
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.message,
      };
    case post.reset:
      return {
        ...prevState,
        isSucces: false,
        isError: false,
      };
    default:
      return prevState;
  }
};

export default postReducer;
