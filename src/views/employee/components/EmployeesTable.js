import React, { useState, useEffect }  from 'react';
import { formatDate } from '../../../helpers/';
import axios from 'axios';
import Swal from 'sweetalert2'
import {
    Typography, 
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    ButtonGroup,
    Button,
    Fab,
    Pagination, 
    Stack
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import { IconEdit, IconX, IconPlus } from '@tabler/icons';
import EmployeeForm from './EmployeeForm';

const EmployeesTable = () => {
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchEmpleados();
    }, [currentPage]);

    const fetchEmpleados = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/empleados?page=${currentPage}`);
            setEmployees(response.data.data);
            setTotalPages(response.data.last_page);
        } catch (error) {
            console.error('Error fetching empleados:', error);
        }
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
      setEmployee(null);      
    };
    const handleClose = () => {
      setOpen(false);
    };
    const editEmployee = (dataEdit=null)=>{
        setOpen(true);
        setEmployee(dataEdit);
    }

    const deleteEmployee = async (id) => {
        console.log(id)
        // enviar los datos del formulario a tu backend
        try {           
            await axios.delete('http://localhost:9000/api/empleados/'+id);                    
            // Actualizar la lista de empleados después de agregar uno nuevo
            Swal.fire({
                title: 'Registro eliminado con exito',
                icon: 'success',
                showConfirmButton: false,
                timer: 3000,
              })  
            fetchEmpleados();
        } catch (error) {     
            console.log(error);
            Swal.fire({
                title: `${error.response.data.message}!`,
                text: error.response.data.errors ? Object.values(error.response.data.errors)[0][0] : '',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000,
              })             
        }
    };

    return (

        <DashboardCard title="Lista de empleados"
        action={
            <Fab onClick={handleOpen} color="secondary" size="medium" sx={{color: '#ffffff'}}>
              <IconPlus width={24} />
            </Fab>
            }
        >
            <EmployeeForm
            employee={employee}
            fetchEmpleados={fetchEmpleados}
            open={open}      
            setOpen={setOpen}
            handleClose={handleClose}
            />
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Id
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Nombre
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Apellido
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Razón Social
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Cédula
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Teléfono
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    País
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Ciudad
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Acciones
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {employee.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {employee.nombre}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {formatDate(employee.created_at)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {employee.apellido}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: 'primary.main',
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={employee.razon_social}
                                    ></Chip>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">{employee.cedula}</Typography>
                                </TableCell>

                                <TableCell align="right">
                                    <Typography variant="h6">{employee.telefono}</Typography>
                                </TableCell>

                                <TableCell align="right">
                                    <Typography variant="h6">{employee.pais}</Typography>
                                </TableCell>

                                <TableCell align="right">
                                    <Typography variant="h6">{employee.ciudad}</Typography>
                                </TableCell>
                                
                                <TableCell align="right">
                                    <ButtonGroup
                                    disableElevation
                                    variant="contained"
                                    aria-label="Disabled button group"
                                    >
                                        <Button onClick={()=>editEmployee(employee)} variant="contained" color="secondary"><IconEdit/></Button>
                                        <Button onClick={()=>deleteEmployee(employee.id)} variant="contained" color="error"><IconX/></Button>
                                        
                                    </ButtonGroup>
                                </TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
                </Stack>
            </Box>





        </DashboardCard>
    );
};

export default EmployeesTable;
