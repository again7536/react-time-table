import React, { useState } from 'react';

import { TimeTableProps } from 'src/types/index';

import style from './time-table.module.css';

const TimeTable:React.FC<TimeTableProps> = ({
    rowGrid,
    columns,
    rows,
    blockMap,
    usedTime,
    onDoubleClickGrid,
    onDropBlock,
    onDragStartBlock,
    ...props
}) => {
    const [origCol, setOrigCol] = useState<number>(0);
    const [origRow, setOrigRow] = useState<number>(0);

    const addBlock = (row:number, col:number) => {
        if(onDoubleClickGrid)
            onDoubleClickGrid(row, col);
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
            className={style.timeTableContainer}
            {...props}
        >   
            <thead>
                <tr>
                    <th className='time-table-col-header'></th>
                    {columns.map((val) => {
                        return (
                            <th 
                                {...val.header}
                                key={val.key}
                                className={style.timeTableColHeader}
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
                                className={lined?style.timeTableRow:style.timeTableGrid}
                            >
                                {
                                    header?
                                    <td // first column
                                        {...rowVal.header}
                                        rowSpan={rowGrid}
                                    >
                                        {rowVal.key}
                                    </td>
                                    :undefined
                                }
    
                                {/* draw other columns */}
                                {columns.map((colVal, col) => {
                                    return (
                                        blockMap[row] && blockMap[row][col]?
                                            React.cloneElement(blockMap[row][col], {
                                                onDragStart: (e:React.DragEvent<HTMLTableCellElement>)=>handleDragStart(e, row, col),
                                            })
                                            :
                                            usedTime[col] === undefined || usedTime[col][row] === undefined || usedTime[col][row] === 0?
                                            <td 
                                                {...colVal.cell}
                                                {...rowVal.grid}
                                                className={style.timeTableCell}
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
                                
                                {/* dummy for maintaining same height */}
                                <td style={{width:0}}/>
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