import React, { useState } from 'react';

import { TimeTableProps } from 'src/types/time-table';

import './time-table.css';

const TimeTable:React.FC<TimeTableProps> = ({
    rowGrid,
    columns,
    rows,
    height,
    width,
    blockMap,
    usedTime,
    onDoubleClick,
    onDropBlock,
    onDragStartBlock
}) => {
    const [origCol, setOrigCol] = useState<number>(0);
    const [origRow, setOrigRow] = useState<number>(0);

    const addBlock = (row:number, col:number) => {
        if(onDoubleClick)
            onDoubleClick(row, col);
    }

    const handleDragStart = (e:React.DragEvent, row:number, col:number) => {
        setOrigRow(row);
        setOrigCol(col);
        if(onDragStartBlock)
            onDragStartBlock(row, col);
    }

    const handleDrop = (e:React.DragEvent, row:number, col:number) => {
        e.preventDefault();
        if(onDropBlock)
            onDropBlock(origRow, origCol, row, col);
    }

    return (
        <table 
            className='time-table-container'
            style={{height:height, width:width}}
        >   
            <thead>
                <tr>
                    <th className='time-table-col-header'></th>
                    {columns.map((val) => {
                        return (
                            <th 
                                {...val.header}
                                key={val.key}
                                className={val.header?.className? val.header.className+' time-table-col-header':'time-table-col-header'}
                            >
                                {val.key}
                            </th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {rows.map((rowVal, rowIdx, arr) => 
                <React.Fragment key={rowIdx}>
                {
                    [...Array(rowGrid)].map((gridVal, gridIdx)=> {
                        const row = rowIdx * rowGrid + gridIdx;
                        const header = gridIdx === 0;
                        const lined = gridIdx === rowGrid -1;
                        return (
                            <tr 
                                key={`${row}-row`} 
                                className={lined?'time-table-row':'time-table-grid'}
                            >
                                {
                                    header?
                                    <td // first column
                                        {...rowVal.header}
                                        className={'time-table-row-header'}
                                        rowSpan={rowGrid}
                                    >
                                        {rowVal.key}
                                    </td>
                                    :undefined
                                }
    
                                {/* draw other columns */}
                                {columns.map((val, col) => {
                                    return (
                                        blockMap[row] && blockMap[row][col]?
                                            React.cloneElement(blockMap[row][col], {
                                                onDragStart: (e:React.DragEvent<HTMLTableCellElement>)=>handleDragStart(e, row, col),
                                            })
                                            :
                                            usedTime[col] === undefined || usedTime[col][row] === undefined || usedTime[col][row] === 0?
                                            <td 
                                                {...val.cell}
                                                {...rowVal.grid}
                                                className={'time-table-cell'}
                                                onDragOver={(e)=>{
                                                    e.preventDefault();
                                                }}
                                                onDrop={(e)=>handleDrop(e, row, col)}
                                                onDoubleClick={()=>addBlock(row, col)}
                                                key={`${row}-${col}-cell`} 
                                            />
                                            :undefined
                                    )
                                })}
                            </tr>
                        )
                    })
                }
                </React.Fragment>
                )}
            </tbody>
        </table>
    )
}

export {TimeTable};