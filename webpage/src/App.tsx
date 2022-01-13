import './App.css';
import { useBlock, TimeTable, Block} from './dist2/index';

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
            key: '1:00',
          },
          {
            key: '2:00',
          },
          {
            key: '3:00',
          },
          {
            key: '4:00',
          }
        ]}
        columns={[
          {
            key: 'monday',
            header: {
              width: '200',
            }
          },
          {
            key: 'tuesday',
            header: {
              width: '200'
            }
          },
          {
            key: 'wednesday',
            header: {
              width: '200'
            }
          },
          {
            key: 'thursday',
            header: {
              width: '200'
            }
          },
          {
            key: 'friday',
            header: {
              width: '200'
            }
          },
        ]}
        blockMap={blockMap}
        usedTime={usedTime}
        onDoubleClickGrid={(row, col) => {
          createBlock(row, col, <Block key={row + ' ' + col} height={3} style={{ backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16) }} />);
        } }
        onDropBlock={(row, col, newRow, newCol) => {
          moveBlock(row, col, newRow, newCol);
        } }
        style={{ height: 800 }} 
        onDragStartBlock={undefined}      
        />
    </div>
  );
}

export default App;
