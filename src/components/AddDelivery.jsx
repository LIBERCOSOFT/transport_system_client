import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewDelivery } from '../redux/Deliveries/deliveries';
import generateID from '../utils/genarateID';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  color: '#000',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddDelivery = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    pickupLocation: '',
    dropoffLocation: '',
  });

  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    if (
      formData.name !== '' ||
      formData.pickupLocation !== '' ||
      formData.dropoffLocation !== ''
    ) {
      dispatch(
        addNewDelivery({
          customerId: generateID(3),
          ...formData,
        }),
      );
    }
    setFormData({ customerName: '', pickupLocation: '', dropoffLocation: '' });
    handleClose();
  };

  return (
    <div className="add__delivery__container">
      <Button variant="contained" onClick={handleOpen}>
        <b>Add Delivery</b>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Fill the Form to Add Delivery
          </Typography>
          <Stack spacing={2} direction="column">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="Pick-up Location"
              variant="outlined"
              value={formData.pickupLocation}
              onChange={(e) =>
                setFormData({ ...formData, pickupLocation: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="Drop-off Location"
              variant="outlined"
              value={formData.dropoffLocation}
              onChange={(e) =>
                setFormData({ ...formData, dropoffLocation: e.target.value })
              }
            />
            <Button variant="contained" onClick={handleSubmit}>
              <b>Submit</b>
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default AddDelivery;
