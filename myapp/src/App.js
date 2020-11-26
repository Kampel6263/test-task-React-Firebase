import './App.css';
import React, {Component} from "react";
import firebase from "firebase";

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            loggedIn: false,
            hasAccount: false,
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }
    }

    componentDidMount() {
        const db = firebase.database()
        console.log(db)
    }

    handleChange = ({target: {value, id}}) => {
        this.setState({
            [id]: value
        })
        
    }

    createAccount = () =>{
        const {firstName, lastName, email, password} = this.state
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
            response => {
                this.setState({hasAccount: true})
            }
        )

    }

    render() {
        const {loggedIn, hasAccount} = this.state

        return (

            <div>
                {loggedIn ? <div> Logged in  </div> : <div>
                    {hasAccount ? <div className='login'>

                        <h1>Login</h1>
                        <input type="email" className='input' placeholder={'Email'}  onChange={this.handleChange}/>
                        <input type="password" placeholder={'Password'} className='input' onChange={this.handleChange}/>
                        <input type="submit" className='submit'/>
                        <span>Register</span>

                    </div> : <div className='login'>


                        <h1>Register</h1>
                        <input type="name" placeholder={'First name'} id={'firstName'} onChange={this.handleChange}/>
                        <input type="surname" placeholder={'Last name'} id={'lastName'} onChange={this.handleChange}/>
                        <input type="email" className='input' placeholder={'Email'} id={'email'}  onChange={this.handleChange}/>
                        <input type="password" placeholder={'Password'} id={'password'} className='input' onChange={this.handleChange}/>
                        <input type="submit" className='submit' onClick={this.createAccount}/>
                    </div>}
                </div>}
            </div>



        );
    }


}

