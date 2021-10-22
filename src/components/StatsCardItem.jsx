import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import PropTypes from 'prop-types';

const StatsCardItem = ({
  title, count, color, icon: IconNode,
}) => (
  <Grid item xs={12} sm={4}>
    <Paper
      elevation={3}
      sx={{
        px: 4, pt: 4, pb: 2, position: 'relative', background: color, overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'absolute', right: 16, top: 32 }}>
        <IconNode style={{ fontSize: 64, color: 'rgba(255, 255, 255, 0.6)' }} />
      </Box>
      <Typography variant="h4" color="white">{count}</Typography>
      <Typography color="white">{title}</Typography>
    </Paper>
  </Grid>
);

StatsCardItem.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  color: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  icon: PropTypes.any.isRequired,
};

StatsCardItem.defaultProps = {
  color: '#111',
};

export default StatsCardItem;
