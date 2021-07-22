import { put, all, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { post } from '../types';

function* submitNewPost(action) {
  let result;
  yield put({ type: post.addPending });
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
        type: post.addSuccess,
        message: `Success add new post`,
        data: res.data,
      };
    })
    .catch((err) => {
      result = { type: post.addRejected, message: `Failed add new post` };
    });
  yield put(result);
}

function* submitEditPost(action) {
  let result;
  yield put({ type: post.updatePending });
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
        type: post.updateSuccess,
        message: `Success update data`,
        data: action.data,
      };
    })
    .catch((err) => {
      result = { type: post.updateRejected, message: `Failed update data` };
    });
  yield put(result);
}

function* submitDeletePost(action) {
  let result;
  yield put({ type: post.deletePending });
  yield axios
    .delete(`https://jsonplaceholder.typicode.com/posts/${action.id}`)
    .then((res) => {
      result = {
        type: post.deleteSuccess,
        message: `Success delete data`,
        data: action.id,
      };
    })
    .catch((err) => {
      result = { type: post.deleteRejected, message: `Failed delete data` };
    });
  yield put(result);
}

function* fetchPost(action) {
  let iterate = action.iteration;
  let order = 1;
  yield put({ type: post.pending });
  while (order <= iterate) {
    let result;
    yield axios
      .get(`https://jsonplaceholder.typicode.com/posts/${order}`)
      .then((res) => {
        result = {
          type: post.setPosts,
          data: res.data,
        };
      })
      .catch((err) => {
        result = { type: post.rejected, message: `Failed delete data` };
      });
    yield put(result);
    order++;
  }
  yield put({ type: post.setLoading, data: false });
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
function* getPosts() {
  yield takeEvery(post.get, fetchPost);
}

export default function* rootSaga() {
  yield all([addPost(), editPost(), deletePost(), getPosts()]);
}
