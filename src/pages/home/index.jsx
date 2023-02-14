import React from "react";
import ReactPlayer from "react-player";
import {Box, Typography} from "@mui/material";
import {makeStyles} from '@material-ui/core/styles';
import {Button} from "flowbite-react";
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100vh',
        position: 'relative',
        '& video': {
            objectFit: 'cover',
        },
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
        paddingBottom: theme.spacing(4),
    },
}));
const Home = () => {
    const classes = useStyles();
    return (
        <section className={classes.root}>
            <ReactPlayer
                url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                playing
                loop
                muted
                width="100%"
                height="100%"
            />

            <div className={classes.overlay}>
                <Box
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    color="#fff"
                >
                    <Typography variant="h3" component="h1" className={classes.title}>
                        Realpro Inc.
                    </Typography>
                    <Button color="primary" variant="contained">
                        Booknow
                    </Button>
                </Box>
            </div>
        </section>
    )
}
export default Home;