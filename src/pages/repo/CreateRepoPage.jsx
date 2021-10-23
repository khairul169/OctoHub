import {
  Alert, Button, Container, Divider, Grid, TextField, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Header from '../../components/Header';
import { clearCreateState, createRepository } from './repoSlice';

const CreateRepoPage = () => {
  // States
  const { createState } = useSelector((state) => state.repo);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(clearCreateState());
  }, []);

  const onFormSubmit = (e) => {
    e.preventDefault();

    // Create new repository
    const formData = new FormData(e.target);
    const object = {};
    formData.forEach((value, key) => { object[key] = value; });

    // Set auto initialize project with readme
    object.auto_init = true;
    const json = JSON.stringify(object);

    // Dispatch create repository
    dispatch(createRepository(json));
  };

  useEffect(() => {
    // Redirect to home on success
    if (createState && createState.status) {
      dispatch(clearCreateState());
      history.push(`/repo/${createState.repoName}`);
    }
  }, [createState]);

  return (
    <Box>
      <Header />
      <Container component="main" sx={{ py: 8 }}>
        <Grid container>
          <Grid item xs={false} lg={3} />
          <Grid item xs={12} lg={6}>
            <Typography variant="h5">Buat Repository</Typography>
            <Divider sx={{ my: 1 }} />

            {createState && (
              <Alert sx={{ mt: 3 }} severity={createState.status ? 'success' : 'error'}>{createState.message}</Alert>
            )}

            <form onSubmit={onFormSubmit}>
              <TextField
                required
                fullWidth
                id="name"
                name="name"
                label="Nama Repository"
                sx={{ mt: 6 }}
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
              />

              <Grid container sx={{ mt: 4 }} spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button component={Link} to="/" fullWidth variant="outlined" size="large">Kembali</Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button type="submit" fullWidth variant="contained" size="large">Submit</Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CreateRepoPage;
