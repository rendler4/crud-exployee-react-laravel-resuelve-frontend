import {
  IconList, IconLayoutDashboard, 
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Empleados',
  },
  {
    id: uniqueId(),
    title: 'Listado',
    icon: IconList,
    href: '/employees',
  },
];

export default Menuitems;
