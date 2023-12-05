import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deliveryApi } from '../API';

const GET_ALL_DELIVERIES = 'transport_system/deliveries/getAllDeliveries';
const REMOVE_DELIVERY = 'transport_system/deliveries/removeDelivery';
const ADD_NEW_DELIVERY = 'transport_system/deliveries/addNewDelivery';

const getAllDeliveriesApiCall = async () => {
  try {
    const response = await axios.get(deliveryApi);
    return response.data;
  } catch (error) {
    console.error('Error getting all deliveries:', error);
  }
};

export const getAllDeliveries = createAsyncThunk(
  GET_ALL_DELIVERIES,
  getAllDeliveriesApiCall,
);

export const addNewDelivery = (newDelivery) => async (dispatch) => {
  try {
    await axios.post(deliveryApi, newDelivery);
    dispatch({
      type: ADD_NEW_DELIVERY,
      payload: newDelivery,
    });
  } catch (error) {
    console.error('Error adding new delivery:', error);
  }
};

export const removeDelivery = (index, customerId) => async (dispatch) => {
  try {
    await axios.delete(`${deliveryApi}/${customerId}`);
    dispatch({
      type: REMOVE_DELIVERY,
      payload: index,
    });
  } catch (error) {
    console.error('Error deleting delivery:', error);
  }
};

const deliveriesReducer = (allDeliveries = [], action) => {
  switch (action.type) {
    case `${GET_ALL_DELIVERIES}/fulfilled`:
      return action.payload;
    case ADD_NEW_DELIVERY:
      return [...allDeliveries, action.payload];
    case REMOVE_DELIVERY:
      return [
        ...allDeliveries.slice(0, action.payload),
        ...allDeliveries.slice(action.payload + 1),
      ];
    default:
      return allDeliveries;
  }
};

export default deliveriesReducer;
