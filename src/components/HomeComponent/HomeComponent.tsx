import React from 'react';
import { Redirect } from 'react-router-dom';

export interface IHomeProps {
    username: string
}

const HomeComponent = (props: IHomeProps) => {

    return (
        !props.username ?
        <Redirect to="/login" /> : 
        <h1 style={{textAlign: 'center',
                    fontSize: '300%' }}>Welcome, {props.username}!</h1>
    );

}

export default HomeComponent;