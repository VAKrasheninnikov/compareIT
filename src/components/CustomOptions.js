
import React from 'react'


function CustomOptions(props) {

    return (
        <div>
            <h5 onClick={props.stateForCustomObj}>Добавьте собственные значения</h5>
            <div className='customConstructor'>
                <div className='addName'>
                    <input type='text' value={props.foodName} onChange={props.createFoodName} placeholder='Введите название добавки..' />
                </div>
                <h5>Формирование параметров</h5>
                {props.customObj.map((obj) => {
                    return (
                        <div key={obj.items} className='parOptions'>
                            <div className='addParName'>
                                <input type='text' onChange={props.createParameterName} placeholder='Название..' />
                            </div>
                            <div className='addParValue'>
                                <input type='number' onChange={props.createParameterValue} placeholder='Значение..' />
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='finalButtons'>
                <button onClick={props.addToCustomArr} onMouseDown={props.addToCustomObj}><i className="fas fa-folder-plus"></i></button>
                <button onClick={props.addToFinalArr} onMouseUp={props.renderFinalArr} onMouseDown={props.letRendSupArr} value='some'><i className="fas fa-arrow-circle-right"></i></button>
            </div>
        </div>
    )
}

export default CustomOptions