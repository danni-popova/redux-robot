import {configureStore} from '@reduxjs/toolkit';
import robotReducer, {DISPLAY_ERROR, SWITCH_ON} from '../features/robot/robotSlice';


export default configureStore({
    reducer: {
        robot: robotReducer,
    },
    middleware: [poweredCheckMiddleware],
});


function poweredCheckMiddleware(storeAPI) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            // If the robot isn't on and the action isn't to turn it on,
            // display an error message for disallowed operation
            if (!storeAPI.getState().robot.isOn && !SWITCH_ON.match(action)) {

                if (DISPLAY_ERROR.match(action)) {
                    next(action)
                } else {
                    storeAPI.dispatch(DISPLAY_ERROR())
                }
            }
            next(action)
        }
    }
}