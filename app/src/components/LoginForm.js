import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const initialForm = {
    correo: "",
    clave: ""
};

const URL = 'http://localhost:3001/api/';
const LoginForm = ({ esLogin }) => {

    const [form, setForm] = useState(initialForm)
    const { correo, clave } = form;

    let history = useHistory();
    useEffect(() => {
        console.log(esLogin)
    }, [esLogin])

    const handleReset = () => {
        setForm(initialForm);
    };

    const handleChange = (e) => {
        setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Enviando...", form);
        if (esLogin) {
            console.log("Iniciar Sesion");
            iniciarSesion();
        } else {
            console.log("Agregar usuario");
            agregarUsuario()
        }

    }

    const iniciarSesion = () => {
        fetch(URL + 'user/login', {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then((data) => {
                if (data.error) {
                    return alert(data.message);
                }
                console.log(data);
                localStorage.setItem("token", data.token);
                alert("Ingreso exitoso");
                history.push("/home");
                handleReset();
            })
            .catch(err => console.log(err))
            .finally(() => {
            })
    }

    const agregarUsuario = () => {
        fetch(URL + 'user/', {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then((data) => {
                if (data.error) {
                    return alert(data.message);
                }
                console.log(data);
                alert("Usuario dado de alta");
                handleReset();
            })
            .catch(err => console.log(err))
            .finally(() => {
            })

    }






    return (
        <form onSubmit={handleSubmit} >
            <label htmlFor='correo' className='label' > Correo </label>
            <input
                id='correo'
                type="email"
                name="correo"
                placeholder="Ingrese correo..."
                className='form-control '
                value={correo}
                onChange={handleChange}
            />
            <label htmlFor='clave' className='label' > Clave </label>
            <input
                id='clave'
                type="password"
                name="clave"
                placeholder="Ingrese clave..."
                className='form-control '
                value={clave}
                onChange={handleChange}
            />
            <div className='centrar mt-3 gap-3'>
                <button type="submit" className="btn btn-primary mb-3"> {esLogin ? "Iniciar sesion" : "Crear cuenta"} </button>
                <button type="reset" className="btn btn-secondary mb-3" onClick={handleReset} > Limpiar </button>
            </div>
        </form>
    );
}

export default LoginForm;