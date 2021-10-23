import {
  Button,
  Container, Divider, Grid, TextField, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import { updateRepository } from './repoSlice';

const UpdateRepoPage = () => {
  // States
  const { data: repo } = useSelector((state) => state.repo);
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();

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
          <Grid item xs={12} lg={6}>
            <Typography variant="h5">Update Repository</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography>{repo.full_name}</Typography>

            <form onSubmit={onFormSubmit}>
              <TextField
                required
                fullWidth
                id="name"
                name="name"
                label="Repository Name"
                sx={{ mt: 6 }}
                defaultValue={repo.name}
              />

              <TextField
                required
                fullWidth
                id="description"
                name="description"
                label="Description"
                multiline
                rows={3}
                sx={{ mt: 3 }}
                defaultValue={repo.description}
              />

              <Button type="submit" variant="contained" size="large" sx={{ mt: 4 }}>Update</Button>
            </form>
          </Grid>
        </Grid>
        )}
      </Container>
    </Box>
  );
};

export default UpdateRepoPage;
