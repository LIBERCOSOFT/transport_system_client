import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import plannerReducer from './Planner/planner';
import deliveriesReducer from './Deliveries/deliveries';

const rootReducer = combineReducers({
  slots: plannerReducer,
  deliveries: deliveriesReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
