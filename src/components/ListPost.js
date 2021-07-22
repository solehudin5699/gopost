import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PostItem from './PostItem';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../redux/actions';
import Skeleton from '@material-ui/lab/Skeleton';

export default function FormPost({ onEdit, onDelete }) {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getPosts(100));
  }, []);
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      style={{ marginTop: '15px' }}
    >
      <Grid item xs={12} sm={6}>
        {/* {isLoading
          ? Array(10)
              .fill(null)
              .map((_, idx) => (
                <Grid
                  key={idx.toString()}
                  container
                  direction="column"
                  spacing={3}
                >
                  <Grid item xs={12}>
                    <Skeleton
                      variant="rect"
                      width="100%"
                      height={118}
                      animation="wave"
                      style={{ borderRadius: '10px' }}
                    />
                  </Grid>
                </Grid>
              ))
          : posts.map((item, idx) => (
              <PostItem
                key={idx.toString()}
                idx={idx}
                onEdit={onEdit}
                onDelete={onDelete}
                data={item}
              />
            ))} */}
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
