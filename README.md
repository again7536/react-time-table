# react-time-table

A simple, customizable time table library for React

## Usage

```JSX
import './App.css';
import { Block, TimeTable, useBlock } from './components/block/block';

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
        rowGrid={4}
        rows={[
          {
            key:'1:00',
          },
          {
            key:'2:00',
          },
        ]}
        columns={[ 
          {
            key:'monday',
          },
          {
            key:'tuesday',
          },
        ]}
        blockMap={blockMap}
        usedTime={usedTime}
        onDoubleClickGrid={(row, col) => {
          //random colored blocks
          createBlock(row, col, <Block key={row+' '+col} height={3} style={{backgroundColor:'#'+Math.floor(Math.random()*16777215).toString(16)}}/>)
        }}
        onDropBlock={(row, col, newRow, newCol)=> {
          moveBlock(row, col, newRow, newCol);
        }}
      />
    </div>
  );
}

```


## Future change
todo list
- [ ] error handling in createBlock and moveBlock
- [ ] drop position should be on the top of the block
- [X] allow custom columns
- [ ] move files to src directory