import React, { useMemo } from 'react';

import { TimeTableProps } from 'src/types/time-table';

import './time-table.css';

const TimeTable:React.FC<TimeTableProps> = ({
    timeGrid,
    columns,
    height,
    width
}) => {
    const timeCount = 24 * 60 / timeGrid;
    const timeGridLine = useMemo<number[]>(() => {
        let ret = [];
        for(let i=0;i<timeCount;i++)
            ret.push(timeGrid * i);
        
        return ret;
    }, [timeGrid])

    return (
        <div 
            className='time-table-container'
            style={{height:height, width:width}}
        >
            <div className='time-table-column'>
                <div className='time-table-header'/>
                {
                    timeGridLine.map((val, idx, arr)=> {
                        <div className='time-table-cell'>
                            {`${val/60}:${val%60}`}
                        </div>
                    })
                }
            </div>
            {
                columns.map((val, idx, arr) => {
                    <div className='time-table-column' key={val.key}>
                        <div className='time-table-header'>{val.key}</div>
                        {
                            timeGridLine.map((val, idx, arr)=> {
                                <div className='time-table-cell'>
                                </div>
                            })
                        }
                    </div>
                })
            }
        </div>
    )
}

export {TimeTable};