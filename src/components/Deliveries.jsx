/* eslint-disable react/prop-types */
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllDeliveries,
  removeDelivery,
} from '../redux/Deliveries/deliveries';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Deliveries = ({ handleDragStart, handleDragOver }) => {
  const deliveries = useSelector((state) => state.deliveries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDeliveries());
  }, [dispatch]);

  const handleDelete = (index, customerId) => {
    dispatch(removeDelivery(index, customerId));
  };

  return (
    <div className="deliveries__container">
      <h2>List of Deliveries</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tasks table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>ID</b>
              </TableCell>
              <TableCell align="right">
                <b>NAME</b>
              </TableCell>
              <TableCell align="right">
                <b>PICK-UP LOCATION</b>
              </TableCell>
              <TableCell align="right">
                <b>DROP-OFF LOCATION</b>
              </TableCell>
              <TableCell align="right">
                <b>ACTION</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveries.map((task, index) => (
              <TableRow
                key={index}
                id={index}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                className="deliveries__row"
              >
                <TableCell component="th" scope="row">
                  {task.customerId}
                </TableCell>
                <TableCell align="right">{task.customerName}</TableCell>
                <TableCell align="right">{task.pickupLocation}</TableCell>
                <TableCell align="right">{task.dropoffLocation}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(index, task.customerId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Deliveries;
