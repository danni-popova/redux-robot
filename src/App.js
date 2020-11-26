import React from 'react';
import {Robot} from "./components/robot";
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import './App.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#000000',
            main: '#7F0000',
            dark: '#00d57c',
            contrastText: '#fff'
        },
        secondary: {
            light: '#000000',
            dark: '#36393f',
            main: '#1DEB7E',
            contrastText: '#fff'
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
