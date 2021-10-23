import {
  AlternateEmail, Book, EmojiEmotions, Inbox, Language, LocationOn, ThumbUpAlt,
} from '@mui/icons-material';
import {
  Avatar, Container, Divider, Grid, ListItem, ListItemIcon, ListItemText, Paper, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import StatsCardItem from '../../components/StatsCardItem';
import { fetchUserData } from './homeSlice';

const HomePage = () => {
  const { userName } = useParams();

  // States
  const { user, repositories } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData(userName));
  }, []);

  return (
    <Box>
      <Header />
      <Container component="main" sx={{ py: 8 }}>
        <Grid container spacing={3}>
          {user && (
          <>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar src={user.avatar_url} sx={{ width: 128, height: 128 }} />
                <Typography variant="h5" sx={{ mt: 2 }}>{user.name}</Typography>
                <Typography>{user.login}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              {user.location && (
              <ListItem disableGutters dense>
                <ListItemIcon><LocationOn /></ListItemIcon>
                <ListItemText>{user.location}</ListItemText>
              </ListItem>
              )}
              {user.blog && (
              <ListItem disableGutters dense>
                <ListItemIcon><Language /></ListItemIcon>
                <ListItemText>{user.blog}</ListItemText>
              </ListItem>
              )}
              {user.email && (
              <ListItem disableGutters dense>
                <ListItemIcon><AlternateEmail /></ListItemIcon>
                <ListItemText>{user.email}</ListItemText>
              </ListItem>
              )}
            </Grid>
          </>
          )}
          <Grid item xs={false} lg={1} />
          <Grid item xs={12} md={8}>
            <Box>
              {user && (
              <>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Rincian Pengguna
                </Typography>
                <Grid container spacing={2}>
                  <StatsCardItem
                    title="Total Repository"
                    count={user.public_repos}
                    color="#3c81d6"
                    icon={Inbox}
                  />
                  <StatsCardItem
                    title="Followers"
                    count={user.followers}
                    color="#d63c5d"
                    icon={ThumbUpAlt}
                  />
                  <StatsCardItem
                    title="Following"
                    count={user.following}
                    color="#2cab4a"
                    icon={EmojiEmotions}
                  />
                </Grid>
              </>
              )}
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Repository
              </Typography>
              {repositories && (
              <Grid container spacing={2}>
                {repositories.map((item) => (
                  <Grid item xs={12} sm={6} md={4}>
                    <Link to={`/repo/${item.full_name}`}>
                      <Paper elevation={3} sx={{ p: 2 }}>
                        <div style={{ display: 'flex' }}>
                          <Book sx={{ mr: 1 }} />
                          <Typography color="primary">{item.name}</Typography>
                        </div>
                        <Typography
                          sx={{
                            mt: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            height: 40,
                          }}
                          variant="subtitle2"
                        >
                          {item.description}
                        </Typography>
                      </Paper>
                    </Link>
                  </Grid>
                ))}
              </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
