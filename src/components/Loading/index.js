import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './styles';

const Loading = () => {
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} data-test="loadingContainer" open>
            <CircularProgress color="inherit" data-test="loadingIcon" />
        </Backdrop>
    )
}

export default Loading;