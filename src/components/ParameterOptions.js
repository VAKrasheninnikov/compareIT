import React from 'react'

function ParameterOptions ({letShowCletchatka, letShowProtein, letShowBev, letShowUglevod, onAddParameter, name, id, letAddCletchatka})  {

    function handlePlusPar () {
        onAddParameter({name, id})
        letShowCletchatka({id})  
        letShowProtein({id})
        letShowBev({id})
        letShowUglevod({id})
    }

   
    
    return (
        <li>
            <i className="fas fa-plus-circle" onClick={handlePlusPar}></i>
            <div>{name}</div>
        </li>)
        
    

};

export default ParameterOptions;