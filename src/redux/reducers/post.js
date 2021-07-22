import { post } from '../types';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  data: { id: 0 },
  posts: [],
  isUpdateLoading: false,
  isDeleteLoading: false,
  isAddLoading: false,
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
      };
    case post.rejected:
      return {
        ...prevState,
        isLoading: false,
      };
    case post.reset:
      return {
        ...prevState,
        isSuccess: false,
        isError: false,
      };
    case post.setPosts:
      return {
        ...prevState,
        posts: [...prevState.posts, action.data],
      };
    case post.updateSuccess: {
      let newData = prevState.posts.map((item) => {
        if (item.id === action.data.id) {
          return { ...item, ...action.data };
        } else {
          return item;
        }
      });
      return {
        ...prevState,
        isUpdateLoading: false,
        posts: newData,
        isSuccess: true,
        isError: false,
        message: action.message,
      };
    }
    case post.deleteSuccess: {
      let newData = prevState.posts.filter((item) => {
        return item.id !== action.data;
      });
      return {
        ...prevState,
        isDeleteLoading: false,
        posts: newData,
        isSuccess: true,
        isError: false,
        message: action.message,
      };
    }
    case post.setLoading:
      return {
        ...prevState,
        isLoading: action.data,
      };
    case post.updatePending:
      return {
        ...prevState,
        isUpdateLoading: true,
      };
    case post.updateRejected:
      return {
        ...prevState,
        isUpdateLoading: false,
        isSuccess: false,
        isError: true,
        message: action.message,
      };
    case post.deletePending:
      return {
        ...prevState,
        isDeleteLoading: true,
      };
    case post.deleteRejected:
      return {
        ...prevState,
        isDeleteLoading: false,
        isSuccess: false,
        isError: true,
        message: action.message,
      };
    case post.addPending:
      return {
        ...prevState,
        isAddLoading: true,
      };
    case post.addSuccess: {
      let newData = [action.data, ...prevState.posts];
      return {
        ...prevState,
        isAddLoading: false,
        posts: newData,
        isSuccess: true,
        isError: false,
        message: action.message,
      };
    }
    case post.addRejected:
      return {
        ...prevState,
        isAddLoading: false,
        isSuccess: false,
        isError: true,
        message: action.message,
      };
    default:
      return prevState;
  }
};

export default postReducer;
