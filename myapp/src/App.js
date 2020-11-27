import './App.css';
import React, {Component} from "react";
import firebase from "firebase";


export default class App extends Component {

    constructor() {
        super();
        this.state = {
            loggedIn: false,
            hasAccount: true,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            computerVersion: 0,
            mobileVersion: 0,
            userId: ''
        }


    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(userAuth => {
            this.setState({loggedIn: !!userAuth});
            if(!!userAuth){
                this.setState({
                    userId: userAuth.uid
                })
                firebase.database().ref("/users/" + userAuth.uid).on('value', (elem) => {
                    this.setState({computerVersion: elem.val().computerVersion, firstName: elem.val().firstName, lastName: elem.val().lastName, mobileVersion: elem.val().mobileVersion})
                });
                this.doIntervalChange()
            }else {
                clearInterval(this.myInterval)
            }
        });

    };

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    doIntervalChange = ()=>{

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            this.myInterval  = setInterval(()=>{
                this.setState(prevState => ({
                    mobileVersion: prevState.mobileVersion + 1
                }))
            }, 1000)
        }else{
            this.myInterval  = setInterval(()=>{
                this.setState(prevState => ({
                    computerVersion: prevState.computerVersion + 1
                }))
            }, 1000)
        }



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
                firebase.database().ref("/users/" + response.user.uid).set({
                    firstName: firstName, lastName: lastName, computerVersion: 0, mobileVersion: 0
                })
                this.setState({userId: response.user.uid})
            })

    }


    login = () => {
        const {email, password} = this.state
        firebase.auth().signInWithEmailAndPassword(email, password).then(
            response => {
                firebase.database().ref("/users/" + response.user.uid).on('value', (elem) => {
                    this.setState({computerVersion: elem.val().computerVersion, mobileVersion: elem.val().mobileVersion, userId: response.user.uid})
                });

            }
        )
    }

    registerBlock = () => {
        this.setState({hasAccount: false})
    }

    loginBlock = () => {
        this.setState({hasAccount: true})
    }

    singOut = () => {
        const {computerVersion, mobileVersion, firstName, lastName } = this.state
        firebase.auth().signOut().then(
            firebase.database().ref("/users/" + this.state.userId).set(
                {computerVersion: computerVersion, mobileVersion: mobileVersion, firstName: firstName, lastName: lastName})
        )

        // console.log(this.state)
    }

    render() {
        const {loggedIn, hasAccount} = this.state

// console.log(this.state)


        return (
            <div>

                {loggedIn ? <div>
                    <button onClick={this.singOut}>Log out</button>
                    <br/>
                    Hello, {this.state.firstName}
                    <br/>
                    {this.state.computerVersion}
                    <br/>
                    {this.state.mobileVersion}

                </div> : <div>
                    {hasAccount ? <div className='login'>

                        <h1>Login</h1>
                        <input type="email" className='input' placeholder={'Email'} id={'email'}
                               onChange={this.handleChange}/>
                        <input type="password" placeholder={'Password'} id={'password'} className='input'
                               onChange={this.handleChange}/>
                        <input type="submit" className='submit' onClick={this.login}/>
                        <span onClick={this.registerBlock}>Register</span>

                    </div> : <div className='login'>
                        <h1>Register</h1>
                        <input type="name" placeholder={'First name'} id={'firstName'} onChange={this.handleChange}/>
                        <input type="surname" placeholder={'Last name'} id={'lastName'} onChange={this.handleChange}/>
                        <input type="email" className='input' placeholder={'Email'} id={'email'}
                               onChange={this.handleChange}/>
                        <input type="password" placeholder={'Password'} id={'password'} className='input'
                               onChange={this.handleChange}/>
                        <input type="submit" className='submit' onClick={this.createAccount}/>
                        <span onClick={this.loginBlock}>Log in</span>
                    </div>}
                </div>}
            </div>
        );
    }
}

