import React from 'react';
import Table from '../components/Table';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../components/Loader';
import Form from '../components/Form';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const URL = 'http://localhost:3001/api/';

const HomePage = () => {

    const [mascotas, setMascotas] = useState([])
    const [mascotaU, setMascotaU] = useState(null);

    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    let history = useHistory();

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        console.log('token', token)

        setLoading(true);
        fetch(URL + 'mascota', {
            headers: {
                "authorization": "bearer " + token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data)
                    setMascotas(data);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))

    }, [token])

    const cargarMascotas = () => {
        setLoading(true);
        fetch(URL + 'mascota', {
            headers: {
                "authorization": "bearer " + token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data)
                    setMascotas(data);
            })
            .catch(err => console.log("eee", err))
            .finally(() => setLoading(false))
    }


    const agregarMascota = (mascota) => {
        setLoading(true);
        let arrayOrdenado = mascotas.sort((a, b) => a.id - b.id);
        let proximoId = arrayOrdenado[arrayOrdenado.length - 1].id + 1;

        mascota.id = proximoId;
        fetch(URL + 'mascota', {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                "authorization": "bearer " + token
            },
            body: JSON.stringify(mascota)
        })
            .then(res => res.json())
            .then((data) => {
                setMascotas((mascotas) => [...mascotas, data])
                alert("Alta exitosa")
            })
            .catch(err => console.log(err))
            .finally(() => {
                cargarMascotas();
            })

        setMascotas((mascotas) => [...mascotas, mascota]);
    }


    const modificarMascota = (mascotaEditada) => {
        setLoading(true);
        fetch(URL + 'mascota/' + mascotaEditada.id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                "authorization": "bearer " + token
            },
            body: JSON.stringify(mascotaEditada)
        })
            .then(res => res.json())
            .then((data) => {
                setMascotas((mascotas) => {
                    return mascotas.map(mascota => {
                        return mascota.id === data.id ? data : mascota
                    })
                })
                alert("Modificacion exitosa")
            })
            .catch(err => console.log(err))
            .finally(() => {
                cargarMascotas();
            })
    }


    const eliminarMascota = (id) => {
        setLoading(true);
        fetch(URL + 'mascota/' + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "Application/json",
                "authorization": "bearer " + token
            }
        })
            .then(res => res.json())
            .then((data) => {
                setMascotas((mascotas) => {
                    return mascotas.filter(mascota => mascota.id !== id)
                })
                alert("Se elimino la mascota", data);
            })
            .catch(err => console.log(err))
            .finally(() => {
                cargarMascotas();
            })
    }


    const setMascotaEditar = (mascotaa) => {
        setMascotaU(mascotaa)
    }


    return (
        <>
            <section className='row centrar'>
                <div className='col-6'>
                    <Form
                        mascotaU={mascotaU}
                        agregarMascota={agregarMascota}
                        modificarMascota={modificarMascota}
                    >
                    </Form>
                </div>
            </section>
            <section className='row centrar'>
                {
                    loading ? (
                        <Loader></Loader>
                    ) : (
                        <Table mascotas={mascotas} setMascotaEditar={setMascotaEditar} eliminarMascota={eliminarMascota}   ></Table>
                    )
                }
            </section>
        </>
    );
}

export default HomePage;