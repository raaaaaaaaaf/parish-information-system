// component
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const adminConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <Iconify icon={'carbon:analytics'}/>,
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: <Iconify icon={'mdi:users'}/>,
  },
  {
    title: 'Certificate Records',
    path: '/dashboard/certificate',
    icon: <Iconify icon={'line-md:document-remove-twotone'}/>
  },
  {
    title: 'Monthly Report',
    path: '/dashboard/report',
    icon: <Iconify icon={'mdi:users'}/>,
  },

];

export default adminConfig;
