import {createSlice} from '@reduxjs/toolkit';
import {lookUpWord} from "./robotLookup";

//createSlice: accepts an initial state and a lookup table
// with reducer names and functions, and automatically generates
// action creator functions, action type strings, and a reducer function.
export const robotSlice = createSlice({
    name: 'robot',
    initialState: {
        isOn: false,
        currentLetter: 0,
        error: false,
        speech: "Hello"
    },
    //createSlice and createReducer wrap your function with produce from the Immer library.
    // This means you can write code that "mutates" the state inside the reducer,
    // and Immer will safely return a correct immutably updated result.
    reducers: {
        SWITCH_ON: state => {
            console.log('switching robot on')
            lookUpWord('a');
            return {...state, isOn: true, error: false}
        },
        SWITCH_OFF: state => {
            console.log('switching robot off')
            return {...state, isOn: false}
        },
        GET_NEXT_LETTER: state => {
            console.log('getting next letter action dispatched')
            if (state.currentLetter < 25) {
                return {...state, currentLetter: state.currentLetter + 1}
            }
            return {...state, currentLetter: 0}
        },
        DISPLAY_ERROR: state => {
            console.log('display error action was dispatched')
            return {...state, error: true}
        },
        SPEAK: state => {

        }
    },
});

// Actions to switch the robot on and off
export const {SWITCH_ON, SWITCH_OFF, GET_NEXT_LETTER, DISPLAY_ERROR, SPEAK} = robotSlice.actions;

// Selector that will tell us if the robot is on
export const selectIsRobotOn = state => state.robot.isOn;

// Selector that will tell us the current letter
export const selectCurrentLetter = state => state.robot.currentLetter;

// Selector that will return error
export const selectError = state => state.robot.error;

// Selector that will return what the robot should say
export const selectSpeech = state => state.robot.speech;

export default robotSlice.reducer;
