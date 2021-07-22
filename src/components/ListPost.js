import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PostItem from './PostItem';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../redux/actions';

export default function FormPost({ onEdit, onDelete }) {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getPosts(100));
  }, [dispatch]);
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      style={{ marginTop: '15px' }}
    >
      <Grid item xs={12} sm={6}>
        {posts.map((item, idx) => (
          <PostItem
            key={idx.toString()}
            idx={idx}
            onEdit={onEdit}
            onDelete={onDelete}
            data={item}
          />
        ))}
      </Grid>
    </Grid>
  );
}
