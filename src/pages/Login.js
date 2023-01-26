import React, { useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'

async function ajaxLogin(email, password) {
    const data = {
        email, password
    }
    const url = `${process.env.REACT_APP_API_SERVER_URL}`
    // console.log(process.env.REACT_APP_API_SERVER, process.env.REACT_APP_ENDPOINT_BASE_URL, url);
    const response = await fetch(`${url}/api/v1/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password,
        }),
    })

    return response
}

function Login() {

    const navigate = useNavigate()
    const email = useRef(null)
    const password = useRef(null)

    const [isLoading, setLoading] = useState(false)
    const [alert, setAlert] = useState(null)
    // const { getHistoryData } = useSelector(state => state.historyReducer)

    const onSubmit = async (e) => {
        console.log("test");
        e.preventDefault()
        setLoading(true)
        try {
            let response = await ajaxLogin(email.current.value, password.current.value)
            let JSONRes = await response.json()
            if (response.status === 200) {
                localStorage.setItem('x-access-token', JSONRes.token);
                setLoading(false)
                console.log(JSONRes.user.access_level);
                if (JSONRes.user.active == true && JSONRes.user.access_level == 0) {
                    navigate('/')
                } else {
                    setAlert('Akun and bukan akun admin')
                }
            } else {
                setLoading(false)
                setAlert(JSONRes.errors)
            }
        } catch (error) {
            setLoading(false)
            setAlert(error)
        }
    }

    return (
        localStorage.getItem('x-access-token') === null ? (
            <div>
                <nav className="navbar bg-primary">
                    <div className="container">
                        <a className="navbar-brand" href="#">
                            <img src="/logo-web6@2x.png" alt="MyAirFare" width="100" />
                        </a>
                    </div>
                </nav>
                <div className='container mt-5 p-5'>
                    {alert != null ? (<div className="alert alert-danger mt-3 mb-3" role="alert">
                        `{alert}`
                    </div>) : ''}
                    <form action='' onSubmit={onSubmit} className='shadow p-3 mb-5 bg-body rounded my-auto mt-5'>
                        <div className='text-center'>
                            <h3>Login Admin</h3>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={email} />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" ref={password} />
                        </div>

                        <div className='w-100 text-center'>
                            {isLoading ? (
                                <button className="btn btn-primary" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Loading...
                                </button>
                            ) : (
                                <button type="submit" className="btn btn-primary w-100 mt-5">Login</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        ) : (
            <Navigate to={'/'}></Navigate>
        )
    )
}

export default Login