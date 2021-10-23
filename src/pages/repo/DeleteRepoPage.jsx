import {
  Alert, Button, Container, Divider, Grid, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { clearDeleteState, deleteRepository } from './repoSlice';

const DeleteRepoPage = () => {
  // States
  const { data: repo, deleteState } = useSelector((state) => state.repo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearDeleteState());
  }, []);

  const onDeleteBtn = () => {
    dispatch(deleteRepository(repo.full_name));
  };

  return (
    <Box>
      <Header />
      <Container component="main" sx={{ py: 8 }}>
        {repo && (
        <Grid container>
          <Grid item xs={false} lg={3} />
          <Grid item xs={12} lg={6}>
            <Typography variant="h5">Hapus Repository</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography>
              Apakah anda yakin ingin menghapus repository
              {' '}
              <strong>{repo.full_name}</strong>
              ? Repository yang sudah terhapus tidak dapat dikembalikan seperti semula.
            </Typography>

            {deleteState && (
              <Alert sx={{ mt: 3 }} severity={deleteState.status ? 'success' : 'error'}>{deleteState.message}</Alert>
            )}

            <Grid container sx={{ mt: 4 }} spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  component={Link}
                  to={deleteState && deleteState.status ? '/' : `/repo/${repo.full_name}`}
                  fullWidth
                  variant="outlined"
                  size="large"
                >
                  Kembali
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={onDeleteBtn}
                >
                  Hapus
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        )}
      </Container>
    </Box>
  );
};

export default DeleteRepoPage;
