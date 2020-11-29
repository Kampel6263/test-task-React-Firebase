import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase'
import {BrowserRouter} from "react-router-dom";

const firebaseConfig = {
    apiKey: "AIzaSyD-ub3EXidon0XCyqJBbg6w1GZr2i6Vvic",
    authDomain: "test-task-timer-app.firebaseapp.com",
    databaseURL: "https://test-task-timer-app.firebaseio.com",
    projectId: "test-task-timer-app",
    storageBucket: "test-task-timer-app.appspot.com",
    messagingSenderId: "61714570147",
    appId: "1:61714570147:web:27b2434d1d9b4662921816"
}

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
