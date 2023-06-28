import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import MySelect from './Select';


const initialForm = {
    id: null,
    nombre: "",
    edad: "",
    tipo: "",
    vacunado: false,
    observaciones: ""
};

const Form = ({ mascotaU, agregarMascota, modificarMascota }) => {

    const [form, setForm] = useState(initialForm)
    const { id, nombre, edad, tipo, vacunado, observaciones } = form;

    useEffect(() => {
        if (mascotaU)
            setForm(mascotaU)
    }, [mascotaU])

    const handleReset = () => {
        setForm(initialForm);
    };

    const handleChange = (e) => {
        setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Enviando...");

        if (id) {
            modificarMascota(form);
        } else {
            agregarMascota(form);
        }
        handleReset();
    }


    return (
        <form onSubmit={handleSubmit} >
            <input 
                type="text"
                name="nombre"
                placeholder="Ingrese nombre..."
                className='form-control'
                value={nombre}
                onChange={handleChange}
            />
            <input
                type="number"
                name="edad"
                placeholder="Ingrese edad..."
                className='form-control'
                value={edad}
                onChange={handleChange}
            />
            <MySelect tipoU={tipo} handleChange={handleChange} />
            <label htmlFor='vacunado' value="Esta vacunado?" >Esta vacunado </label>
            <select name="vacunado" className='form-control' value={vacunado} onChange={handleChange} >
                <option value={true}> Si </option>
                <option value={false}> No </option>
            </select>
            <input
                type="text"
                name="observaciones"
                placeholder="Observaciones..."
                className='form-control'
                value={observaciones}
                onChange={handleChange}
            />

            <button type="submit" className="btn btn-primary mb-3">Enviar</button>
            <button type="reset" className="btn btn-secondary mb-3" onClick={handleReset} >Limpiar</button>

        </form>
    );
}

export default Form;