import { put, all, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { post } from '../types';

function* submitNewPost(action) {
  let result;
  yield put({ type: post.pending });
  yield axios
    .post(
      'https://jsonplaceholder.typicode.com/posts',
      JSON.stringify(action.data),
      {
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      }
    )
    .then((res) => {
      result = {
        type: post.fulfilled,
        message: `Success add new post`,
        data: res.data,
      };
    })
    .catch((err) => {
      result = { type: post.rejected, message: `Failed add new post` };
    });
  yield put(result);
}

function* submitEditPost(action) {
  let result;
  yield put({ type: post.pending });
  yield axios
    .patch(
      `https://jsonplaceholder.typicode.com/posts/${action.data.id}`,
      JSON.stringify(action.data),
      {
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      }
    )
    .then((res) => {
      result = {
        type: post.fulfilled,
        message: `Success update data`,
        data: action.data,
      };
    })
    .catch((err) => {
      result = { type: post.rejected, message: `Failed update data` };
    });
  yield put(result);
}

function* submitDeletePost(action) {
  let result;
  yield put({ type: post.pending });
  yield axios
    .delete(
      `https://jsonplaceholder.typicode.com/posts/${action.id}`,
      JSON.stringify(action.data),
      {
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      }
    )
    .then((res) => {
      result = {
        type: post.fulfilled,
        message: `Success delete data`,
        data: { id: 0 },
      };
    })
    .catch((err) => {
      result = { type: post.rejected, message: `Failed delete data` };
    });
  yield put(result);
}

function* addPost() {
  yield takeEvery(post.add, submitNewPost);
}
function* editPost() {
  yield takeEvery(post.edit, submitEditPost);
}
function* deletePost() {
  yield takeEvery(post.delete, submitDeletePost);
}

export default function* rootSaga() {
  yield all([addPost(), editPost(), deletePost()]);
}
