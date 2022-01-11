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
        rowGrid={20}
        height={800}
        width={800}
        rows={[
          {
            key:'1:00',
          },
          {
            key:'2:00',
          },
          {
            key:'3:00',
          },
          {
            key:'4:00',
          }
        ]}
        columns={[ 
          {
            key:'monday',
            header: {
              width:'200'
            }
          },
          {
            key:'tuesday',
            header: {
              width:'200'
            }
          },
          {
            key:'wednesday',
            header: {
              width:'200'
            }
          },
          {
            key:'thursday',
            header: {
              width:'200'
            }
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
