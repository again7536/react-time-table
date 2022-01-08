import React from "react";

/* table block */
export interface TableBlockProps{
    height:number;
    style?: React.CSSProperties;
    [x:string]:any;
}
export type TableBlock = React.ReactElement<TableBlockProps>;
export interface TableBlockMap{
    [row:string|number]: {
        [col:string|number]: TableBlock;
    }
}

/* block config */
export interface TableBlockConfig{

}

/* table */
export interface TimeTableColumn {
    key: string;
}
export interface TimeTableColumnProps {
    key: string;
    name: string;
    timeLine: number[];
    timeColumn?: boolean;
}
export interface TimeTableProps {
    timeSlice: number;
    columns: TimeTableColumn[];
    width: number;
    height: number;
    blockMap: TableBlockMap;
    onCreateBlock:(row:number, col:number)=>void;
    onChangeBlock:(row:number, col:number, newRow:number, newColumn:number)=>void;
}