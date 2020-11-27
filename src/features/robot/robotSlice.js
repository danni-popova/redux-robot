import {createSlice} from '@reduxjs/toolkit';
import {lookUpWord} from "./robotLookup";
import {alphabet} from "../../constants";

//createSlice: accepts an initial state and a lookup table
// with reducer names and functions, and automatically generates
// action creator functions, action type strings, and a reducer function.
export const robotSlice = createSlice({
    name: 'robot',
    initialState: {
        isOn: false,
        currentLetter: 0,
        nextLetter: 1,
        error: false,
        message: ""
    },
    //createSlice and createReducer wrap your function with produce from the Immer library.
    // This means you can write code that "mutates" the state inside the reducer,
    // and Immer will safely return a correct immutably updated result.
    reducers: {
        switchRobotOn: state => {
            lookUpWord('a');
            return {...state, isOn: true, error: false, message: 'Hello!'}
        },
        switchRobotOff: state => {
            return {...state, isOn: false, message: "", currentLetter: 0, nextLetter: 1}
        },
        // An action that advances to the next letter
        advanceToNextLetter: state => {
            console.log('Getting next letter')
            if (state.currentLetter < 25) {
                return {
                    ...state,
                    currentLetter: state.currentLetter + 1,
                    nextLetter: state.nextLetter + 1,
                    message: 'The current letter is: ' + alphabet[state.currentLetter + 1]
                }
            }
            return {...state, currentLetter: 0}
        },
        sayMessage: state => {
            return {
                ...state,
                message: `Word starting with ${alphabet[state.currentLetter]}: ${lookUpWord()}`
            }
        },
        showError: state => {
            return {...state, error: true}
        }
    },
});


export const advanceLetterAsync = time => dispatch => {
    console.log('advanceLetterAsync')
    setTimeout(() => {
        dispatch(advanceToNextLetter());
    }, time);
};


export const {switchRobotOn, switchRobotOff, advanceToNextLetter, sayMessage, showError} = robotSlice.actions;

// Selector that will tell us if the robot is on
export const selectIsRobotOn = state => state.robot.isOn;

// Selector that will return the current letter
export const selectCurrentLetter = state => state.robot.currentLetter;

// Selector that will return the next letter
export const selectNextLetter = state => state.robot.nextLetter;

// Selector that will return error
export const selectError = state => state.robot.error;

// Selector that will return what the robot should say
export const selectMessage = state => state.robot.message;

export default robotSlice.reducer;
