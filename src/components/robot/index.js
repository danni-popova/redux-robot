import React from "react";
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import Grid from "@material-ui/core/Grid";
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import Tooltip from "@material-ui/core/Tooltip";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PowerIcon from '@material-ui/icons/Power';
import PowerOffIcon from '@material-ui/icons/PowerOff';
import IconButton from "@material-ui/core/IconButton";
import {useStyles} from "./styles";
import {useDispatch, useSelector} from 'react-redux';
import {
    advanceLetterAsync,
    advanceToNextLetter,
    disableAutoAdvance,
    enableAutoAdvance,
    selectAutoAdvance,
    selectIsRobotOn,
    selectMessage,
    sendMessage,
    switchRobotOff,
    switchRobotOn
} from "../../features/robot/robotSlice";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

export function Robot() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isPowered = useSelector(selectIsRobotOn);
    const message = useSelector(selectMessage);
    const autoAdvanceIsOn = useSelector(selectAutoAdvance);

    const handleSwitchPowerOn = () => {
        isPowered ? dispatch(switchRobotOff()) : dispatch(switchRobotOn())
    }

    const handleNextLetterClick = () => {
        dispatch(advanceToNextLetter());
    }
    const handleCurrentLetterClick = () => {
        dispatch(sendMessage('current-letter'));
    }
    const handleAutoAdvanceClick = () => {
        autoAdvanceIsOn ? dispatch(disableAutoAdvance()) : dispatch(enableAutoAdvance());
        dispatch(advanceLetterAsync(2000))
    }


    return (
        <div className={classes.root}>
            <img
                src={isPowered ? 'https://i.imgur.com/JaJYPXy.png' : 'https://i.imgur.com/yjPsXdd.jpeg'}
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
                    {/*For some reason this is making my app error*/}
                    {/*<Tooltip title="Power" placement="bottom">*/}
                    <IconButton
                        aria-label="power"
                        onClick={() => handleSwitchPowerOn()}
                        color={isPowered ? 'primary' : "secondary"}>
                        {isPowered ? <PowerIcon fontSize='large'/> : <PowerOffIcon fontSize='large'/>}
                    </IconButton>
                    {/*</Tooltip>*/}
                </Grid>
                <Grid item xs={4}>
                    <Button
                        color="primary"
                        className={classes.button}
                        startIcon={<SortByAlphaIcon/>}
                        onClick={() => handleCurrentLetterClick()}>
                        Current letter
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        color="primary"
                        className={classes.button}
                        startIcon={<SkipNextIcon/>}
                        onClick={() => handleNextLetterClick()}>
                        Next letter
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        color={autoAdvanceIsOn ? "primary" : "secondary"}
                        className={classes.button}
                        startIcon={<PlayCircleOutlineIcon/>}
                        onClick={() => handleAutoAdvanceClick()}
                    >
                        {autoAdvanceIsOn ? "Stop Advance" : "Auto Advance"}
                    </Button>
                </Grid>
            </Grid>
            <Snackbar open={false} autoHideDuration={3000}>
                <Alert elevation={6} variant="filled" severity="error" color="warning">
                    You cannot action the robot when it's turned off
                </Alert>
            </Snackbar>
        </div>
    );
}
