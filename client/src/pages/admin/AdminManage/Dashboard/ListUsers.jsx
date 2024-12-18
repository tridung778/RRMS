import { useState, useEffect  } from 'react'
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TableContainer,
  TablePagination,
  FormControl,  
  InputLabel,  
  Select,  
  MenuItem,  
  Grid,  
  Typography,
  Button,
  TextField,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditNoteIcon from '@mui/icons-material/EditNote';
import InputAdornment from '@mui/material/InputAdornment';  
import { format } from 'date-fns'; 
import axios from 'axios';
import { env } from '~/configs/environment';

const ListUsers = () => {  
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [role, setRole] = useState('');  
  const [plan, setPlan] = useState('');  
  const [status, setStatus] = useState('');  
  const [accounts, setAccounts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const roles = ['Admin', 'Host', 'Employee', 'Customer', 'Broker'];  
  const plans = ['Basic', 'Premium', 'Enterprise'];  
  const statuses = ['Active', 'Inactive', 'Pending']; 
  const [search, setSearch] = useState('');  
  const [noResults, setNoResults] = useState(false);  
  const navigate = useNavigate();
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null

  const fetchAccounts = async (query) => {  
    setLoading(true);  
    setNoResults(false);  
    try {  
      let url;
      if (query) {
        const params = new URLSearchParams();
        params.append("search", query);
        url = `${env.API_URL}/api-accounts/search?${params.toString()}`;
      } else {
        url = `${env.API_URL}/api-accounts/get-all-account`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data && response.data.status) {  
        setAccounts(response.data.data);  
      } else {  
        setNoResults(true);  
      }  
    } catch (error) {  
      console.error('Error fetching accounts', error);  
      setNoResults(true);  
    } finally {  
      setLoading(false);  
    }  
  };  
  
  useEffect(() => {  
    fetchAccounts(search);  
  }, [search]);

  const handleEdit = (accountId) => {  
  navigate('/adminManage/manage-users/add', { state: { accountId } });  
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0) 
  }

  return (
    <Box sx={{backgroundColor: '#fff', borderRadius: '5px',marginTop:'17px'}}>
      <Grid container spacing={2} sx={{paddingLeft:'30px',paddingTop:'15px', marginBottom:'15px' }}> 
        <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{marginBottom:'10px'}}> 
          <Typography variant="h5" sx={{marginTop:'15px', marginLeft:'15px'}}>  
                Bộ lọc  
            </Typography>
          <Grid container spacing={1} sx={{marginTop:'10px', marginLeft:'10px'}}>  
            
            <Grid item xs={12} sm={2}>  
              <FormControl fullWidth variant="outlined">  
                <InputLabel id="role-select-label">Select Role</InputLabel>  
                <Select  
                  labelId="role-select-label"  
                  value={role}  
                  onChange={(e) => setRole(e.target.value)}  
                  label="Select Role"  
                >  
                  {roles.map((r) => (  
                    <MenuItem key={r} value={r}>  
                      {r}  
                    </MenuItem>  
                  ))}  
                </Select>  
              </FormControl>  
            </Grid>  

            {/* Dropdown cho "Select Plan" */}  
            <Grid item xs={12} sm={2}>  
              <FormControl fullWidth variant="outlined">  
                <InputLabel id="plan-select-label">Select Plan</InputLabel>  
                <Select  
                  labelId="plan-select-label"  
                  value={plan}  
                  onChange={(e) => setPlan(e.target.value)}  
                  label="Select Plan"  
                >  
                  {plans.map((p) => (  
                    <MenuItem key={p} value={p}>  
                      {p}  
                    </MenuItem>  
                  ))}  
                </Select>  
              </FormControl>  
            </Grid>  

            {/* Dropdown cho "Select Status" */}  
            <Grid item xs={12} sm={2}>  
              <FormControl fullWidth variant="outlined">  
                <InputLabel id="status-select-label">Select Status</InputLabel>  
                <Select  
                  labelId="status-select-label"  
                  value={status}  
                  onChange={(e) => setStatus(e.target.value)}  
                  label="Select Status"  
                >  
                  {statuses.map((s) => (  
                    <MenuItem key={s} value={s}>  
                      {s}  
                    </MenuItem>  
                  ))}  
                </Select>  
              </FormControl>  
            </Grid> 
              
            <Grid item xs={12} sm={3}>  
              <TextField  
                  variant="outlined"  
                  placeholder="Tìm kiếm người dùng"  
                  value={search}  
                  onChange={(e) => setSearch(e.target.value)}  
                  onKeyDown={(e) => {  
                      if (e.key === 'Enter') {  
                          fetchAccounts();  
                      }  
                  }}  
                  InputProps={{  
                      startAdornment: (  
                          <InputAdornment position="start">  
                              <i className="bi bi-search"></i>  
                          </InputAdornment>  
                      ),  
                  }}  
                  sx={{width: '100%'}}

              />
            </Grid>    
            <Grid item xs={12} sm={1}>  
              <Button  
                variant="outlined"  
                color="primary"  
                sx={{   
                  height:'100%',
                  '&:hover': {  
                    backgroundColor: '#1976d2',
                  },  
                }} 
                startIcon={<i className="bi bi-arrow-up-short" />}
              >  
                Export  
              </Button>  
            </Grid>   
            <Grid item xs={12} sm={2}>  
              <Button  
                variant="contained"  
                color="primary"  
                sx={{   
                  height:'100%',
                  '&:hover': {  
                    backgroundColor: '#1976d2',
                  },  
                }} 
                startIcon={<i className="bi bi-plus-lg"></i>}
              >  
                Thêm tài khoản mới  
              </Button>  
            </Grid>    
            
          </Grid>  
        </Grid>
       

        <TableContainer component={Paper} sx={{ width: '100%' }}>
          <Table>  
            <TableHead>  
              <TableRow>  
                <TableCell>Tên đăng nhập</TableCell>  
                <TableCell>Họ tên</TableCell>  
                <TableCell>Số điện thoại</TableCell>  
                <TableCell>Email</TableCell>  
                <TableCell>Số CCCD</TableCell>  
                <TableCell>Giới tính</TableCell>  
                <TableCell>Ngày sinh</TableCell>  
                <TableCell>Ảnh</TableCell>  
                <TableCell>Vai trò</TableCell> 
                <TableCell>Thao tác</TableCell>  
              </TableRow>  
            </TableHead>  
            <TableBody>  
              {loading ? (  
                <TableRow>  
                  <TableCell colSpan={9} align="center">Loading...</TableCell>  
                </TableRow>  
              ) : noResults ? (  
                <TableRow>  
                  <TableCell colSpan={9} align="center">  
                    <Typography color="error">Không có kết quả tìm kiếm nào.</Typography>  
                  </TableCell>  
                </TableRow>  
              ) : (  
                accounts  
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)  
                  .map((account,index) => (  
                    <TableRow key={account.id || index}> 
                      <TableCell>{account.username}</TableCell>  
                      <TableCell>{account.fullname}</TableCell>  
                      <TableCell>{account.phone}</TableCell>  
                      <TableCell>{account.email}</TableCell>  
                      <TableCell>{account.cccd}</TableCell>  
                      <TableCell>{account.gender}</TableCell>  
                      <TableCell>  
                        {account.birthday ? format(new Date(account.birthday), 'dd/MM/yyyy') : ''}  
                      </TableCell>  
                      <TableCell>  
                        <img  
                          src={account.avatar}  
                          alt="Image"  
                          style={{ width: '50px', height: '50px', borderRadius: '2px' }}  
                        />  
                      </TableCell> 
                      <TableCell>{account.role}</TableCell> 
                      <TableCell>  
                        <IconButton color="primary" size="small" onClick={() => handleEdit(account.username)}>  
                          <EditNoteIcon />  
                        </IconButton>  
                        <IconButton color="error" size="small">  
                          <DeleteIcon />  
                        </IconButton>  
                      </TableCell>  
                    </TableRow>  
                  ))  
              )}  
            </TableBody>
          </Table> 
          <TablePagination
            sx={{
              marginTop: '10px',
            }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={accounts.length} 
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Grid>
    </Box>
  )
}
  export default ListUsers;  