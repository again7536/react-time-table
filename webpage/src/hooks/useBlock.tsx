import {useState} from 'react';
import { TableBlock, TableBlockMap } from 'src/types/time-table';

interface UseBlockProps {
    initialBlockMap?: TableBlockMap
}

const useBlock = ({initialBlockMap}:UseBlockProps) => {
    const [blockMap, setBlockMap] = useState<TableBlockMap>(initialBlockMap?initialBlockMap:{});
    const [usedTime, setUsedTime] = useState<number[][]>([]); //This should be used as usedTime[col][row]

    const createBlock = (row:number, col:number, block:TableBlock) => {
        setBlockMap(state=> {
            const bmap = {...state};
            bmap[row]={...bmap[row]}
            bmap[row][col] = block;

            return bmap;
        });

        setUsedTime(state=> {
            const ret = [...state];
            if(ret[col]===undefined)
                ret[col] = [];
            
            for(let i=1;i<24;i++)
                ret[col][row+i] = 1;
            return ret;
        });
    }

    const moveBlock = (row:number, col:number, newRow:number, newCol:number) => {
        setBlockMap(state=> {
            const bmap = {...state};
            bmap[newRow]={...bmap[newRow]}
            bmap[newRow][newCol] = {...bmap[row][col]};
            delete bmap[row][col];

            return bmap;
        });

        setUsedTime(state=> {
            const ret = [...state];
            if(ret[newCol]===undefined)
                ret[newCol] = [];
            
            for(let i=1;i<24;i++) {
                ret[newCol][newRow+i] = 1;
                ret[col][row+i] = 0;
            }
            return ret;
        });
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

    return {blockMap, usedTime, createBlock, moveBlock, removeBlock, modifyBlock};
}

export {useBlock};