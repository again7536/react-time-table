import './App.css';
import { Block} from './components/block/block';
import {TimeTable} from './components/time-table/time-table'
import { useBlock } from './hooks/useBlock';

function App() {
  const {
    blockMap,
    usedTime,
    createBlock,
    moveBlock,
    removeBlock
  } = useBlock({});

  return (
    <div>
      <TimeTable
        timeSlice={60}
        height={800}
        width={800}
        columns={[ 
          {
            key:'monday',
          },
          {
            key:'tuesday',
          },
          {
            key:'wednesday',
          },
          {
            key:'thursday',
          },
        ]}
        blockMap={blockMap}
        usedTime={usedTime}
        onDoubleClick={(row, col) => {
          createBlock(row, col, <Block key={row+' '+col} height={24} style={{backgroundColor:'#'+Math.floor(Math.random()*16777215).toString(16)}}/>)
        }}
        onDropBlock={(row, col, newRow, newCol)=> {
          moveBlock(row, col, newRow, newCol);
        }}
      />
    </div>
  );
}

export default App;
