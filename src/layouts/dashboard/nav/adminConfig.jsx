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
    title: 'Baptismal Records',
    path: '/dashboard/baptismal',
    icon: <Iconify icon={'line-md:document-remove-twotone'}/>
  },
  {
    title: 'Marriage Contract',
    path: '/dashboard/marriage',
    icon: <Iconify icon={'fluent:document-heart-24-filled'}/>
  },
  {
    title: 'Burial Records',
    path: '/dashboard/burial',
    icon: <Iconify icon={'line-md:document-report-twotone'}/>
  },

];

export default adminConfig;
