import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Row = ({ mascota, setMascotaEditar, eliminarMascota }) => {


    const handleModificarMascota = () => {
        setMascotaEditar(mascota)
    }

    const handleEliminarMascota = () => {
        eliminarMascota(mascota.id);
    }

    return (
        <tr>
            <td>{mascota.nombre}</td>
            <td>{mascota.tipo}</td>
            <td>
                <Link className='btn btn-primary' to={'detail/' + mascota.id} > Detalles </Link>
            </td>
            <td>
                <button className='btn btn-warning' onClick={handleModificarMascota} > Modificar </button>
            </td>
            <td>
                <button className='btn btn-danger' onClick={handleEliminarMascota} > Eliminar </button>
            </td>
        </tr>
    );
}

export default Row;