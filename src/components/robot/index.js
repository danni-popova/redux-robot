import React from "react";
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Grid from "@material-ui/core/Grid";
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PowerIcon from '@material-ui/icons/Power';
import PowerOffIcon from '@material-ui/icons/PowerOff';

import {useStyles} from "./styles";
import {useDispatch, useSelector} from 'react-redux';
import {
    advanceLetterAsync,
    advanceToNextLetter,
    selectError,
    selectIsRobotOn,
    selectMessage,
    switchRobotOff,
    switchRobotOn,
    sayMessage
} from "../../features/robot/robotSlice";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

export function Robot() {
    const classes = useStyles();
    const isPowered = useSelector(selectIsRobotOn);
    const error = useSelector(selectError);
    const dispatch = useDispatch();
    const message = useSelector(selectMessage);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {

        }
    }
    const handleSwitchPowerOn = () => {
        isPowered ? dispatch(switchRobotOff()) : dispatch(switchRobotOn())
    }

    const handleChangeMessage = (action) => {
        switch(action){
            case 'next':
                dispatch(advanceToNextLetter())
                break;
            case 'current':
                sayMessage({action: '', payload: ''})
                break;
            case 'auto':
                console.log('Not yet')
                break;
        }
    }

    return (
        <div className={classes.root}>
            <img
                src='https://previews.123rf.com/images/anatolir/anatolir1808/anatolir180810297/105975416-mechanical-robot-banner-flat-style.jpg'
                alt='Random robot'
                width='600px'
                style={{paddingBottom: "10px"}}/>
            <Grid container spacing={1}>
                <Grid item xs={11}>
                    <TextField
                        fullWidth
                        id="outlined-disabled"
                        label="Robot messages will appear here..."
                        value={message}
                        InputProps={{readOnly: true}}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Tooltip title="Power" placement="bottom">
                    <IconButton
                        aria-label="power"
                        onClick={() => handleSwitchPowerOn()}
                        color={isPowered ? 'primary' : "secondary"}>
                        {isPowered ? <PowerIcon fontSize='large' /> : <PowerOffIcon fontSize='large' />}
                    </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        color="primary"
                        className={classes.button}
                        startIcon={<SortByAlphaIcon/>}
                        onClick={() => handleChangeMessage('current')}>
                        Current letter
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button

                        color="primary"
                        className={classes.button}
                        startIcon={<SkipNextIcon/>}
                        onClick={() => handleChangeMessage('next')}>
                        Next letter
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        color="primary"
                        className={classes.button}
                        startIcon={<PlayCircleOutlineIcon/>}
                        onClick={() => dispatch(advanceToNextLetter())}>
                        Auto advance
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}
