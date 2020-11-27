import React from 'react';
import {Robot} from "./components/robot";
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import './App.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#5cb2c9',
            main: '#349fbc',
            dark: '#246f83',
            contrastText: '#c8e4fb'
        },
        secondary: {
            light: '#e7c43b',
            dark: '#9d7f07',
            main: '#e1b60b',
            contrastText: '#ffffff'
        }
    }
});

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <header className="App-header">
                    <Robot/>
                </header>
            </div>
        </MuiThemeProvider>
    );
}

export default App;
