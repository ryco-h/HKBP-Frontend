import { useEffect, useState, Fragment } from "react";
import { useAdminStyles } from "./admin.style"
import { url } from "../../services/URL";
import Loader from "../../services/loader";

import axios from 'axios'
import { decodeToken } from "react-jwt";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Button, TextField, Typography } from "@mui/material";

export default function AdminIndex() {

    const styles = useAdminStyles()

    const [errorMessages, setErrorMessages] = useState({});
    const [loading, setLoading] = useState(false)
    const [login, setLogin] = useState({
        username: '',
        password: ''
    })

    const handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();
        setLoading(true)

        await axios.post(`${url.backend}/auth/login`, login)
        .then(res => {

            const token = decodeToken(res.data.account.token)

            if(!token.success) {
                window.alert('Username atau Password salah.')
            } else {
                window.alert('Berhasil masuk')
                localStorage.setItem('access_token', res.data.account.token)
            }
            setLoading(false)
        })
        .catch(res => {
            setLoading(false)
        })
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
    );

    const navigate = useNavigate()
    const token = localStorage.getItem('access_token')
    const pathname = useLocation().pathname
    
    useEffect(() => {
        loader()
    }, [token])

    const loader = () => {

        if (pathname === '/admin' && token) {
            navigate('/admin/dashboard')
        }
    };

    const handleChange = (event) => {
        const value = event.target.value
        const id = event.target.id

        login[id] = value
        setLogin(login)
    }

    return (
        <Fragment>
            {(!token) ? 
                <div className={styles.root}>
                    <div className={styles.body}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.loginForm}>
                                <Typography variant='h5' sx={title}>Masuk</Typography>
                                <div className={styles.loginBody}>
                                    <TextField
                                        id="username"
                                        label="Username"
                                        variant="filled"
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        id="password"
                                        label="Password"
                                        type="password"
                                        variant="filled"
                                        onChange={handleChange}
                                    />
                                    <Button variant='contained' type='submit'>Submit</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <Loader open={loading}/>
                </div>
            :
                <Outlet/>
            }
        </Fragment>
    );
}

const title = {
    fontFamily: 'Poppins'
}