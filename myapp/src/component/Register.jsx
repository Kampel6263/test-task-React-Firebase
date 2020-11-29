import React from 'react'
import {NavLink, Redirect} from "react-router-dom";



const Register = ({handleChange, createAccount, loggedIn}) => {

    if(loggedIn){
        return <Redirect to={'/user'}/>
    }

    return (
        <div className='login'>
            <h1>Register</h1>
            <input type="name" className='input' placeholder={'First name'} id={'firstName'}
                   onChange={handleChange}/>
            <input type="surname" className='input' placeholder={'Last name'} id={'lastName'}
                   onChange={handleChange}/>
            <input type="email" className='input' placeholder={'Email'} id={'email'}
                   onChange={handleChange}/>
            <input type="password" placeholder={'Password'} id={'password'} className='input'
                   onChange={handleChange}/>
            <div>
                <button className='submit' onClick={createAccount}>Sing up</button>
                <div className={'footer'}>
                    <span>Already registered?</span>
                    <NavLink to={'/login'} className={'nav_link'}>Log in</NavLink>
                </div>
            </div>

        </div>
    )
}

export default Register
