/* eslint-disable no-unreachable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import Loading from '../pages/Loading'

// import '../../index.css';
// const dotenv = require('dotenv').config()

const ajaxGetUser = async (jwt) => {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/v1/who-am-i`;
    console.log(url);
    const res = await fetch(
        url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-access-token': jwt
        }
    }
    );
    return res;
}

const destroyToken = (token) => {
    if (token !== '') {
        localStorage.removeItem('x-access-token');
    }
}


function ProtectedRoute({ children }) {

    const [navigate, setNav] = useState(null);

    console.log('Ini diulangi');

    useEffect(() => {
        try {
            let token = localStorage.getItem('x-access-token');
            token = token == null ? '' : token;
            console.log(token);
            ajaxGetUser(token).then(result => {
                result.json().then(json => {
                    if (result.status !== 200) {
                        console.log("Ini error : ", json);
                        destroyToken(token);
                        setNav('/login')
                    } else {
                        if (json.user.access_level == 0) {
                            setNav('')
                        } else {
                            destroyToken(token);
                            setNav('/login')
                        }
                    }
                    console.log(navigate);
                }).catch(err => {
                    console.log(err);
                    destroyToken(token);
                    setNav('/login')
                })
            }).catch(err => {
                console.log(err);
                destroyToken(token);
                setNav('/login')
            })
        } catch (error) {
            console.log(error);
            setNav('/login')
        }
        console.log(navigate);
    })
    console.log(navigate);
    return (
        navigate === null ? <Loading></Loading> : (
            navigate === '' ? children : <Navigate to={navigate} />
        )
    )

}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
}

export { ProtectedRoute };