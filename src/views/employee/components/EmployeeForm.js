import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { TextField, Button, Grid, Box, Modal } from '@mui/material';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
const EmployeeForm = ({employee=null,fetchEmpleados,open,setOpen,handleClose}) => {

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        razon_social: '',
        cedula: '',
        telefono: '',
        pais: '',
        ciudad: '',
    });

    useEffect(() => {
        if(employee){
            setFormData({
                nombre: employee.nombre,
                apellido: employee.apellido,
                razon_social: employee.razon_social,
                cedula: employee.cedula,
                telefono: employee.telefono,
                pais: employee.pais,
                ciudad: employee.ciudad,
            });
        }else{
            reset();
        }
    }, [employee]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // enviar los datos del formulario a tu backend
        try {
            if(employee){
                await axios.put('http://localhost:9000/api/empleados/'+employee.id, formData);
            }else{
                await axios.post('http://localhost:9000/api/empleados', formData);
            }
            handleClose();
            Swal.fire({
                title: 'Registro salvado con exito',
                icon: 'success',
                showConfirmButton: false,
                timer: 3000,
              })   

            // Actualizar la lista de empleados después de agregar uno nuevo
            fetchEmpleados();
            // Reiniciar el formulario
            reset();
        } catch (error) {    
            console.log(error);
            Swal.fire({
                title: `${error.response.data.message}!`,
                text: error.response.data.errors ? Object.values(error.response.data.errors)[0][0] : '',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000,
              })
              handleClose()            
              setTimeout(()=>setOpen(true),3000)                
        }
    };

    const reset = ()=>{
        setFormData({
            nombre: '',
            apellido: '',
            razon_social: '',
            cedula: '',
            telefono: '',
            pais: '',
            ciudad: '',
        });
    }


    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: 400 }}>
                <h2 id="parent-modal-title">Crear nuevo empleado</h2>               
                    
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Apellido"
                                    name="apellido"
                                    value={formData.apellido}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Razón Social"
                                    name="razon_social"
                                    value={formData.razon_social}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Cédula"
                                    name="cedula"
                                    value={formData.cedula}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Teléfono"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="País"
                                    name="pais"
                                    value={formData.pais}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Ciudad"
                                    name="ciudad"
                                    value={formData.ciudad}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">
                                    Crear
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    
            </Box>
        </Modal>

    );
};

export default EmployeeForm;
