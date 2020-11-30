import {configureStore} from '@reduxjs/toolkit';
import robotReducer, {
    advanceLetterAsync,
    advanceToNextLetter,
    enableAutoAdvance,
    sendMessage,
    switchRobotOn
} from '../features/robot/robotSlice';

export default configureStore({
    reducer: {
        robot: robotReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(poweredCheckMiddleware, sayMessagesMiddleware, autoAdvanceMiddleware)
});

// Middleware that will stop any actions to be performed on the robot when it's off
// unless the action is to turn it on
function poweredCheckMiddleware(storeAPI) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            if (!storeAPI.getState().robot.isOn && !switchRobotOn.match(action)) {
                console.error('Action is not permitted, robot is off!')
                return
            }
            next(action)
        }
    }
}

function sayMessagesMiddleware(storeAPI) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            // The robot will greet us when it's switched on
            if (switchRobotOn.match(action)) {
                next(sendMessage('greet'))
            }

            // The robot will say the next letter when the advance action is called
            if (advanceToNextLetter.match(action)) {
                next(sendMessage('next-letter'))
            }

            next(action)
        }
    }
}

function autoAdvanceMiddleware() {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            // if(enableAutoAdvance.match(action)){
            //     console.log('auto-advance enabled')
            //     advanceLetterAsync()
            // }
            next(action)
        }
    }
}