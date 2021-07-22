import React from 'react';
import Grid from '@material-ui/core/Grid';
import PostItem from './PostItem';

export default function FormPost({ onEdit, onDelete }) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      style={{ marginTop: '15px' }}
    >
      <Grid item xs={12} sm={6}>
        {Array(100)
          .fill(null)
          .map((_, idx) => (
            <PostItem
              key={idx.toString()}
              idx={idx}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
      </Grid>
    </Grid>
  );
}
