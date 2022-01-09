import React, { useState, useMemo, useRef } from 'react';

import { TableBlockMap, TimeTableProps } from 'src/types/time-table';

import './time-table.css';

const TimeTable:React.FC<TimeTableProps> = ({
    timeSlice,
    columns,
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

    const timeGrid = useMemo<number[]>(() => {
        const gridCount = 24 * 60 / 5;
        let ret = [];
        for(let i=0;i<gridCount;i++)
            ret.push(5 * i);

        return ret;
    }, []);

    const addBlock = (row:number, col:number) => {
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
        onDropBlock(origRow, origCol, row, col);
    }

    return (
        <table 
            className='time-table-container'
            style={{height:height, width:width}}
        >   
            <thead style={{height:'30px'}}>
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
                {timeGrid.map((val, row, arr) => {
                    const lined = row % (timeSlice / 5) === 0;
                    return (
                        <tr key={`${row}-row`} className={lined?'time-table-row':'time-table-grid'}>
                            {
                                lined?
                                <td // first column
                                    className={'time-table-row-header'}
                                    rowSpan={timeSlice / 5}
                                >
                                    {`${val/60}:0${val%60}`}
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
                                            className={'time-table-cell'}
                                            onDragOver={(e)=>{
                                                e.preventDefault();
                                                //e.stopPropagation();
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
                })}
            </tbody>
        </table>
    )
}

export {TimeTable};