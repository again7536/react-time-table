import React from "react";

/* table block */
export interface TableBlockProps extends React.TdHTMLAttributes<HTMLTableCellElement>{
    height:number;
    [x:string]:any;
}
export type TableBlock = React.ReactElement<TableBlockProps>;
export interface TableBlockMap{
    [row:number]: {
        [col:number]: TableBlock;
    }
}

/* row */
export interface TimeTableRow{
    key:string;
    header?: React.TdHTMLAttributes<HTMLTableCellElement>
    grid?: React.TdHTMLAttributes<HTMLTableCellElement>
}

/* table */
export interface TimeTableColumn {
    key: string;
    header?: React.TdHTMLAttributes<HTMLTableCellElement>
    cell?: React.TdHTMLAttributes<HTMLTableCellElement>
}
export interface TimeTableColumnProps {
    key: string;
    name: string;
    timeLine: number[];
    timeColumn?: boolean;
}
export interface TimeTableProps extends React.TableHTMLAttributes<HTMLTableElement>{
    rowGrid: number;
    columns: TimeTableColumn[];
    rows:TimeTableRow[];
    blockMap: TableBlockMap;
    usedTime: number[][];
    onDoubleClickGrid?:(row:number, col:number)=>void;
    onDropBlock?:(row:number, col:number, newRow:number, newColumn:number)=>void;
    onDragStartBlock?:(row:number, col:number)=>void,
}