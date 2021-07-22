import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: '15px',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  cardACtions: { marginBottom: '15px' },
  btnEdit: { width: '30%', height: '35px', marginLeft: '7px' },
  btnDelete: { width: '30%', height: '35px', marginLeft: '7px' },
}));

export default function PostItem({ onEdit, onDelete, idx }) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({ body: '', title: '' });
  const handleEdit = (data, idx) => {
    onEdit(data, idx);
  };
  const handleDelete = (data, idx) => {
    onDelete(data, idx);
  };
  const fetchData = () => {
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${idx + 1}`)
      .then((res) => {
        const data = res.data;
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const { data: updatedData, isSuccess } = useSelector((state) => state.post);
  useEffect(() => {
    if (data.id === updatedData.id && isSuccess) {
      setData(updatedData);
    }
  }, [isSuccess]);
  const classes = useStyles();
  return (
    <>
      <Card className={classes.card}>
        {isLoading ? (
          <Skeleton variant="rect" width="100%" height={118} animation="wave" />
        ) : (
          !isLoading &&
          data.id && (
            <>
              <CardContent>
                <Typography
                  align="center"
                  variant="h6"
                  style={{ marginBottom: '15px' }}
                >
                  {data.title || ''}
                </Typography>
                <Typography align="justify" paragraph>
                  {data.body || ''}
                </Typography>
              </CardContent>
              <CardActions className={classes.cardActions}>
                <Button
                  onClick={() => handleEdit(data, idx)}
                  variant="outlined"
                  color="primary"
                  size="small"
                  className={classes.btnEdit}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(data, idx)}
                  variant="outlined"
                  color="secondary"
                  size="small"
                  className={classes.btnDelete}
                >
                  Delete
                </Button>
              </CardActions>
            </>
          )
        )}
      </Card>
    </>
  );
}
