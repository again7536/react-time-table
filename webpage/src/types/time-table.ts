import React from "react";

/* table block */
export interface TableBlockProps{
    height:number;
    style?: React.CSSProperties;
    [x:string]:any;
}
export type TableBlock = React.ReactElement<TableBlockProps>;
export interface TableBlockMap{
    [row:number]: {
        [col:number]: TableBlock;
    }
}

/* block config */
export interface TableBlockConfig{

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
export interface TimeTableProps {
    rowGrid: number;
    columns: TimeTableColumn[];
    rows:TimeTableRow[];
    width: number;
    height: number;
    blockMap: TableBlockMap;
    usedTime: number[][];
    onDoubleClick?:(row:number, col:number)=>void;
    onDropBlock?:(row:number, col:number, newRow:number, newColumn:number)=>void;
    onDragStartBlock?:(row:number, col:number)=>void
}