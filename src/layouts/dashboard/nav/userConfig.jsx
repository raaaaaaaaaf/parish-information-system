// component
import Iconify from '../../../components/iconify/Iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const userConfig = [
  {
    title: 'dashboard',
    path: '/client/app',
    icon: <Iconify icon={'carbon:analytics'}/>,
  },
  {
    title: 'Request Baptismal',
    path: '/client/reqbaptismal',
    icon: <Iconify icon={'fluent:document-search-24-filled'}/>,
  },
  {
    title: 'Request Burial',
    path: '/client/reqburial',
    icon: <Iconify icon={'fluent:document-search-24-filled'}/>,
  },
  {
    title: 'Request Marriage Contract',
    path: '/client/reqmarriage',
    icon: <Iconify icon={'fluent:document-search-24-filled'}/>,
  },
  {
    title: 'View Documents',
    path: '/client/viewdocs',
    icon: <Iconify icon={'carbon:document-view'}/>,
  },
];

export default userConfig;
