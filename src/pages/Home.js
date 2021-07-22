import React, { useState, useEffect } from 'react';
import PageBase from '../components/PageBase';
import FormPost from '../components/FormPost';
import ListPost from '../components/ListPost';
import ModalEdit from '../components/ModalEdit';
import DeleteConfirmation from '../components/DeleteConfirmation';
import { useDispatch, useSelector } from 'react-redux';
import { editPost, deletePost, resetPost } from '../redux/actions';
import { useSnackbar } from 'notistack';

export default function Home() {
  const [modalEdit, setModalEdit] = useState({ open: false, data: {} });
  const [modalDelete, setModalDelete] = useState({ open: false, data: {} });
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.post);
  const handleEdit = (data, idx) => {
    setModalEdit({ open: true, data });
  };
  const handleDelete = (data, idx) => {
    setModalDelete({ open: true, data });
  };
  const handleClose = () => {
    setModalEdit({ ...modalEdit, open: false });
    setModalDelete({ ...modalDelete, open: false });
  };
  const handleSubmitUpdatedData = (data) => {
    dispatch(editPost(data));
    handleClose();
  };
  const handleDeleteData = (data) => {
    dispatch(deletePost(data.id));
    handleClose();
  };
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isSuccess || isError) {
      // handleClose();
      setTimeout(() => {
        dispatch(resetPost());
      }, 500);
    }
    if (isSuccess) {
      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 2500,
      });
    } else if (isError) {
      enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: 2500,
      });
    }
  }, [isSuccess, isError]);
  return (
    <>
      <PageBase>
        <FormPost />
        <ListPost onDelete={handleDelete} onEdit={handleEdit} />
        <ModalEdit
          onClose={handleClose}
          onEdit={handleSubmitUpdatedData}
          data={modalEdit.data}
          open={modalEdit.open}
        />
        <DeleteConfirmation
          onClose={handleClose}
          onDelete={handleDeleteData}
          data={modalDelete.data}
          open={modalDelete.open}
        />
      </PageBase>
    </>
  );
}
