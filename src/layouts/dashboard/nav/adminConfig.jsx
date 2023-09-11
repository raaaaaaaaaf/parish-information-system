// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const adminConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Baptismal Records',
    path: '/dashboard/baptismal',
    icon: icon('ic_cart'),
  },
  {
    title: 'Marriage Contract',
    path: '/dashboard/marriage',
    icon: icon('ic_blog'),
  },
  {
    title: 'Burial Records',
    path: '/dashboard/burial',
    icon: icon('ic_lock'),
  },
  {
    title: 'Requested Documents',
    path: '/dashboard/requested',
    icon: icon('ic_disabled'),
  },
];

export default adminConfig;
