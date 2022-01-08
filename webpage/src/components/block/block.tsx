import React, { ForwardedRef } from 'react';
import { TableBlockProps } from "src/types/time-table"

const Block:React.FC<TableBlockProps>=({
    height, 
    children, 
    style,
    ...props
}) => {
    return (
        <td
            draggable
            rowSpan={height}
            style={style}
            {...props}
        >
            {children}
        </td>
    )
};

export {Block}