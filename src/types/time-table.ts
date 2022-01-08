export interface TimeTableColumn {
    key: string;
    timeGrid?: number;
}

export interface TimeTableProps {
    timeGrid: number;
    columns: TimeTableColumn[];
    width: number;
    height: number;
}