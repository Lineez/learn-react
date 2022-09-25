import React from 'react';
import Loader from '../Loader';
import classes from './LoaderContainer.module.css'

const LoaderContainer = ({isLoading, children}) => {
    if(isLoading) {
        return (
            <div className={classes.container}>
                <Loader />
            </div>
        )

    } else {
        return children;
    }

};

export default LoaderContainer;