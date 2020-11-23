# redux-robot
Learning Redux with a simple robot.

## Making a robot
- [ ] First make a project with redux dependencies. The project could be a command line program or a web application or anything else that you like.
- [ ] We are going to build a robot, this is basically a redux store. Create the store.
- [ ] The first thing we want to do is switch the robot on and off, so make 2 actions that do that. Put them in an `actions` folder. Actions are modelled via the FSA standard.
- [ ] Now if we switch on the robot, we want to set some state that will indicate that, if we switch it off, we also want to save that as state. So in the state, have a property `isOn` that is a boolean.
- [ ] now, make a reducer that will react to the on and off actions and reduce those actions into state that indicates if the robot is on or off (via the isOn property). 
- [ ] Since we love TDD we should first make a unit test and then build the logic.
- [ ] Now if we want to figure out if the robot is on or off, we can now that by inspecting the state. But! We never work with state directly! Only reducers may modify state, and only selectors may read state. So we make a selector (selectIsRobotOn?) that will tell us if the robot is on. Ofcourse, because we love TDD, we make the unit test first!
- [ ] Now we have a robot that we can switch on or off! And we can figure out if the robot is on or off! Make something cool with that.

## Making it cooler

Now this robot is pretty boring we can only switch it on or off! We want a
cooler robot!

- [x] We all know nothing is cooler than a robot that knows the alphabet! So let's make that!
- [x] we start with adding a `currentLetter` to the state. Ofcourse we start with A!
- [x] We want to ask the robot what the current letter is, so we make a selector that does that!
- [x] So now our robot can give us only an A, very boring still. We want our robot to advance to the next letter. So let's make an action for that. The action will reduce the state so that it wil advance to the next letter. When we get to Z and then move to then next letter, our robot will start with A again.
- [ ] Now we can ask our robot for the next letter in the alphabet and we can ask it what the current letter is. Now when the robot is switched on, the current letter state should be reset to A. The reducer that is responsible for setting that state should also respond to the switch on action!
- [ ] Also when the robot is switched off, and we ask it for the current letter, an exception should be thrown. We cannot ask a letter to a robot that is switched off, that would just be weird.
- [ ] There is one other weird thing, when we ask the robot to advance to the next letter and it is switched off we also want to get an error. We cannot ask something of a robot that is switched off, that would be weird. Actually the only thing we can do with a robot that is switched off, is switching him on. All other actions should result in an error. So this seems like a use case for middleware! So implement some middleware that will throw an error when the robot is off and any action is dispatched that is not switching it on.

## automating things

Our robot is not really a robot yet, it will not tell us anything on it's own. It is not doing anything on it's own! So let's make the robot do automatic things.

- [ ] We start by making the robot able to speak! Implement an action that we can use to say messages.
- [ ] Next make some middleware that will react to that action. The middleware will pick up the action and make the robot actually speak. Our robot might not be able to speak for real, but at least it has a console that it can send messages to. However, it would be really nice if the robot would actually speak.
- [ ] So now our robot can speak! Let's have him greet us when it's switched on! And, when the current letter state advances, have the computer say that letter. So we can implement this by having the middleware dispatch actions.
- [ ] And now, let's make the robot advance letters automatically! So for that we want to make an action to start the automatic advancement and one to stop. The start action should also include an interval that will be the time between every letter.
- [ ] We implement the start / stop messages as middleware! Also take care of clean up resources when the automatic letter advancement is stopped. Also when the robot is switched off it should cleanup resources.
- [ ] Simply reciting the alphabet is something that a human also can do, this is not why we need a robot. Let's make it a bit more interesting. Every time we advance to a new letter, the robot will look up a word that starts with that letter and say it out loud. Use either an api or a word list!
