import React from 'react'

function TableParameters({params, addParToTable}) {
    return (
    <thead>
         {addParToTable.map((item)=> {
            return(
            <thead>
                <th>
                   {item.parTitle}
                </th>
             </thead> )})}
    </thead>
    )
}

export default TableParameters;