import {useState} from 'react';
import './App.css';
import { Block} from './components/block/block';
import {TimeTable} from './components/time-table/time-table'
import { TableBlockMap } from './types/time-table';

function App() {
  const [blockMap, setBlockMap] = useState<TableBlockMap>({});
  return (
    <div>
      <TimeTable
        timeSlice={120}
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
        onCreateBlock={(row, col) => {
          setBlockMap(state=> {
            const bmap = {...state};
            bmap[row]={...bmap[row]}
            bmap[row][col] = <Block height={24} style={{backgroundColor:'#'+Math.floor(Math.random()*16777215).toString(16)}}/>;

            return bmap;
          })
        }}
        onChangeBlock={(row, col, newRow, newCol)=> {
          setBlockMap(state=> {
            const bmap = {...state};
            bmap[newRow]={...bmap[newRow]}
            bmap[newRow][newCol] = {...bmap[row][col]};
            delete bmap[row][col];

            return bmap;
          })
        }}
      />
    </div>
  );
}

export default App;
