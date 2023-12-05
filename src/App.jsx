import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeDelivery } from './redux/Deliveries/deliveries';
import { fillNewSlot } from './redux/Planner/planner';

import AddDelivery from './components/AddDelivery';
import Deliveries from './components/Deliveries';
import Planner from './components/Planner';
import './App.css';

function App() {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const deliveries = useSelector((state) => state.deliveries);

  const dispatch = useDispatch();

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    dispatch(
      fillNewSlot({
        dropId: e.target.id,
        ...deliveries[draggedIndex],
      }),
    );

    dispatch(removeDelivery(draggedIndex, deliveries[draggedIndex].customerId));
    setDraggedIndex(null);
  };

  return (
    <>
      <AddDelivery />
      <div className="main">
        <Deliveries
          draggedIndex={draggedIndex}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
        />
        <Planner handleDragOver={handleDragOver} handleDrop={handleDrop} />
      </div>
    </>
  );
}

export default App;
