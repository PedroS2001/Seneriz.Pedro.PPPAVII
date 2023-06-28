import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const URL = 'http://localhost:3002/';

const DetailPage = () => {

    const { id } = useParams();

    const [mascota, setMascota] = useState({});

    useEffect(() => {
        fetch(URL + 'mascotas/?id=' + id)
            .then(data => data.json())
            .then((mascota) => {
                setMascota(mascota[0]);
                console.log(mascota[0])
            })
    }, [id])

    return (
        <>
            <div>
                <Link to='/'>VOLVERR</Link>
            </div>
            <div>
                <p> <b> Nombre:</b> {mascota.nombre} </p>
                <p> <b>Edad:</b> {mascota.edad} </p>
                <p> <b>Tipo:</b> {mascota.tipo} </p>
                <p> <b>Esta vacunado ?</b> {mascota.vacunado ? "Si" : "No"} </p>
                <p> <b>Observaciones:</b> {mascota.observaciones} </p>
            </div>
        </>
    );
}

export default DetailPage;