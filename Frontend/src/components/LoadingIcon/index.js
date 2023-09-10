import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingCircle: {
    color: '#0c9300 !important'
  }
}));

const LoadingIcon = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root} style={props?.style || {}}>
      <CircularProgress className={classes.loadingCircle} />
    </div>
  );
};

LoadingIcon.propTypes = {
  style: PropTypes.any
};
export default LoadingIcon;
