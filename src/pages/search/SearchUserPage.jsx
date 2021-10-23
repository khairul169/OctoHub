import {
  Avatar,
  Container, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import { fetchUsersByQuery } from './searchSlice';

const SearchUserPage = () => {
  const params = new URLSearchParams(useLocation().search);
  const dispatch = useDispatch();

  // States
  const { users, query: searchQuery } = useSelector((state) => state.search);

  useEffect(() => {
    const query = params.get('query');

    if (query && query.length) {
      dispatch(fetchUsersByQuery(query));
    }
  }, []);

  return (
    <Box>
      <Header />
      <Container component="main" sx={{ py: 8 }}>
        <Typography variant="h5">Cari Pengguna</Typography>
        {searchQuery && (
        <Typography sx={{ mt: 1 }}>
          Menampilkan hasil pencarian untuk keyword
          {' '}
          <strong>{searchQuery}</strong>
          .
        </Typography>
        )}

        {users && (
        <List sx={{ mt: 3 }}>
          {users.items.map((user) => (
            <Box component={Link} to={`/user/${user.login}`}>
              <Divider sx={{ my: 1 }} />
              <ListItem disableGutters>
                <ListItemAvatar>
                  <Avatar src={user.avatar_url} />
                </ListItemAvatar>
                <ListItemText primary={user.login} color="primary" />
              </ListItem>
            </Box>
          ))}
        </List>
        )}
      </Container>
    </Box>
  );
};

export default SearchUserPage;
