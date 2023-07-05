import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Loader from '../components/Loader';

const URL = 'http://localhost:3001/api/';

const DetailPage = () => {

    const { id } = useParams();

    const [mascota, setMascota] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("token");
        setLoading(true);
        fetch(URL + 'mascota/' + id, {
            headers: {
                authorization: "bearer " + token
            }
        })
            .then(data => data.json())
            .then((mascota) => {
                setMascota(mascota);
                console.log(mascota)
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

                                <Link to='/home'>
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