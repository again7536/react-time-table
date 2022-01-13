import React, { ForwardedRef } from 'react';
import { TableBlockProps } from "src/types/index";

const Block:React.FC<TableBlockProps>=({
    height, 
    children, 
    ...props
}) => {
    return (
        <td
            draggable
            rowSpan={height}
            {...props}
        >
            {children}
        </td>
    )
};

export {Block}