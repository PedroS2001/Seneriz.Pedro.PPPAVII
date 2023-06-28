import React from 'react';
import Table from '../components/Table';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../components/Loader';
import Form from '../components/Form';

const URL = 'http://localhost:3002/';

const HomePage = () => {

    const [mascotas, setMascotas] = useState([])
    const [mascotaU, setMascotaU] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        cargarMascotas();
    }, [])

    const cargarMascotas = () => {
        setLoading(true);
        fetch(URL + 'mascotas')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setMascotas(data);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }


    const agregarMascota = (mascota) => {
        console.log(mascota)
        let arrayOrdenado = mascotas.sort((a, b) => a.id - b.id);
        let proximoId = arrayOrdenado[arrayOrdenado.length - 1].id + 1;
        
        mascota.id = proximoId;
        fetch(URL + 'mascotas/', {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
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
        console.log("modificando");

        fetch(URL + 'mascotas/' + mascotaEditada.id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
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
        console.log("eliminado" + id);

        fetch(URL + 'mascotas/' + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "Application/json",
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
            <section>
                <Form
                    mascotaU={mascotaU}
                    agregarMascota={agregarMascota}
                    modificarMascota={modificarMascota}
                >
                </Form>
            </section>
            <section>
                {
                    loading ? (
                        <Loader></Loader>
                    ) : (
                        <Table mascotas={mascotas} setMascotaEditar={setMascotaEditar} eliminarMascota={eliminarMascota}  ></Table>
                    )
                }
            </section>
        </>
    );
}

export default HomePage;