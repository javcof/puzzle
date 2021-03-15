import { useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { produce } from 'immer';
import './App.css';
import DragBox from './DragBox';

const puzzle = [
  {
    key: 'A',
    color: 'red',
  },
  {
    key: 'B',
    color: 'green',
  },
  {
    key: 'C',
    color: 'blue',
  },
];

function App() {
  const [items, setItems] = useState(puzzle);
  const handelRowDrop = (dragIndex, hoverIndex) => {
    setItems(
      produce(items, (draftState) => {
        const elements = draftState.splice(dragIndex, 1);
        draftState.splice(hoverIndex, 0, elements[0]);
      })
    );
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        {items.map((item, index) => {
          return (
            <DragBox
              key={item.key}
              color={item.color}
              index={index}
              onRowDrop={handelRowDrop}
            />
          );
        })}
      </div>
    </DndProvider>
  );
}

export default App;
