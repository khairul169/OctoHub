import {
  Edit, GitHub, Star, Visibility,
} from '@mui/icons-material';
import {
  Avatar, Button, Container, Grid, IconButton, Paper, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { fetchRepository, clearRepoState } from './repoSlice';

const RepoPage = () => {
  const { userName, repoName } = useParams();

  // States
  const { data: repo, readme } = useSelector((state) => state.repo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearRepoState());
    dispatch(fetchRepository(`${userName}/${repoName}`));
  }, []);

  return (
    <Box>
      <Header />
      <Container component="main" sx={{ py: 8 }}>
        {repo && (
        <>
          <Paper variant="outlined" sx={{ p: 4 }}>
            <Grid container spacing={2}>

              <Grid item xs={2} sm={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar src={repo.owner.avatar_url} sx={{ width: 80, height: 80 }} />
                <Typography sx={{ mt: 2 }}>{repo.owner.login}</Typography>
              </Grid>
              <Grid item xs={10} sm={7}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    component="a"
                    href={repo.html_url}
                    target="_blank"
                    variant="h5"
                    color="primary"
                  >
                    {repo.full_name}
                  </Typography>
                  {repo.permissions.admin && (
                  <IconButton component={Link} to="/repo/update" sx={{ ml: 1 }}>
                    <Edit fontSize="small" />
                  </IconButton>
                  ) }
                </div>
                <Typography sx={{ mt: 2 }}>{repo.description}</Typography>
              </Grid>
              <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'start', justifyContent: 'end' }}>
                <Button startIcon={<Star />} variant="outlined">{repo.stargazers_count}</Button>
                <Button startIcon={<Visibility />} variant="outlined" sx={{ ml: 1 }}>{repo.watchers_count}</Button>
                <Button startIcon={<GitHub />} variant="outlined" sx={{ ml: 1 }}>{repo.forks_count}</Button>
              </Grid>
            </Grid>
          </Paper>
          {readme && (
          <Paper variant="outlined" sx={{ px: 8, py: 4, mt: 4 }}>
            <ReactMarkdown>
              {readme}
            </ReactMarkdown>
          </Paper>
          ) }
        </>
        )}
      </Container>
    </Box>
  );
};

export default RepoPage;
