import {
  Alert, Button, Container, Divider, Grid, TextField, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { clearUpdateState, updateRepository } from './repoSlice';

const UpdateRepoPage = () => {
  // States
  const { data: repo, updateState } = useSelector((state) => state.repo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearUpdateState());
  }, []);

  const onFormSubmit = (e) => {
    e.preventDefault();

    // Patch repository
    const formData = new FormData(e.target);
    const object = {};
    formData.forEach((value, key) => { object[key] = value; });
    const json = JSON.stringify(object);

    dispatch(updateRepository(json));
  };

  return (
    <Box>
      <Header />
      <Container component="main" sx={{ py: 8 }}>
        {repo && (
        <Grid container>
          <Grid item xs={false} lg={3} />
          <Grid item xs={12} lg={6}>
            <Typography variant="h5">Update Repository</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography>{repo.full_name}</Typography>

            {updateState && (
              <Alert sx={{ mt: 3 }} severity={updateState.status ? 'success' : 'error'}>{updateState.message}</Alert>
            )}

            <form onSubmit={onFormSubmit}>
              <TextField
                required
                fullWidth
                id="name"
                name="name"
                label="Nama Repository"
                sx={{ mt: 6 }}
                defaultValue={repo.name}
              />

              <TextField
                required
                fullWidth
                id="description"
                name="description"
                label="Deskripsi Repository"
                multiline
                rows={3}
                sx={{ mt: 3 }}
                defaultValue={repo.description}
              />

              <Grid container sx={{ mt: 4 }} spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button component={Link} to={`/repo/${repo.full_name}`} fullWidth variant="outlined" size="large">Kembali</Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button type="submit" fullWidth variant="contained" size="large">Update</Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
        )}
      </Container>
    </Box>
  );
};

export default UpdateRepoPage;
