/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSlots, removeSlot } from '../redux/Planner/planner';
import { addNewDelivery } from '../redux/Deliveries/deliveries';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import Stack from '@mui/material/Stack';

const Planner = ({ handleDragOver, handleDrop }) => {
  const slots = useSelector((state) => state.slots);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSlots());
  }, [dispatch]);

  const getNext7Days = () => {
    const currentDate = new Date();
    const next7Days = [];

    for (let i = 0; i <= 7; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      next7Days.push(nextDate.toDateString());
    }

    return next7Days;
  };

  const next7Days = getNext7Days();

  const handleUndo = (e) => {
    dispatch(removeSlot(e.customerId));
    const {
      ['_id']: removedKey1,
      ['dropId']: removedKey2,
      ['createdAt']: removedKey3,
      ['updatedAt']: removedKey4,
      ['__v']: removedKey5,
      ...newObject
    } = e;
    dispatch(addNewDelivery(newObject));
  };

  const handleDelete = (e) => {
    dispatch(removeSlot(e.customerId));
  };

  return (
    <div className="planner__container">
      <h2>Planner</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>DATE</b>
              </TableCell>
              <TableCell>
                <b>SLOT 1</b>
              </TableCell>
              <TableCell>
                <b>SLOT 2</b>
              </TableCell>
              <TableCell>
                <b>SLOT 3</b>
              </TableCell>
              <TableCell>
                <b>SLOT 4</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {next7Days.map((date, dateIndex) => (
              <TableRow key={date} className="planner__row">
                <TableCell>{date}</TableCell>
                {[1, 2, 3, 4].map((slot, index) => {
                  const cellId = `${dateIndex}${index}`;
                  const cellData = slots.find((item) => item.dropId === cellId);
                  return (
                    <TableCell
                      key={`${dateIndex}-${index}`}
                      id={cellId}
                      className="planner__cell"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e)}
                    >
                      {cellData && (
                        <>
                          <span>
                            <b>Name: </b>
                            {cellData.customerName}
                          </span>
                          <br />
                          <span>
                            <b>Pickup Location: </b>
                            {cellData.pickupLocation}
                          </span>
                          <br />
                          <span>
                            <b>Dropoff Location: </b>
                            {cellData.dropoffLocation}
                          </span>
                          <Stack direction="row" spacing={2}>
                            <Button
                              variant="outlined"
                              color="secondary"
                              startIcon={<UndoIcon />}
                              onClick={() => handleUndo(cellData)}
                            >
                              Undo
                            </Button>

                            <Button
                              variant="outlined"
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={() => handleDelete(cellData)}
                            >
                              Delete
                            </Button>
                          </Stack>
                        </>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Planner;
