import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { plannerApi } from '../API';

const GET_ALL_SLOTS = 'transport_system/planner/getAllPlanner';
const FILL_NEW_SLOT = 'transport_system/planner/fillNewSlot';
const REMOVE_SLOT = 'transport_system/planner/removeSlot';

const getAllSlotsApiCall = async () => {
  try {
    const response = await axios.get(plannerApi);
    return response.data;
  } catch (error) {
    console.error('Error getting all slots:', error);
  }
};

export const getAllSlots = createAsyncThunk(GET_ALL_SLOTS, getAllSlotsApiCall);

export const fillNewSlot = (newSlot) => async (dispatch) => {
  try {
    await axios.post(plannerApi, newSlot);
    dispatch({
      type: FILL_NEW_SLOT,
      payload: newSlot,
    });
  } catch (error) {
    console.error('Error adding new slot:', error);
  }
};

export const removeSlot = (customerId) => async (dispatch) => {
  try {
    await axios.delete(`${plannerApi}/${customerId}`);
    dispatch({
      type: REMOVE_SLOT,
      payload: customerId,
    });
  } catch (error) {
    console.error('Error deleting slot:', error);
  }
};

const plannerReducer = (allSlots = [], action) => {
  switch (action.type) {
    case `${GET_ALL_SLOTS}/fulfilled`:
      return action.payload;
    case FILL_NEW_SLOT:
      return [...allSlots, action.payload];
    case REMOVE_SLOT:
      return allSlots.filter((slot) => slot.customerId !== action.payload);
    default:
      return allSlots;
  }
};

export default plannerReducer;
