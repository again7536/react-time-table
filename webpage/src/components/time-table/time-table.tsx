import React, { useState, useMemo, useRef } from 'react';

import { TableBlockMap, TimeTableProps } from 'src/types/time-table';

import { Block } from '../block/block';

import './time-table.css';

const TimeTable:React.FC<TimeTableProps> = ({
    timeSlice,
    columns,
    height,
    width,
    blockMap,
    onDoubleClick,
    onDropBlock,
    onDragStartBlock
}) => {
    const [dragCol, setDragCol] = useState<number>(0);
    const [dragRow, setDragRow] = useState<number>(0);
    const [usedTime, setUsedTime] = useState<number[][]>(()=> {
        const gridCount = 24 * 60 / 5;
        let ret = [];
        for(let i=0;i<columns.length;i++) {
            let subarr = [];
            for(let j=0;j<gridCount;j++) {
                subarr.push(1);
            }
            ret.push(subarr);
        }
        return ret;
    }) //number[col][row]

    const timeGrid = useMemo<number[]>(() => {
        const gridCount = 24 * 60 / 5;
        let ret = [];
        for(let i=0;i<gridCount;i++)
            ret.push(5 * i);

        return ret;
    }, []);

    const addBlock = (row:number, col:number) => {
        onDoubleClick(row, col);

        setUsedTime(state=> {
            const ret = [...state];
            for(let i=1;i<24;i++)
                ret[col][row+i] = 0;
            return ret;
        });
    }

    const handleDragStart = (e:React.DragEvent, row:number, col:number) => {
        setDragRow(row);
        setDragCol(col);
        if(onDragStartBlock)
            onDragStartBlock(row, col);
    }

    const handleDrop = (e:React.DragEvent, row:number, col:number) => {
        e.preventDefault();

        onDropBlock(dragRow, dragCol, row, col);

        setUsedTime(state=> {
            const ret = [...state];
            for(let i=1;i<24;i++) {
                ret[dragCol][dragRow+i] = 1;
                ret[col][row+i] = 0;
            }
            return ret;
        });
    }

    return (
        <table 
            className='time-table-container'
            style={{height:height, width:width}}
        >   
            <thead style={{height:'30px'}}>
                <tr >
                    <th className='time-table-col-header'></th>
                    {columns.map((val) => {
                        return (
                            <th key={val.key} className='time-table-col-header'>{val.key}</th>
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
                            {columns.map((val, col) => (
                                blockMap[row] && blockMap[row][col]?
                                    React.cloneElement(blockMap[row][col], {
                                        onDragStart: (e:React.DragEvent<HTMLTableCellElement>)=>handleDragStart(e, row, col)
                                    })
                                    :
                                    usedTime[col][row]===1?
                                    <td 
                                        key={`${row}-${col}-cell`} 
                                        className='time-table-cell'
                                        onDragOver={(e)=>{
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        onDrop={(e)=>handleDrop(e, row, col)}
                                        onDoubleClick={()=>addBlock(row, col)}
                                    />
                                    :undefined
                            ))}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export {TimeTable};