import React from 'react'



function FoodOptions({foodTitle, id, items, onAdd, handleChange}) {

 
    function handlePlus () {
        onAdd({foodTitle, id, items})
    }

    return (     
        <li>
            <i onClick={handlePlus} className="fas fa-plus-circle"></i>
            <div>{foodTitle}</div>
        </li>
    )
};

export default FoodOptions;