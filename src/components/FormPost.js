import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, resetPost } from '../redux/actions';

export default function FormPost() {
  const [isFocus, setFocus] = useState(false);
  const [newData, setNewData] = useState({ title: '', body: '' });
  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const { isError, isSuccess, isAddLoading } = useSelector(
    (state) => state.post
  );
  const handleSubmit = () => {
    dispatch(addPost({ ...newData, userId: 1 }));
  };
  useEffect(() => {
    if (isSuccess || isError) {
      setFocus(false);
      setNewData({ title: '', body: '' });
    }
  }, [isError, isSuccess]);
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ position: 'sticky', top: '70px', zIndex: 100 }}
    >
      <Grid item xs={10} sm={6}>
        <Card>
          <CardContent style={{ padding: !isFocus && 0 }}>
            <TextField
              fullWidth
              id="outlined-basic"
              label={isFocus ? 'Title' : 'Add New Post'}
              variant="outlined"
              onFocus={() => setFocus(true)}
              name="title"
              onChange={handleChange}
              value={newData.title}
              type="text"
            />
            {isFocus && (
              <TextField
                id="standard-multiline-flexible"
                label="Content Post"
                multiline
                rows={5}
                fullWidth
                name="body"
                value={newData.body}
                onChange={handleChange}
                style={{ marginTop: isFocus && '15px' }}
                variant="outlined"
              />
            )}
          </CardContent>
          {isFocus && (
            <CardActions>
              <Button
                onClick={() => handleSubmit()}
                variant="contained"
                color="primary"
                size="small"
                style={{ width: '30%', height: '35px', marginLeft: '7px' }}
              >
                {isAddLoading ? 'Loading...' : 'Post'}
              </Button>
              <Button
                onClick={() => setFocus(false)}
                variant="contained"
                color="secondary"
                size="small"
                style={{ width: '30%', height: '35px', marginLeft: '7px' }}
              >
                Cancel
              </Button>
            </CardActions>
          )}
        </Card>
      </Grid>
    </Grid>
  );
}
