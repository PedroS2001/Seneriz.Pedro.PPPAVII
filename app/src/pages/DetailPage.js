import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Loader from '../components/Loader';

const URL = 'http://localhost:3002/';

const DetailPage = () => {

    const { id } = useParams();

    const [mascota, setMascota] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(URL + 'mascotas/?id=' + id)
            .then(data => data.json())
            .then((mascota) => {
                setMascota(mascota[0]);
                console.log(mascota[0])
            })
            .finally(() => setLoading(false))
    }, [id])

    return (
        <>
            {
                loading ? <Loader></Loader> : (

                    <div className='row centrar'>
                        <div className="card w-50">
                            <h4 className="card-header">
                                {mascota.nombre}
                            </h4>
                            <div className="card-body row">
                                <div className='col-6'>
                                    <span className='row'> <b>Tipo:</b> </span>
                                    <span className='row'> <b>Edad:</b> </span>
                                    <span className='row'> <b>Esta Vacunado?:</b> </span>
                                    <span className='row'> <b>Observaciones:</b> </span>
                                </div>
                                <div className='col-6'>
                                    <span className="row card-title"> {mascota.tipo} </span>
                                    <span className="row card-text"> {mascota.edad} </span>
                                    <span className="row card-text"> {mascota.vacunado ? "Si" : "No"}  </span>
                                    <span className="row card-text label"> {mascota.observaciones} </span>
                                </div>

                                <Link to='/'>
                                    <button className="btn btn-primary mt-2">Volver</button>
                                </Link>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                )
            }
        </>

    );
}

export default DetailPage;