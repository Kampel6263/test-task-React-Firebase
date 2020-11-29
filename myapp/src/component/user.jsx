import React from "react";
import clocks from './../Vector.png'
import {Redirect} from "react-router-dom";

const User = ({computerTime, mobileTime, singOut, loggedIn}) => {

    if(!loggedIn){
        return <Redirect to={'/login'}/>
    }

    return (
        <div className={"user"}>
            <button className={'logOut'} onClick={singOut}>Log out</button>
            <div className={'content'}>


                <div className="clock">
                    <h2>Desktop</h2>
                    <div><img src={clocks} alt="Clock"/></div>
                    <span className={'time'}>{computerTime}</span>
                </div>
                <div className="clock">
                    <h2>Mobile</h2>
                    <div><img src={clocks} alt="Clock"/></div>
                    <span className={'time'}>{mobileTime}</span>
                </div>
            </div>
        </div>
    )
}

export default User