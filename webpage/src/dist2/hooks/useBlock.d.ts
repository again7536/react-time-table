import { TableBlock, TableBlockMap, UseBlockProps } from "../types/index";
declare const useBlock: ({ initialBlockMap }: UseBlockProps) => {
    blockMap: TableBlockMap;
    usedTime: number[][];
    createBlock: (row: number, col: number, block: TableBlock) => boolean;
    moveBlock: (row: number, col: number, newRow: number, newCol: number) => boolean;
    removeBlock: (row: number, col: number) => void;
    modifyBlock: (row: number, col: number, block: TableBlock) => void;
};
export { useBlock };
