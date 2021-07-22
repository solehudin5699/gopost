import { post } from '../types';

export const addPost = (data) => {
  return {
    type: post.add,
    data,
  };
};
export const resetPost = () => {
  return {
    type: post.reset,
  };
};
export const editPost = (data) => {
  return {
    type: post.edit,
    data,
  };
};
export const deletePost = (id) => {
  return {
    type: post.delete,
    id,
  };
};
export const getPosts = (iteration) => {
  return {
    type: post.get,
    iteration,
  };
};
