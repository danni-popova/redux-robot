import {configureStore} from '@reduxjs/toolkit';
import robotReducer, {advanceToNextLetter, sayMessage, showError, switchRobotOn} from '../features/robot/robotSlice';

// Creating and configuring the store
export default configureStore({
    reducer: {
        robot: robotReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(poweredCheckMiddleware)
});


// Implement middleware that will show an error when the robot is off
// and any action is dispatched that isn't switching it on
function poweredCheckMiddleware(storeAPI) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            // If the robot isn't on and the action isn't to turn it on,
            // display an error message for disallowed operation
            if (!storeAPI.getState().robot.isOn && !switchRobotOn.match(action)) {

                if (showError.match(action)) {
                    next(action)
                } else {
                    storeAPI.dispatch(showError())
                    return
                }
            }
            next(action)
        }
    }
}

// Implements a middleware that will make the robot send message for the actions preformed
function messageMiddleware(storeAPI) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            if (storeAPI.getState().robot.isOn && advanceToNextLetter.match(action)) {
                storeAPI.dispatch(sayMessage())
            }
            next(action)
        }
    }
}

// switchRobotOn, switchRobotOff, advanceToNextLetter, sayMessage, showError

// If the robot isn't on, only action allowed is TURN_ON and SHOW_ERROR
// if (!storeAPI.getState().robot.isOn) {
//     if (!switchRobotOn.match(action) || !showError.match(action)) {
//         storeAPI.dispatch(showError())
//     }
// }
// // in any other case, proceed with the action
// next(action)
