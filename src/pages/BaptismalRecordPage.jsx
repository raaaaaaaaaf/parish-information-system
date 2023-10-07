import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useContext, useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import { EditFormContext } from '../context/EditContext';
import _ from 'lodash';
import Swal from 'sweetalert2';
import Loading from '../components/loading/Loading';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Username', alignRight: false },
  { id: 'childName', label: 'Full Name', alignRight: false },
  { id: 'dob', label: 'Date of Birth', alignRight: false },
  { id: 'dobaptized', label: 'Date of Baptized', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'act', label: 'Action', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function BaptismalRecordPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [docsList, setDocsList] = useState([])

  const {setDocId} = useContext(EditFormContext)

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];

        const docsQuery = query(collection(db, "docsData"), where("docType", "==", "Baptismal"))
        const docsSnap = await getDocs(docsQuery)
        docsSnap.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setDocsList(data);
        console.log(data)
      } catch(err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  const sortedDocData = _.sortBy(docsList, (data) => data.timeStamp.seconds).reverse();

  const deleteBaptistmal = async (id) => {
    const docsRef = doc(db, "docsData", id)
    Swal.fire(
      'Deleted!',
      'Information has been deleted.',
      'success'
    )
    await deleteDoc(docsRef);
    navigate('/dashboard/baptismal')
  }

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = docsList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - docsList.length) : 0;

  const filteredUsers = applySortFilter(docsList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Baptismal Record | Birhen Del Carmen Online Parish Information System   </title>
      </Helmet>
    {loading? (
      <Loading/>
    ) : (
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Baptismal Records
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={docsList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {sortedDocData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((docs, index) => {

                    const selectedUser = selected.indexOf(docs.childName) !== -1;

                    return (
                      <TableRow hover key={index} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, docs.childName)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={docs.userName} src={`/assets/images/avatars/avatar_${index + 1}.jpg`} />
                            <Typography variant="subtitle2" noWrap>
                              {docs.userName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{docs.childName}</TableCell>

                        <TableCell align="left">{docs.dob}</TableCell>

                        <TableCell align="left">{docs.dobaptized}</TableCell>

                        <TableCell align="left">₱{docs.price}</TableCell>

                        <TableCell align="left">
                        {docs.isPaid ? (
                          <Label color={'success'}>Paid</Label>
                        ) : (
                          <Label color={'error'}>Unpaid</Label>
                        )}
                          
                        </TableCell>

                        <TableCell align="left">
                          <Link to={`editbaptismal/${docs.id}`} style={{ textDecoration: 'none', color: 'black'}}>
                          <IconButton size="large" color="inherit" onClick={() => setDocId(docs.id)}>
                            <Iconify icon={'material-symbols:edit-outline'} />
                          </IconButton>
                          </Link>

                          <IconButton size="large" color="inherit" onClick={() => deleteBaptistmal(docs.id)}>
                            <Iconify icon={'material-symbols:delete-outline'} />
                          </IconButton>

                          <Link to={`viewbaptismal/${docs.id}`} style={{ textDecoration: 'none', color: 'black'}}>
                          <IconButton size="large" color="inherit">
                            <Iconify icon={'carbon:view'}/>
                          </IconButton>
                          </Link>

                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={docsList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    )}

    </>
  );
}
