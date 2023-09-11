// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const userConfig = [
  {
    title: 'dashboard',
    path: '/client/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Request Baptismal',
    path: '/client/reqbaptismal',
    icon: icon('ic_user'),
  },
  {
    title: 'Request Burial',
    path: '/client/reqburial',
    icon: icon('ic_user'),
  },
  {
    title: 'Request Marriage Contract',
    path: '/client/reqmarriage',
    icon: icon('ic_user'),
  },
  {
    title: 'View Documents',
    path: '/client/viewdocs',
    icon: icon('ic_user'),
  },
];

export default userConfig;
