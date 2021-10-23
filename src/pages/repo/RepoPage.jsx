import {
  Delete,
  Edit, GitHub, MoreVert, Star, Visibility,
} from '@mui/icons-material';
import {
  Avatar, Button, Container, Grid, Hidden, IconButton,
  ListItemIcon, Menu, MenuItem, Paper, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
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
  const [repoMenu, setRepoMenu] = useState();

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
              <Grid item xs={3} md={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar src={repo.owner.avatar_url} sx={{ width: 80, height: 80 }} />
                <Typography sx={{ mt: 2 }}>{repo.owner.login}</Typography>
              </Grid>
              <Grid item xs={9} md={10}>
                <Grid container>
                  <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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

                  </Grid>
                  <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Hidden mdDown>
                      <Box style={{ flex: 1 }} />
                    </Hidden>
                    <Button startIcon={<Star />} variant="outlined">{repo.stargazers_count}</Button>
                    <Button startIcon={<Visibility />} variant="outlined" sx={{ ml: 1 }}>{repo.watchers_count}</Button>
                    <Button startIcon={<GitHub />} variant="outlined" sx={{ ml: 1 }}>{repo.forks_count}</Button>
                    {repo.permissions.admin && (
                    <>
                      <IconButton sx={{ ml: 2 }} onClick={(e) => setRepoMenu(e.target)}>
                        <MoreVert />
                      </IconButton>
                      <Menu
                        anchorEl={repoMenu}
                        open={Boolean(repoMenu)}
                        onClose={() => setRepoMenu(null)}
                        onClick={() => setRepoMenu(null)}
                      >
                        <MenuItem component={Link} to="/repo/delete">
                          <ListItemIcon>
                            <Delete fontSize="small" />
                          </ListItemIcon>
                          Hapus Repository
                        </MenuItem>
                      </Menu>
                    </>
                    )}
                  </Grid>
                </Grid>
                <Typography>{repo.description}</Typography>
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
