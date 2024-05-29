import React from 'react';
import { Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import EmployeesTable from './components/EmployeesTable';

const ListEmployee = () => {




  return (
    <PageContainer title="Empleados" description="this is Sample page">
      <Grid container spacing={3}>
          <Grid item xs={12} lg={14}>
            <EmployeesTable />
          </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ListEmployee;
