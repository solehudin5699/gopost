import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  card: {
    marginTop: '15px',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  cardACtions: { marginBottom: '15px' },
  btnEdit: { width: '30%', height: '35px', marginLeft: '7px' },
  btnDelete: { width: '30%', height: '35px', marginLeft: '7px' },
}));

export default function PostItem({ onEdit, onDelete, idx, data }) {
  const handleEdit = (data, idx) => {
    onEdit(data, idx);
  };
  const handleDelete = (data, idx) => {
    onDelete(data, idx);
  };

  const classes = useStyles();
  return (
    <>
      <Card className={classes.card}>
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
        {/* {isLoading ? (
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
        )} */}
      </Card>
    </>
  );
}
