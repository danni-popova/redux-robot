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
        nextLetter: 1,
        error: false,
        speech: ""
    },
    //createSlice and createReducer wrap your function with produce from the Immer library.
    // This means you can write code that "mutates" the state inside the reducer,
    // and Immer will safely return a correct immutably updated result.
    reducers: {
        SWITCH_ON: state => {
            lookUpWord('a');
            return {...state, isOn: true, error: false, speech: 'Hello!'}
        },
        SWITCH_OFF: state => {
            return {...state, isOn: false, speech: ""}
        },
        GET_NEXT_LETTER: state => {
            console.log('Getting next letter')
            if (state.currentLetter < 25) {
                return {
                    ...state,
                    currentLetter: state.currentLetter + 1,
                    nextLetter: state.nextLetter + 1
                }
            }
            return {...state, currentLetter: 0}
        },
        DISPLAY_ERROR: state => {
            return {...state, error: true}
        }
    },
});


// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const advanceLetterAsync = time => dispatch => {
    console.log('advanceLetterAsync')
    setTimeout(() => {
        dispatch(GET_NEXT_LETTER());
    }, time);
};


export const {SWITCH_ON, SWITCH_OFF, GET_NEXT_LETTER, DISPLAY_ERROR, SPEAK} = robotSlice.actions;

// Selector that will tell us if the robot is on
export const selectIsRobotOn = state => state.robot.isOn;

// Selector that will return error
export const selectError = state => state.robot.error;

// Selector that will return what the robot should say
export const selectSpeech = state => state.robot.speech;

export default robotSlice.reducer;
