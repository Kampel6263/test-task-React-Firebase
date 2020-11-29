import React from 'react'
import {NavLink, Redirect} from "react-router-dom";

const Login = ({handleChange,login, loggedIn}) => {

    if(loggedIn){
        return <Redirect to={'/user'}/>
    }

    return (
        <div className='login'>
            <h1>Login</h1>

            <input type="email" className='input' placeholder={'Email'} id={'email'}
                   onChange={handleChange}/>
            <input type="password" placeholder={'Password'} id={'password'} className='input'
                   onChange={handleChange}/>
            <div>
                <button className="submit" onClick={login}>Login</button>
                <div className={'footer'}>
                    <span>Don’t have an account yet?</span>
                    <NavLink to={'/register'} className={'nav_link'}>Register</NavLink>
                </div>
            </div>

        </div>
    )
}

export default Login