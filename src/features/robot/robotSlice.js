import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {alphabet} from "../../constants";

export const robotSlice = createSlice({
    name: 'robot',
    initialState: {
        isOn: false,
        currentLetter: 0,
        error: false,
        message: "",
        autoAdvance: false
    },
    reducers: {
        // Reducers and actions for turning the robot on and off
        switchRobotOn: state => {
            return {...state, isOn: true, error: false}
        },
        switchRobotOff: state => {
            return {...state, isOn: false, currentLetter: 0, message: "",}
        },
        // An action that advances to the next letter
        advanceToNextLetter: state => {
            console.log('Getting next letter')
            // If the last letter is reached, start again
            if (state.currentLetter < 24) {
                return {
                    ...state,
                    currentLetter: state.currentLetter + 1,
                }
            }
            return {...state, currentLetter: 0}
        },
        // An action to use that says messages
        sendMessage: (state, action) => {
            let messageToSend = '';

            switch (action.payload) {
                case 'current-letter':
                    messageToSend = `Current letter is: ${alphabet[state.currentLetter]}`;
                    break;

                case 'next-letter':
                    messageToSend = `Current letter is: ${alphabet[state.currentLetter + 1]}`;
                    break;

                case 'greet':
                    messageToSend = 'Hello!'
                    break;

                default:
                    messageToSend = 'Some other action was called'
            }

            return {...state, message: messageToSend}
        },
        enableAutoAdvance: state => {
            return {...state, autoAdvance: true}
        },
        disableAutoAdvance: state => {
            return {...state, autoAdvance: false}
        }
    },
});

// Selector that will tell us if the robot is on
export const selectIsRobotOn = state => state.robot.isOn;

// Selector that will tell us if the robot should advance to the next letter automatically
export const selectAutoAdvance = state => state.robot.autoAdvance;

export const advanceLetterAsync = (time) => (dispatch, getState) => {
    console.log('Advance letter async has been called')
    console.log(getState().robot.autoAdvance)

    // Repeat the action until it's permitted to do so
    // this doesn't clean anything up so...
    let refreshID = setInterval(function () {
        if (!getState().robot.autoAdvance) {
            clearInterval(refreshID);
        }
        console.log('Auto advance is on')
        dispatch(advanceToNextLetter());
    }, time)

};

export const {switchRobotOn, switchRobotOff, advanceToNextLetter, sendMessage, enableAutoAdvance, disableAutoAdvance} = robotSlice.actions;

// Selector that will return the current letter
export const selectCurrentLetter = state => alphabet[state.robot.currentLetter];

// Selector for the message to display
export const selectMessage = state => state.robot.message;

export const fetchWord = createAsyncThunk('robot/fetchWord', async (state) => {
    const response = await axios.get(`https://api.datamuse.com/words?sp=a*&max=10000`)
    const randomIndex = Math.floor(Math.random() * 10000);
    return response.data[randomIndex].word;
})

export default robotSlice.reducer;
