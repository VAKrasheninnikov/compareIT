import React from 'react'
import frame from './Frame.svg'



function Table({ uniqArr, readyForReadyArr, subExperimentalArr, handleChange, handleSort, equality, deletingParams, showMeObj, pushNewValue, workMode, calculatePlace, calcPlace, onDeleteCount, refreshingFunc, insideArr }) {


    return (
        <table>
            {subExperimentalArr.length ? <>
                <thead>
                    <tr>
                        <th className='showPlace'>
                            <div onMouseDown={handleSort} ><i className={workMode ? "fas fa-cog active" : "fas fa-cog"} onClick={handleChange}></i></div>
                            <div onClick={calcPlace}><i className={calculatePlace ? "fas fa-chart-bar active" : "fas fa-chart-bar"}></i></div>
                            <div onClick={refreshingFunc}><i className="fas fa-sync"></i></div>
                            <input type='number' onChange={pushNewValue}></input>
                        </th>
                        {(workMode ? uniqArr[0].items : readyForReadyArr[0].items).map((item) => {
                            return (
                                <th onClick={handleSort} onClick={(event) => deletingParams(event)}>{item.name}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {(workMode ? uniqArr : readyForReadyArr).filter((obj)=>obj.foodTitle!=='').map((item) => {
                        return (
                            <>
                                <tr key={item.id}>
                                    <td className='foodNames'>
                                        <div className='deleteNplace'>
                                            <i className={workMode ? null : insideArr.find((obj) => obj.id === item.id) ? "fas fa-minus-circle" : "fas fa-minus-circle active"} onClick={() => onDeleteCount(item)}></i>
                                            <div className={calculatePlace ? 'placePositionEnable' : 'placePositionDisable'}>{item.items.map((obj) => obj.place).reduce(function (a, b) { return a + b })}</div>
                                        </div>
                                        <div className='foodLabel'>{item.foodTitle}</div>
                                        <div className={workMode ? 'foodInputsEnable' : 'foodInputsDisable'}>
                                            <h5>Урожайность ц/га
                                                {equality(item.foodTitle)}
                                            </h5>
                                        </div>
                                    </td>
                                    <tr>{item.items.map((obj) => {
                                        return (
                                            <>
                                                <td key={obj.subchanges} className='tableCellPlace'>
                                                    <h5 className={calculatePlace ? 'placeTegEnable' : 'placeTegDisable'}>{obj.place}</h5>
                                                    {workMode ? <i className="fas fa-exchange-alt" onClick={() => showMeObj(obj)}></i> : null}
                                                    <div className='valueTeg'>{Number(obj.value).toFixed(1)}</div>
                                                </td>
                                            </>
                                        )
                                    })}</tr>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </> :
                <>
                    <div className='conturedTable'>
                        <img className='framePic' src={frame} alt='splash screen'></img>
                    </div>
                </>}
        </table>
    )


};

export default Table;