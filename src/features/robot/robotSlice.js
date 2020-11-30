import {createSlice} from '@reduxjs/toolkit';
import {alphabet} from "../../constants";
import axios from "axios";

export const robotSlice = createSlice({
    name: 'robot',
    initialState: {
        isOn: false,
        currentLetter: 0,
        error: false,
        message: "",
        autoAdvance: false,
        word: '',
    },
    reducers: {
        // Reducers and actions for turning the robot on and off
        switchRobotOn: state => {
            return {...state, isOn: true, error: false}
        },
        switchRobotOff: state => {
            return {...state, isOn: false, currentLetter: 0, message: "", autoAdvance: false}
        },
        enableAutoAdvance: state => {
            return {...state, autoAdvance: true}
        },
        disableAutoAdvance: state => {
            return {...state, autoAdvance: false}
        },
        setWord: (state, action) => {
            return {...state, word: action.payload}
        },
        // An action that advances to the next letter
        advanceToNextLetter: state => {
            // If the last letter is reached, start again
            if (state.currentLetter < 25) {
                return {
                    ...state,
                    currentLetter: state.currentLetter + 1,
                }
            }
            return {...state, currentLetter: 0}
        },
        // An action to use that says messages
        sendMessage: (state, action) => {
            let messageToSend;

            switch (action.payload) {
                case 'display-letter':
                    const letter = alphabet[state.currentLetter];
                    messageToSend = `Current letter is: "${letter}"`;
                    break;

                case 'greet':
                    messageToSend = 'Hello!'
                    break;

                case 'set-word':
                    const currentLetter = alphabet[state.currentLetter];
                    messageToSend = `Current letter is: "${currentLetter}". Random word: ${state.word}`;
                    break;

                default:
                    messageToSend = 'Some other action was called'
            }

            return {...state, message: messageToSend}
        },
    },
});

// Selector that will tell us if the robot is on
export const selectIsRobotOn = state => state.robot.isOn;

// Selector that will tell us if the robot should advance to the next letter automatically
export const selectAutoAdvance = state => state.robot.autoAdvance;

// Selector that will tell us if we should show error
export const selectError = state => state.robot.error;

// Selector that will return the current letter - no longer needed because of the sendMessage functionality
// export const selectCurrentLetter = state => alphabet[state.robot.currentLetter];

// Selector for the message to display
export const selectMessage = state => state.robot.message;

// Robot
export const advanceLetterAsync = (time) => (dispatch, getState) => {
    // Repeat the action until it's auto advance is turned off
    let refreshID = setInterval(function () {
        if (!getState().robot.autoAdvance) {
            clearInterval(refreshID);
            return
        }
        dispatch(advanceToNextLetter());
    }, time)

};

export const lookUpWordAsync = () => async (dispatch, getState) => {
    const letter = alphabet[getState().robot.currentLetter];
    const response = await axios.get(`https://api.datamuse.com/words?sp=${letter}*&max=1000`)
    const randomIndex = Math.floor(Math.random() * 1000);
    dispatch(setWord(response.data[randomIndex].word))
};

export const {switchRobotOn, switchRobotOff, advanceToNextLetter, sendMessage, enableAutoAdvance, disableAutoAdvance, setWord} = robotSlice.actions;

export default robotSlice.reducer;
