import './App.css';
import React, { useEffect } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import FoodOptions from './components/FoodOptions';
import CustomOptions from './components/CustomOptions';
import Table from './components/Table';
import About from './components/About';
import _, { remove } from 'lodash';
import { Route } from 'react-router-dom';
import { unfinishedArr } from './components/soureArr';
import fire from './fire';
import { sourceObj } from './variables';



function App() {

  //------------------------------FIREBASE AUTHENTICATION---------------------

  const [user, setUser] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [hasAccount, setHasAccount] = React.useState(false);

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPassword(err.message);
            break;
        }
      })
  }

  const handleSignUp = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPassword(err.message);
            break;
        }
      })
  }

  const handleLogOut = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser('');
      }
    })
  };

  useEffect(() => {
    authListener()
  }, [])


  //------------------------------FIREBASE AUTHENTICATION---------------------



  //------------------------------ФУНКЦИЯ ПОИСКА ПО ДОБАВКАМ---------------------

  const [srchFood, setSrchFood] = React.useState('');

  //------------------------------ФУНКЦИЯ ПОИСКА ПО ДОБАВКАМ---------------------

  //States для CustomOptions

  let [foodName, setFoodName] = React.useState('')
  let [parameterName, setParameterName] = React.useState('')
  let [parameterValue, setParameterValue] = React.useState('')

  //------------------------------ДОБАВЛЕНИЕ В РАБОЧИЙ МАССИВ---------------------

  const [insideArr, setInsideArr] = React.useState([])

  const onAddtoCount = (obj) => {
    if (insideArr.find((item) => item.id === obj.id)) {
      insideArr.filter((item) => item.id !== obj.id)
    }
    else {
      setInsideArr([...insideArr, obj])
    }
  };

  const [workMode, setWorkMode] = React.useState(false)

  const [calculatePlace, setCalculatePlace] = React.useState(false)
  const calcPlace = () => {
    setCalculatePlace(!calculatePlace)
  }

  //------------------------------ДОБАВЛЕНИЕ В РАБОЧИЙ МАССИВ---------------------

  //------------------------------УДАЛЕНИЕ ИЗ РАБОЧЕГО МАССИВА---------------------

  const onDeleteCount = (obj) => {
    setInsideArr((prev) => prev.filter((item) => item.id !== obj.id))
  }

  //------------------------------УДАЛЕНИЕ ИЗ РАБОЧЕГО МАССИВА---------------------

  const createFoodName = (event) => {
    setFoodName(event.target.value)
  }

  const createParameterName = (event) => {
    setParameterName(event.target.value)
  }

  const createParameterValue = (event) => {
    setParameterValue(event.target.value)
  }


  const onSearch = (event) => {
    setSrchFood(event.target.value)
  };


  //* РАБОТА С НОВЫМ ВИДОМ ОБЪЕКТА!

  let objToInsideArr = {
    id: Math.floor(Math.random() * 100000),
    foodTitle: foodName,
    items: sourceObj,
  }


  let sampleObjToInside = {
    id: '',
    foodTitle: foodName
  }


  const addNewKey = () => {
    return (sampleObjToInside['items'] = [
      {
        name: parameterName,
        value: parameterValue,
        place: 0,
        changes: false
      }
    ])
  }

  let [customObj, setCustomObj] = React.useState([{
    id: Math.floor(Math.random() * 100000),
    foodTitle: foodName,
    items: sourceObj
  }]);

  const addToCustomObj = () => {

    setToInside()
    setCustomObj([...customObj, sampleObjToInside])
  }


  const createCommonObj = (i) => {
    let someArr = []
    for (i = 0; i < customObj.length; i++) {
      someArr = someArr.concat(customObj[i].items)
    }
    return ({
      id: Math.floor(Math.random() * 100000),
      foodTitle: foodName,
      items: someArr
    })
  }


  let worksObject = createCommonObj();


  function mergeByProperty(arr1, arr2, prop) {
    _.each(arr2, function (arr2obj) {
      var arr1obj = _.find(arr1, function (arr1obj) {
        return arr1obj[prop] === arr2obj[prop];
      });

      arr1obj ? _.extend(arr1obj, arr2obj) : arr1.concat(arr2obj);

    });
  }

  mergeByProperty(objToInsideArr.items, worksObject.items, 'name');

  var arr3 = _.uniqBy(objToInsideArr.items.concat(worksObject.items), 'name')
  const absoluteArr = {
    id: Math.floor(Math.random() * 100000),
    foodTitle: foodName,
    items: arr3
  }

  const [addParsToInside, setAddParsToInside] = React.useState([])

  const newParsToInsideArr = () => {
    return ({
      name: parameterName,
      value: 0,
      place: 0,
      changes: false
    })
  }
  let newPars = newParsToInsideArr()

  const setToInside = () => {
    setAddParsToInside([...addParsToInside, newPars])
  }

  const myDifferences = _.differenceBy(addParsToInside, insideArr.length ? insideArr[0].items : null, 'name')
  
  const superInsideArr = insideArr.map((obj) => {
    return ({
      id: obj.id,
      foodTitle: obj.foodTitle,
      items: (_.uniqBy(obj.items.concat(myDifferences), 'name'))
    })
  })


  const [rendSupArr, setRendSupArr] = React.useState(insideArr)
  const letRendSupArr = () => {
    setRendSupArr([...superInsideArr, absoluteArr])
  }


  const [finalArr, setFinalArr] = React.useState([])


  const addToFinalArr = () => {
    setFinalArr([...finalArr, rendSupArr]);
  }


  const renderFinalArr = () => {
    setFoodName('');
    customObj.splice(1, customObj.length);
  }


  addNewKey()

  const cycledArr = (i) => {
    let blankArr = []
    for (i = 0; i < finalArr.length; i++) {
      blankArr.push(finalArr[i][finalArr[i].length - 1])
    }
    return blankArr
  }
  const cycled = cycledArr()


  const synthezArr = finalArr.length ? finalArr[finalArr.length - 1].concat(cycled) : console.log()


  let hyperArr = finalArr.length ? synthezArr.map((obj) => {
    return (
      {
        id: obj.id,
        foodTitle: obj.foodTitle,
        items: (_.uniqBy(obj.items.concat(synthezArr[0].items), 'name'))
      }
    )
  }) : console.log()





  var subsequenceArr = finalArr.length ? hyperArr[0].items.map((obj) => { return (obj.name) }) : console.log()
  const experimentalArr = finalArr.length ? hyperArr.map((obj) => {
    return (
      {
        id: obj.id,
        foodTitle: obj.foodTitle,
        items: _.sortBy(obj.items, function (obj) {
          return _.indexOf(subsequenceArr, obj.name)
        })
      }
    )
  }) : insideArr.map((obj) => { return (obj) })




  const subExperimentalArr = _.uniqBy(experimentalArr, 'foodTitle').map((obj) => {
    return (
      {
        ...obj,
        items: obj.items.map((item) => {
          return (
            {
              ...item,
              subChanges: (obj.foodTitle + '' + item.name).split('').length * (obj.foodTitle).split('').length + item.value + '' + obj.foodTitle + '' + item.name,
            }
          )
        })
      }
    )
  })

  const [removeStore, setRemoveStore] = React.useState([])
  const deletingParams = (e) => {
    if (subExperimentalArr[0].items.length-1 > removeStore.length) {
      setRemoveStore([...removeStore, e.target.textContent])
    }
    else  setRemoveStore (removeStore)
  }
  
  const deletable = () => {

    const removingArr = subExperimentalArr.map((obj) => {
      return (
        {
          ...obj,
          items: obj.items.map((item) => {
            if (removeStore.find((el) => el === item.name)) {
              return (null)
            }
            else return (item)
          })
        }
      )
    })
    return (removingArr)
  }

  const arrAfterDelete = deletable()

  let readyForReadyArr = arrAfterDelete.map((obj) => {
    return ({
      ...obj,
      items: obj.items.filter((el) => el !== null)
    })
  })



  //---------------------------------Начало функций для CustomOptions and TABLE!!!---------------------------------------------------------

  const defaultObjFunc = () => {
    return (
      readyForReadyArr.map((obj) => {
        return ({
          [obj.foodTitle]: 1
        })
      })
    )
  }


  const defaultObj = defaultObjFunc()


  const finalizedObj = defaultObj.reduce(function (result, current) {
    return Object.assign(result, current);
  }, {});


  const [change, setChange] = React.useState(finalizedObj)


  const handleChange = (event) => {
    const value = event.target.value
    setChange({
      ...finalizedObj, ...change,
      [event.target.name]: value
    })
    setWorkMode(true)
  }

  const equality = (foodTitle, i) => {
    for (i = 0; i < Object.keys(change).length; i++) {
      if (foodTitle === Object.keys(change)[i]) {
        return (<input type='number' value={Object.values(change)[i]} name={Object.keys(change)[i]} onChange={handleChange} onKeyDown={handleSort} onKeyUp={handleSort}></input>)
      }
    }
  }

  const [customValue, setCustomValue] = React.useState('')

  const pushNewValue = (e) => {
    setCustomValue(e.target.value)
  }

  const [changeValue, setChangeValue] = React.useState([])


  const showMeObj = (object) => {
    setChangeValue(prev => [...prev, {
      name: object.name,
      value: Number(customValue),
      place: object.place,
      changes: object.changes,
      subChanges: object.subChanges
    }])
  }

  const fatalityMergingFINAL_ARR = (i) => {
    let calculatedChangeValue = changeValue.map((obj) => { return (obj) })

    const checkingArr = readyForReadyArr.map((obj) => {
      return ({
        ...obj,
        items: obj.items.map((item) => {
          return (
            {
              name: item.name,
              changes: item.changes,
              value: Number(calculatedChangeValue.find((obj) => obj.subChanges === item.subChanges) ? calculatedChangeValue.filter((obj) => obj.subChanges === item.subChanges).map((obj) => obj.value)[0] : item.value),
              place: item.place,
              subChanges: (obj.foodTitle + '' + item.name).split('').length * (obj.foodTitle).split('').length + item.value + '' + obj.foodTitle + '' + item.name

            }
          )
        })
      })
    })
    return (checkingArr)
  }

  let fatalityFinalArr = fatalityMergingFINAL_ARR()

  const someMulty = () => {
    let someArr = []
    for (let i = 0; i < Object.keys(change).length; i++) {
      someArr.push(fatalityFinalArr.filter((obj) => obj !== undefined).map((obj) => {
        return (
          {
            id: obj.id,
            foodTitle: obj.foodTitle,
            items: obj.items.map((item) => {
              if (obj.foodTitle === Object.keys(change)[i]) {
                return ({
                  name: item.name,
                  value: (item.value * Object.values(change)[i]),
                  place: item.place,
                  changes: item.changes,
                  subChanges: (obj.foodTitle + '' + item.name).split('').length * (obj.foodTitle).split('').length + item.value + '' + obj.foodTitle + '' + item.name
                })
              }
              else return null
            })
          }
        )
      })

      )
    }
    return (fatalityFinalArr)
  }
  
  const multiplyingArr = someMulty()


  let readyArr = multiplyingArr
  

  // -------------------------------АЛГОРИТМ ВЫСТАВЛЕНИЯ МЕСТ V.2-----------------------------
  const sortVitamin = readyArr.length ? (arr)=>{
    let sourceArr = [];
    let sortedArrs= [];
    let result = [];
    let initialArr = [...readyArr]
    let initalColumns = arr[0].items.map((el)=>el.name)

    for (let i=0; i<arr[0].items.length;i++){
      for (let y=0; y<arr.length;y++){
        sourceArr.push(arr[y].items[i])
      }
    }

    let initialColumnArrs=initalColumns.map((el)=>{
      return ({
        items: sourceArr.filter((element)=>element.name===el)
      })
    })
    
    sortedArrs = initialColumnArrs.map((el)=>el.items.map((obj,index,array)=> {
      return(
        {
          ...obj,
          place:[...array].sort((a,b)=>b.value-a.value).map((element,index)=>element.value===obj.value? index+1:0).filter((el)=>el!==0)[0]
        })
    }))
    
    result=sortedArrs.flat()
    
    let resultedArr = initialArr.map((el)=>{return(
      {
        ...el,
        items:el.items.map((obj)=>{
          return ({
            ...obj,
            place: result.map((object)=>object.subChanges==obj.subChanges?object.place:obj.place).filter((el)=>el!==0)[0]
          })
        })
      })})
    
    return resultedArr
  } : []
  let uniqArr = readyArr.length ? sortVitamin(readyArr) : []
  console.log(uniqArr)

  // ------------------------АЛГОРИТМ ВЫСТАВЛЕНИЯ МЕСТ Version 2.0 -----------------------------------  

  const [sorter, setSorter] = React.useState(uniqArr)


  const handleSort = (event) => {
    var target = event.target.textContent
    setSorter(_.sortBy(uniqArr, function (obj) {
      return _.indexOf(tryToSort(null, null, target).map((obj) => obj.foodTitle), obj.foodTitle)
    }))
  }

  const tryToSort = (event) => {
    let someArr = []
    let sortArr = []
    for (let i = 0; i < uniqArr[uniqArr.length - 1].items.length; i++) {
      for (let j = 0; j < uniqArr[uniqArr.length - 1].items.length; j++) {
        if (uniqArr[uniqArr.length - 1].items[j].name === event) {
          someArr = someArr.concat(uniqArr.map((obj) => {
            return ({
              foodTitle: obj.foodTitle,
              items: obj.items[j].value
            })
          }))
          sortArr = someArr.sort((a, b) => b.items - a.items)
        }
      }
      return (sortArr)
    }
    return
  }

  const refreshingFunc = () => {
    setInsideArr([])
    setRendSupArr([])
    setFinalArr([])
    setRemoveStore([])
    setAddParsToInside([])
    readyForReadyArr.splice()
    readyArr.splice()
    uniqArr.splice()
    setChange({})
    setWorkMode(false)
    setCalculatePlace(false)
  }

  // ------------------------АЛГОРИТМ ВЫСТАВЛЕНИЯ МЕСТ Version 1.0 -----------------------------------   



  //* Конец функций для CustomOptions and TABLE!!!

  return (
    <div className="App">
      {user ? 
      <div className="bodyApp">
        <Header handleLogOut={handleLogOut} />
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/table'>
          <div className='mainTable'>
            <div className={workMode ? "compareBlockDisable" : "compareBlock"}>
              <div className="inlineOptions">
                <div className='addFood'>
                  <h5>Выберите добавку..</h5>
                  <div className='foodSearch'>
                    <input onChange={onSearch} type='text' placeholder='Поиск...'></input>
                    <i className="fas fa-search"></i>
                  </div>
                  <div className='addFooditem'>
                    <ul>
                      {[...unfinishedArr].filter((obj) => obj.foodTitle.toLowerCase().includes(srchFood.toLowerCase()))
                        .map((obj, id) => {
                          return (
                            <FoodOptions
                              key={id}
                              foodTitle={obj.foodTitle}
                              items={obj.items}
                              id={obj.id}
                              onAdd={onAddtoCount}
                              handleChange={handleChange}
                            />
                          )
                        })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="customOption">
                <CustomOptions
                  createFoodName={createFoodName}
                  foodName={foodName}
                  createParameterName={createParameterName}
                  createParameterValue={createParameterValue}
                  customObj={customObj}
                  renderFinalArr={renderFinalArr}
                  addToCustomObj={addToCustomObj}
                  addToFinalArr={addToFinalArr}
                  setToInside={setToInside}
                  letRendSupArr={letRendSupArr}
                  handleChange={handleChange}
                />
              </div>
            </div>

            <div className={workMode ? "outputBlockEnable" : "outputBlock"}>
              <Table
                uniqArr={uniqArr}
                readyForReadyArr={readyForReadyArr}
                workMode={workMode}
                calculatePlace={calculatePlace}
                unfinishedArr={unfinishedArr}
                pushNewValue={pushNewValue}
                showMeObj={showMeObj}
                sorter={sorter}
                handleChange={handleChange}
                handleSort={handleSort}
                readyArr={readyArr}
                equality={equality}
                experimentalArr={experimentalArr}
                subExperimentalArr={subExperimentalArr}
                insideArr={insideArr}
                rendSupArr={rendSupArr}
                finalArr={finalArr}
                deletingParams={deletingParams}
                calcPlace={calcPlace}
                onDeleteCount={onDeleteCount}
                refreshingFunc={refreshingFunc}
              />
            </div>
          </div>
        </Route>

      </div> :
        <Route path='/'>
          <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignUp={handleSignUp}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
          />
        </Route>
      }

    </div>
  );
}
export default App;