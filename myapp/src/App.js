import './App.css';
import React, {Component} from "react";
import firebase from "firebase";
import Login from "./component/Login";
import Register from "./component/Register";
import User from "./component/user";
import {Redirect, Route} from 'react-router-dom';


class App extends Component {

    constructor() {
        super();
        this.state = {
            loggedIn: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            computerVersion: 0,
            mobileVersion: 0,
            userId: '',
            computerTime: '00:00:00',
            mobileTime: '00:00:00'
        }

    }

    returnTime = (time, devise) => {
        let seconds
        let minutes
        let hours

        if (time < 60) {
            seconds = time
            minutes = 0
            hours = 0
        } else {
            minutes = Math.floor(time / 60)
            seconds = time % 60

            if (minutes >= 60) {
                hours = Math.floor(minutes / 60)
                minutes = minutes % 60

            } else {
                hours = 0
            }
        }

        const addZero = (number) => {
            if (number < 10) {
                number = '0' + number
                return number
            } else {
                return number + ''
            }
        }

        hours = addZero(hours)
        minutes = addZero(minutes)
        seconds = addZero(seconds)

        time = hours + ':' + minutes + ':' + seconds

        if (devise === 'computer') {
            this.setState({computerTime: time})
        } else {
            this.setState({mobileTime: time})
        }

    }

    setDataToDataBase = (computerVersion, mobileVersion, firstName, lastName, userId) => {

        firebase.database().ref("/users/" + userId).set(
            {
                computerVersion: computerVersion,
                mobileVersion: mobileVersion,
                firstName: firstName,
                lastName: lastName
            })
    }

    setDataToState = (userId) => {
        firebase.database().ref("/users/" + userId).on('value', (elem) => {

            // if (this.state.computerVersion === 0 && this.state.mobileVersion === 0) {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

                if (this.state.computerVersion === 0) {
                    this.setState({
                        mobileVersion: elem.val().mobileVersion
                    })
                }
                this.setState({
                    computerVersion: elem.val().computerVersion,

                })


            } else {
                if (this.state.computerVersion === 0) {
                    this.setState({
                        computerVersion: elem.val().computerVersion
                    })
                }
                this.setState({
                    mobileVersion: elem.val().mobileVersion,

                })
            }
            this.setState({
                firstName: elem.val().firstName,
                lastName: elem.val().lastName,
                userId: userId
            })

            // }
        })
    }

    componentDidMount = () => {


        firebase.auth().onAuthStateChanged(userAuth => {
            this.setState({loggedIn: !!userAuth});
            if (!!userAuth) {
                this.setDataToState(userAuth.uid)
                this.doIntervalChange()
                this.returnTime(this.state.mobileVersion, 'mobile')
                this.returnTime(this.state.computerVersion, 'computer')
                return (
                    <Redirect to={'/user'}/>
                )
            } else {
                clearInterval(this.myInterval)
                return (
                    <Redirect to={'/login'}/>
                )
            }
        });

    };


    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    doIntervalChange = () => {
        this.myInterval = setInterval(() => {
            this.setDataToState(this.state.userId)
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                this.setState(prevState => ({
                    mobileVersion: prevState.mobileVersion + 1
                }))
            } else {
                this.setState(prevState => ({
                    computerVersion: prevState.computerVersion + 1
                }))
            }
            this.returnTime(this.state.mobileVersion, 'mobile')
            this.returnTime(this.state.computerVersion, 'computer')
            this.setDataToDataBase(this.state.computerVersion, this.state.mobileVersion, this.state.firstName, this.state.lastName, this.state.userId)
        }, 1000)

    }


    handleChange = ({target: {value, id}}) => {
        this.setState({
            [id]: value
        })

    }

    createAccount = () => {
        const {firstName, lastName, email, password} = this.state
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
            response => {
                this.setDataToDataBase(0, 0, firstName, lastName, response.user.uid)
                this.setState({computerVersion: 0, mobileVersion: 0, userId: response.user.uid})

            })

    }


    login = () => {
        const {email, password} = this.state
        firebase.auth().signInWithEmailAndPassword(email, password).then(
            response => {
                this.setDataToState(response.user.uid)
                this.setState({computerVersion: 0, mobileVersion: 0, userId: response.user.uid})

            }
        )
    }


    singOut = () => {
        const {computerVersion, mobileVersion, firstName, lastName} = this.state
        firebase.auth().signOut().then(
            response => {
                this.setDataToDataBase(computerVersion, mobileVersion, firstName, lastName, this.state.userId)

            }
        )

    }


    render() {

        return (
            <div>
                <Route path={'/user'} render={() => <User
                    computerTime={this.state.computerTime}
                    mobileTime={this.state.mobileTime}
                    singOut={this.singOut}
                    loggedIn={this.state.loggedIn}
                />}

                />
                <Route path={'/login'} render={() => <Login handleChange={this.handleChange}
                                                            login={this.login}
                                                            loggedIn={this.state.loggedIn}
                />}/>
                <Route path={'/register'}
                       render={() => <Register handleChange={this.handleChange}
                                               createAccount={this.createAccount}
                                               loggedIn={this.state.loggedIn}/>}/>
                <Redirect from={'/'} to={'/login'}/>
            </div>
        );
    }
}

export default App