import React from "react";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Grid from "@material-ui/core/Grid";
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {useStyles} from "./styles";
import {useDispatch, useSelector} from 'react-redux';
import {
    advanceLetterAsync,
    GET_NEXT_LETTER,
    selectError,
    selectIsRobotOn,
    selectSpeech,
    SWITCH_OFF,
    SWITCH_ON
} from "../../features/robot/robotSlice";

export function Robot() {
    const classes = useStyles();
    const isPowered = useSelector(selectIsRobotOn);
    const error = useSelector(selectError);
    const dispatch = useDispatch();
    const speech = useSelector(selectSpeech);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {

        }
    }
    const handleSwitchPowerOn = () => {
        isPowered ? dispatch(SWITCH_OFF()) : dispatch(SWITCH_ON())
    }

    return (
        <div className={classes.root}>
            <img
                src='https://previews.123rf.com/images/anatolir/anatolir1808/anatolir180810297/105975416-mechanical-robot-banner-flat-style.jpg'
                alt='Random robot'
                width='500px'
                style={{paddingBottom: "10px"}}/>
            <TextField
                fullWidth
                disabled={!isPowered}
                id="outlined-disabled"
                label="Robot messages will appear here..."
                value={speech}
                variant="outlined"
                InputProps={{
                    readOnly: true,
                }}
            />
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
            >
                <Grid item style={{padding: "10px"}}>
                    <Button
                        variant="contained"

                        color={isPowered ? 'primary' : 'secondary'}
                        className={classes.button}
                        startIcon={<PowerSettingsNewIcon/>}
                        onClick={() =>
                            handleSwitchPowerOn()
                        }
                    >
                        {isPowered ? 'Switch power off' : 'Switch power on'}
                    </Button>
                </Grid>
                <Grid item style={{padding: "10px"}}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SkipNextIcon/>}
                        onClick={() =>
                            dispatch(GET_NEXT_LETTER())
                        }
                    >
                        Get next letter
                    </Button>
                </Grid>
                <Grid item style={{padding: "10px"}}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SkipNextIcon/>}
                        onClick={() =>
                            dispatch(advanceLetterAsync(2000))
                        }
                    >
                        Get current letter
                    </Button>
                </Grid>
                <Grid item style={{padding: "10px"}}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SkipNextIcon/>}
                        onClick={() =>
                            dispatch(advanceLetterAsync(2000))
                        }
                    >
                        Keep getting next letter
                    </Button>
                </Grid>
            </Grid>
            <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error" color="warning">
                    You cannot action the robot when it's turned off
                </MuiAlert>
            </Snackbar>
        </div>
    );
}
