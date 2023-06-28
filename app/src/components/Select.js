import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const URL = 'http://localhost:3002/';

const MySelect = ({ tipoU, handleChange }) => {

    const [tipos, setTipos] = useState([]);

    useEffect(() => {
        fetch(URL + 'tipos')
            .then(res => res.json())
            .then((data) => {
                setTipos(data);
            })
    }, [])

    return (
        <select name='tipo' value={tipoU} className='form-control' onChange={handleChange}>
            {
                tipos.map((tipo) => {
                    return <option className='form-control' key={tipo.id} value={tipo.descripcion} >{tipo.descripcion}</option>
                })
            }
        </select>
    );
}

export default MySelect;