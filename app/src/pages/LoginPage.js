import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {

    const [login, setLogin] = useState(true);

    const handleLogin = (e) => {
        login ? setLogin(false) : setLogin(true)
        console.log(login)
    }

    return (
        <div className='containerLogin'>
            <LoginForm className='formlogin' esLogin={login} ></LoginForm>
            <button className='btn btn-warning mb-3' onClick={handleLogin} > {login ? "Registrarse" : "Ir al Login"}  </button>
        </div>
    );
}

export default LoginPage;