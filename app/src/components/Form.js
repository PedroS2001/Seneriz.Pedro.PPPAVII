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
            <label htmlFor='nombre' className='label' > Nombre </label>
            <input
                id='nombre'
                type="text"
                name="nombre"
                placeholder="Ingrese nombre..."
                className='form-control '
                value={nombre}
                onChange={handleChange}
            />
            <label htmlFor='edad' className='label' > Edad </label>
            <input
                id='edad'
                type="number"
                name="edad"
                placeholder="Ingrese edad..."
                className='form-control '
                value={edad}
                onChange={handleChange}
            />
            <label htmlFor='tipo' className='label'> Tipo </label>
            <MySelect id='tipo' tipoU={tipo} handleChange={handleChange} />
            <label htmlFor='vacunado' className='label'> Esta vacunado? </label>
            <select name="vacunado" id='vacunado' className='form-control' value={vacunado} onChange={handleChange} >
                <option value={true}> Si </option>
                <option value={false}> No </option>
            </select>
            <label htmlFor='observaciones' className='label' > Observaciones </label>
            <input
                id='observaciones'
                type="text"
                name="observaciones"
                placeholder="Observaciones..."
                className='form-control'
                value={observaciones}
                onChange={handleChange}
            />
            <div className='centrar mt-3 gap-3'>
                <button type="submit" className="btn btn-primary mb-3"> Enviar </button>
                <button type="reset" className="btn btn-secondary mb-3" onClick={handleReset} > Limpiar </button>
            </div>

        </form>
    );
}

export default Form;