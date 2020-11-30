import {configureStore} from '@reduxjs/toolkit';
import robotReducer, {
    advanceToNextLetter,
    lookUpWordAsync,
    sendMessage, setWord,
    switchRobotOn
} from '../features/robot/robotSlice';

export default configureStore({
    reducer: {
        robot: robotReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(poweredCheckMiddleware, sendMessagesMiddleware)
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

function sendMessagesMiddleware(storeAPI) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            // The robot will greet us when it's switched on
            if (switchRobotOn.match(action)) {
                next(sendMessage('greet'))
            }

            // The robot should update the message with the word
            if(setWord.match(action)){
                // First set the actual value of the word
                next(action)

                // Then display it
                next(sendMessage('set-word'))
                return
            }

            // The robot will say the next letter when the advance action is called
            if (advanceToNextLetter.match(action)) {
                // First, should change the letter
                next(action)

                // send message will set next letter and the message
                next(sendMessage('display-letter'))

                // lookUpWord wil will set word
                storeAPI.dispatch(lookUpWordAsync())
                return
            }
            next(action)
        }
    }
}

function logger(store) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            console.group(action.type)
            console.info('dispatching', action)
            let result = next(action)
            console.log('next state', store.getState())
            console.groupEnd()
            return result
        }
    }
}
