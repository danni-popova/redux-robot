import React from "react";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useStyles} from "./styles";
import {useDispatch, useSelector} from 'react-redux';
import {alphabet} from "../../constants";
import {
    GET_NEXT_LETTER,
    selectCurrentLetter,
    selectError,
    selectIsRobotOn,
    SWITCH_OFF,
    SWITCH_ON
} from "../../features/robot/robotSlice";

export function Robot(props) {
    const classes = useStyles();
    const isPowered = useSelector(selectIsRobotOn);
    const error = useSelector(selectError);
    const currentLetter = useSelector(selectCurrentLetter);
    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {

        }
    }
    const handleSwitchPowerOn = () => {
        isPowered ? dispatch(SWITCH_OFF()) : dispatch(SWITCH_ON())
    }

    return (
        <div className={classes.root}>
            <TextField
                fullWidth
                disabled
                id="outlined-disabled"
                label="Robot speech"
                value={"Hello from this terrible robot! Current letter is: " + alphabet[currentLetter]}
                variant="outlined"
            />
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="stretch"
            >
                <Grid item style={{padding: "10px"}}>
                    <Button
                        variant="contained"
                        color={isPowered ? 'primary' : 'secondary'}
                        className={classes.button}
                        startIcon={<PowerSettingsNewIcon/>}
                        onClick={() => handleSwitchPowerOn()}
                    >
                        {isPowered ? 'Switch power off' : 'Switch power on'}
                    </Button>
                </Grid>
                <Grid item style={{padding: "10px"}}>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<SkipNextIcon/>}
                        onClick={() => dispatch(GET_NEXT_LETTER())}
                    >
                        Get next letter
                    </Button>
                </Grid>
            </Grid>
            <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
                    You cannot action the robot when it's turned off
                </MuiAlert>
            </Snackbar>
        </div>
    );
}
