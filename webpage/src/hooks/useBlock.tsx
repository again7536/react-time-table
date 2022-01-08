import {useState} from 'react';
import { TableBlock, TableBlockMap } from 'src/types/time-table';

interface UseBlockProps {
    initialBlockMap?: TableBlockMap
}

const useBlock = ({initialBlockMap}:UseBlockProps) => {
    const [blockMap, setBlockMap] = useState<TableBlockMap>(initialBlockMap?initialBlockMap:{});

    const createBlock = (row:number, col:number, block:TableBlock) => {
        setBlockMap(state=> {
            const bmap = {...state};
            bmap[row]={...bmap[row]}
            bmap[row][col] = block;

            return bmap;
          })
    }

    const moveBlock = (row:number, col:number, newRow:number, newCol:number) => {
        setBlockMap(state=> {
            const bmap = {...state};
            bmap[newRow]={...bmap[newRow]}
            bmap[newRow][newCol] = {...bmap[row][col]};
            delete bmap[row][col];

            return bmap;
          })
    }

    const removeBlock = (row:number, col:number) => {
        setBlockMap(state=> {
            const bmap = {...state};
            delete bmap[row][col];
            
            return bmap;
        })
    }

    const modifyBlock =(row:number, col:number, block:TableBlock) => {
        setBlockMap(state=> {
            const bmap = {...state};
            bmap[row][col] = block;

            return bmap;
        })
    }

    return {blockMap, createBlock, moveBlock, removeBlock, modifyBlock};
}

export {useBlock};