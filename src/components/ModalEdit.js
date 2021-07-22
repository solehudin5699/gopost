import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 3),
    [theme.breakpoints.up('md')]: {
      width: '35vw',
    },
    [theme.breakpoints.down('sm')]: {
      width: '85vw',
    },
  },
  btnUpdate: { width: '30%', height: '35px' },
  btnCancel: { width: '30%', height: '35px', marginLeft: '5px' },
}));

export default function ModalEdit(props) {
  const { open, onClose, onEdit, data } = props;
  const classes = useStyles();
  const [updatedData, setUpdatedData] = useState({ title: '', body: '' });
  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };
  const { isUpdateLoading } = useSelector((state) => state.post);
  useEffect(() => {
    if (open) {
      setUpdatedData(data);
    }
  }, [open]);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">
              Update {props.data?.title || ''}
            </h2>
            <div>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Title"
                variant="outlined"
                name="title"
                value={updatedData.title}
                onChange={handleChange}
              />
              <TextField
                id="standard-multiline-flexible"
                label="Content Post"
                multiline
                rows={10}
                fullWidth
                name="body"
                value={updatedData.body}
                onChange={handleChange}
                style={{ marginTop: '15px' }}
                variant="outlined"
              />
            </div>
            <div style={{ marginTop: '15px' }}>
              <Button
                onClick={() => {
                  props.onEdit({ ...data, ...updatedData });
                }}
                variant="contained"
                color="primary"
                size="small"
                className={classes.btnUpdate}
              >
                {isUpdateLoading ? 'Loading...' : 'Update'}
              </Button>
              <Button
                onClick={props.onClose}
                variant="contained"
                color="secondary"
                size="small"
                className={classes.btnCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
