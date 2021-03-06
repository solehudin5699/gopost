import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  btnYes: { width: '30%', height: '35px', marginLeft: '5px' },
  btnCancel: { width: '30%', height: '35px' },
}));

export default function DeleteConfirmation(props) {
  const { open, onClose, onDelete, data } = props;
  const classes = useStyles();
  const { isDeleteLoading } = useSelector((state) => state.post);
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText color="black" id="alert-dialog-description">
            Are you sure you want to delete <strong>{data?.title || ''}</strong>
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            color="primary"
            variant="contained"
            className={classes.btnCancel}
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onDelete(data)}
            color="secondary"
            autoFocus
            variant="contained"
            className={classes.btnYes}
            size="small"
          >
            {isDeleteLoading ? 'Loading...' : 'Yes'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
