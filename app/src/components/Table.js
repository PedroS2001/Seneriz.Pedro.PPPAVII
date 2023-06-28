import React from 'react';
import Row from './Row';

const Table = ({ mascotas, setMascotaEditar, eliminarMascota }) => {

    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th colSpan={3} >Acciones</th>
                </tr>
            </thead>
            <tbody className='table table-hover'>
                {
                    mascotas.map((mascota) => {
                        return <Row key={mascota.id} mascota={mascota} setMascotaEditar={setMascotaEditar} eliminarMascota={eliminarMascota} />
                    })
                }
            </tbody>
        </table>
    );
}

export default Table;