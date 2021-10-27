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
    items: [
      {
        name: 'ЭКЕ, КРС',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'ЭКЕ, свиней',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'ЭКЕ, овец',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'ОЭ КРС (МДж)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'ОЭ свиней (МДж)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'ОЭ овец (МДж)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Сухое вещество (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Сырой протеин (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'РП (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'НРП (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Перевариваемый протеин, КРС (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Перевариваемый протеин свиней (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Перевариваемый протеин овец (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Лизин (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Метионин и цистин (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Триптофан (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Сырой жир (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Сырая клетчатка (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'НДК (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'БЭВ, в т.ч. (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Крахмал (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Сахар (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Кальций (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Фосфор (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Магний (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Калий (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Сера (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Железо (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Медь (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Цинк (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Марганец (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Кобальт (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Йод (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Каротин (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Витамин А (МЕ)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Витамин Д (МЕ)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Витамин Е (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'В1 (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'В2 (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'В3 (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'В4 (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'В5 (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'В12 (мкг)',
        value: 0,
        place: 0,
        changes: false
      },
    ],
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
    items: [
      {
        name: 'ЭКЕ, КРС',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'ЭКЕ, свиней',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'ЭКЕ, овец',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'ОЭ КРС (МДж)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'ОЭ свиней (МДж)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'ОЭ овец (МДж)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Сухое вещество (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Сырой протеин (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'РП (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'НРП (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Перевариваемый протеин, КРС (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Перевариваемый протеин свиней (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Перевариваемый протеин овец (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Лизин (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Метионин и цистин (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Триптофан (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Сырой жир (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Сырая клетчатка (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'НДК (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'БЭВ, в т.ч. (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Крахмал (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Сахар (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Кальций (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Фосфор (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Магний (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Калий (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Сера (г)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Железо (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Медь (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Цинк (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Марганец (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Кобальт (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Йод (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Каротин (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Витамин А (МЕ)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Витамин Д (МЕ)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'Витамин Е (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'В1 (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'В2 (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'В3 (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'В4 (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'В5 (мг)',
        value: 0,
        place: 0,
        changes: false
      },
      {
        name: 'В12 (мкг)',
        value: 0,
        place: 0,
        changes: false
      },
    ],
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
    return (someArr)
  }

  const multiplyingArr = someMulty()


  const commonMultiArr = (i) => {
    let commonMulti = []
    for (i = 0; i < multiplyingArr.length - 1; i++) {
      if (multiplyingArr[i][i] !== undefined) {
        commonMulti.push(multiplyingArr[i][i])
      }
    }
    return (commonMulti)
  }


  let readyArr = commonMultiArr()


  // -------------------------------АЛГОРИТМ ВЫСТАВЛЕНИЯ МЕСТ V.2-----------------------------
  const sortVitamin = readyArr.length ? () => {
    let final = [];
    let sortFinal = [];
    let custom0 = [];
    let custom1 = [];
    let custom2 = [];
    let custom3 = [];
    let custom4 = [];
    let custom5 = [];
    let custom6 = [];
    let custom7 = [];
    let custom8 = [];
    let custom9 = [];
    let custom10 = [];
    let custom11 = [];
    let custom12 = [];
    let custom13 = [];
    let custom14 = [];
    let custom15 = [];
    let custom16 = [];
    let custom17 = [];
    let custom18 = [];
    let custom19 = [];
    let custom20 = [];
    let custom21 = [];
    let custom22 = [];
    let custom23 = [];
    let custom24 = [];
    let custom25 = [];
    let custom26 = [];
    let custom27 = [];
    let custom28 = [];
    let custom29 = [];
    let custom30 = [];
    let custom31 = [];
    let custom32 = [];
    let custom33 = [];
    let custom34 = [];
    let custom35 = [];
    let custom36 = [];
    let custom37 = [];
    let custom38 = [];
    let custom39 = [];
    let custom40 = [];
    let custom41 = [];
    let custom42 = [];
    let custom43 = [];
    let custom44 = [];
    let custom45 = [];
    let custom46 = [];
    let custom47 = [];
    let custom48 = [];
    let custom49 = [];
    let custom50 = [];
    let mergedArr = [];

    for (let i = 0; i < readyArr[0].items.length; i++) {
      final.push(readyArr.map(obj => obj.items[i].value))
      sortFinal.push([...final[i]].sort((a, b) => b - a))
    }

    const uCustom0 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[0][x] === sortFinal[0][y]) {
            custom0.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[0].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 0 ? uCustom0() : console.log()
    let uniqCustom0 = _.uniqBy(custom0, 'foodTitle')



    const uCustom1 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[1][x] === sortFinal[1][y]) {
            custom1.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[1].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 1 ? uCustom1() : console.log()
    let uniqCustom1 = _.uniqBy(custom1, 'foodTitle')

    const uCustom2 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[2][x] === sortFinal[2][y]) {
            custom2.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[2].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 2 ? uCustom2() : console.log()
    let uniqCustom2 = _.uniqBy(custom2, 'foodTitle')

    const uCustom3 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[3][x] === sortFinal[3][y]) {
            custom3.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[3].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 3 ? uCustom3() : console.log()
    let uniqCustom3 = _.uniqBy(custom3, 'foodTitle')

    const uCustom4 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[4][x] === sortFinal[4][y]) {
            custom4.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[4].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 4 ? uCustom4() : console.log()
    let uniqCustom4 = _.uniqBy(custom4, 'foodTitle')

    const uCustom5 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[5][x] === sortFinal[5][y]) {
            custom5.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[5].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 5 ? uCustom5() : console.log()
    let uniqCustom5 = _.uniqBy(custom5, 'foodTitle')

    const uCustom6 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[6][x] === sortFinal[6][y]) {
            custom6.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[6].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 6 ? uCustom6() : console.log()
    let uniqCustom6 = _.uniqBy(custom6, 'foodTitle')

    const uCustom7 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[7][x] === sortFinal[7][y]) {
            custom7.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[7].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 7 ? uCustom7() : console.log()
    let uniqCustom7 = _.uniqBy(custom7, 'foodTitle')

    const uCustom8 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[8][x] === sortFinal[8][y]) {
            custom8.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[8].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 8 ? uCustom8() : console.log()
    let uniqCustom8 = _.uniqBy(custom8, 'foodTitle')

    const uCustom9 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[9][x] === sortFinal[9][y]) {
            custom9.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[9].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 9 ? uCustom9() : console.log()
    let uniqCustom9 = _.uniqBy(custom9, 'foodTitle')

    const uCustom10 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[10][x] === sortFinal[10][y]) {
            custom10.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[10].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 10 ? uCustom10() : console.log()
    let uniqCustom10 = _.uniqBy(custom10, 'foodTitle')

    const uCustom11 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[11][x] === sortFinal[11][y]) {
            custom11.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[11].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 11 ? uCustom11() : console.log()
    let uniqCustom11 = _.uniqBy(custom11, 'foodTitle')

    const uCustom12 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[12][x] === sortFinal[12][y]) {
            custom12.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[12].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 12 ? uCustom12() : console.log()
    let uniqCustom12 = _.uniqBy(custom12, 'foodTitle')

    const uCustom13 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[13][x] === sortFinal[13][y]) {
            custom13.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[13].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 13 ? uCustom13() : console.log()
    let uniqCustom13 = _.uniqBy(custom13, 'foodTitle')

    const uCustom14 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[14][x] === sortFinal[14][y]) {
            custom14.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[14].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 14 ? uCustom14() : console.log()
    let uniqCustom14 = _.uniqBy(custom14, 'foodTitle')

    const uCustom15 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[15][x] === sortFinal[15][y]) {
            custom15.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[15].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 15 ? uCustom15() : console.log()
    let uniqCustom15 = _.uniqBy(custom15, 'foodTitle')

    const uCustom16 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[16][x] === sortFinal[16][y]) {
            custom16.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[16].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 16 ? uCustom16() : console.log()
    let uniqCustom16 = _.uniqBy(custom16, 'foodTitle')

    const uCustom17 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[17][x] === sortFinal[17][y]) {
            custom17.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[17].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 17 ? uCustom17() : console.log()
    let uniqCustom17 = _.uniqBy(custom17, 'foodTitle')

    const uCustom18 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[18][x] === sortFinal[18][y]) {
            custom18.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[18].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 18 ? uCustom18() : console.log()
    let uniqCustom18 = _.uniqBy(custom18, 'foodTitle')

    const uCustom19 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[19][x] === sortFinal[19][y]) {
            custom19.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[19].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 19 ? uCustom19() : console.log()
    let uniqCustom19 = _.uniqBy(custom19, 'foodTitle')

    const uCustom20 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[20][x] === sortFinal[20][y]) {
            custom20.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[20].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 20 ? uCustom20() : console.log()
    let uniqCustom20 = _.uniqBy(custom20, 'foodTitle')

    const uCustom21 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[21][x] === sortFinal[21][y]) {
            custom21.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[21].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 21 ? uCustom21() : console.log()
    let uniqCustom21 = _.uniqBy(custom21, 'foodTitle')

    const uCustom22 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[22][x] === sortFinal[22][y]) {
            custom22.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[22].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 22 ? uCustom22() : console.log()
    let uniqCustom22 = _.uniqBy(custom22, 'foodTitle')

    const uCustom23 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[23][x] === sortFinal[23][y]) {
            custom23.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[23].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 23 ? uCustom23() : console.log()
    let uniqCustom23 = _.uniqBy(custom23, 'foodTitle')

    const uCustom24 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[24][x] === sortFinal[24][y]) {
            custom24.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[24].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 24 ? uCustom24() : console.log()
    let uniqCustom24 = _.uniqBy(custom24, 'foodTitle')

    const uCustom25 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[25][x] === sortFinal[25][y]) {
            custom25.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[25].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 25 ? uCustom25() : console.log()
    let uniqCustom25 = _.uniqBy(custom25, 'foodTitle')

    const uCustom26 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[26][x] === sortFinal[26][y]) {
            custom26.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[26].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 26 ? uCustom26() : console.log()
    let uniqCustom26 = _.uniqBy(custom26, 'foodTitle')

    const uCustom27 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[27][x] === sortFinal[27][y]) {
            custom27.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[27].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 27 ? uCustom27() : console.log()
    let uniqCustom27 = _.uniqBy(custom27, 'foodTitle')

    const uCustom28 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[28][x] === sortFinal[28][y]) {
            custom28.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[28].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 28 ? uCustom28() : console.log()
    let uniqCustom28 = _.uniqBy(custom28, 'foodTitle')

    const uCustom29 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[29][x] === sortFinal[29][y]) {
            custom29.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[29].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 29 ? uCustom29() : console.log()
    let uniqCustom29 = _.uniqBy(custom29, 'foodTitle')

    const uCustom30 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[30][x] === sortFinal[30][y]) {
            custom30.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[30].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 30 ? uCustom30() : console.log()
    let uniqCustom30 = _.uniqBy(custom30, 'foodTitle')

    const uCustom31 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[31][x] === sortFinal[31][y]) {
            custom31.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[31].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 31 ? uCustom31() : console.log()
    let uniqCustom31 = _.uniqBy(custom31, 'foodTitle')

    const uCustom32 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[32][x] === sortFinal[32][y]) {
            custom32.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[32].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 32 ? uCustom32() : console.log()
    let uniqCustom32 = _.uniqBy(custom32, 'foodTitle')

    const uCustom33 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[33][x] === sortFinal[33][y]) {
            custom33.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[33].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 33 ? uCustom33() : console.log()
    let uniqCustom33 = _.uniqBy(custom33, 'foodTitle')

    const uCustom34 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[34][x] === sortFinal[34][y]) {
            custom34.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[34].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 34 ? uCustom34() : console.log()
    let uniqCustom34 = _.uniqBy(custom34, 'foodTitle')

    const uCustom35 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[35][x] === sortFinal[35][y]) {
            custom35.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[35].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 35 ? uCustom35() : console.log()
    let uniqCustom35 = _.uniqBy(custom35, 'foodTitle')

    const uCustom36 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[36][x] === sortFinal[36][y]) {
            custom36.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[36].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 36 ? uCustom36() : console.log()
    let uniqCustom36 = _.uniqBy(custom36, 'foodTitle')

    const uCustom37 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[37][x] === sortFinal[37][y]) {
            custom37.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[37].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 37 ? uCustom37() : console.log()
    let uniqCustom37 = _.uniqBy(custom37, 'foodTitle')

    const uCustom38 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[38][x] === sortFinal[38][y]) {
            custom38.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[38].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 38 ? uCustom38() : console.log()
    let uniqCustom38 = _.uniqBy(custom38, 'foodTitle')

    const uCustom39 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[39][x] === sortFinal[39][y]) {
            custom39.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[39].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 39 ? uCustom39() : console.log()
    let uniqCustom39 = _.uniqBy(custom39, 'foodTitle')

    const uCustom40 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[40][x] === sortFinal[40][y]) {
            custom40.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[40].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 40 ? uCustom40() : console.log()
    let uniqCustom40 = _.uniqBy(custom40, 'foodTitle')

    const uCustom41 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[41][x] === sortFinal[41][y]) {
            custom41.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[41].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 41 ? uCustom41() : console.log()
    let uniqCustom41 = _.uniqBy(custom41, 'foodTitle')

    const uCustom42 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[42][x] === sortFinal[42][y]) {
            custom42.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[42].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 42 ? uCustom42() : console.log()
    let uniqCustom42 = _.uniqBy(custom42, 'foodTitle')

    const uCustom43 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[43][x] === sortFinal[43][y]) {
            custom43.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[43].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 43 ? uCustom43() : console.log()
    let uniqCustom43 = _.uniqBy(custom43, 'foodTitle')

    const uCustom44 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[44][x] === sortFinal[44][y]) {
            custom44.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[44].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 44 ? uCustom44() : console.log()
    let uniqCustom44 = _.uniqBy(custom44, 'foodTitle')

    const uCustom45 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[45][x] === sortFinal[45][y]) {
            custom45.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[45].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 45 ? uCustom45() : console.log()
    let uniqCustom45 = _.uniqBy(custom45, 'foodTitle')

    const uCustom46 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[46][x] === sortFinal[46][y]) {
            custom46.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[46].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 46 ? uCustom46() : console.log()
    let uniqCustom46 = _.uniqBy(custom46, 'foodTitle')

    const uCustom47 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[47][x] === sortFinal[47][y]) {
            custom47.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[47].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 47 ? uCustom47() : console.log()
    let uniqCustom47 = _.uniqBy(custom47, 'foodTitle')

    const uCustom48 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[48][x] === sortFinal[48][y]) {
            custom48.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[48].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 48 ? uCustom48() : console.log()
    let uniqCustom48 = _.uniqBy(custom48, 'foodTitle')

    const uCustom49 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[49][x] === sortFinal[49][y]) {
            custom49.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[49].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 49 ? uCustom49() : console.log()
    let uniqCustom49 = _.uniqBy(custom49, 'foodTitle')

    const uCustom50 = () => {
      for (let x = 0; x < readyArr.length; x++) {
        for (let y = 0; y < readyArr.length; y++) {
          if (final[50][x] === sortFinal[50][y]) {
            custom50.push({
              id: readyArr[x].id,
              foodTitle: readyArr[x].foodTitle,
              items: readyArr[x].items.map((obj) => {
                return (
                  {
                    name: obj.name,
                    value: obj.value,
                    place: obj.name === readyArr[0].items[50].name ? y + 1 : obj.place,
                    changes: obj.changes,

                  }
                )
              }),
            })
          }
        }
      }
    }

    readyArr[0].items.length > 50 ? uCustom50() : console.log()
    let uniqCustom50 = _.uniqBy(custom50, 'foodTitle')

    for (let index = 0; index < readyArr.length; index++) {
      let pieceArr = []
      mergedArr.push({
        id: readyArr[index].id,
        foodTitle: readyArr[index].foodTitle,
        items: pieceArr
      })
      for (let z = 0; z < readyArr[0].items.length; z++) {
        pieceArr.push(
          {
            name: uniqCustom0[index].items[z].name,
            value: uniqCustom0[index].items[z].value,
            place: (readyArr[0].items.length > 0 ? uniqCustom0[index].items[z].place : null)
              + (readyArr[0].items.length > 1 ? uniqCustom1[index].items[z].place : null) + (readyArr[0].items.length > 2 ? uniqCustom2[index].items[z].place : null)
              + (readyArr[0].items.length > 3 ? uniqCustom3[index].items[z].place : null) + (readyArr[0].items.length > 4 ? uniqCustom4[index].items[z].place : null)
              + (readyArr[0].items.length > 5 ? uniqCustom5[index].items[z].place : null) + (readyArr[0].items.length > 6 ? uniqCustom6[index].items[z].place : null)
              + (readyArr[0].items.length > 7 ? uniqCustom7[index].items[z].place : null) + (readyArr[0].items.length > 8 ? uniqCustom8[index].items[z].place : null)
              + (readyArr[0].items.length > 9 ? uniqCustom9[index].items[z].place : null) + (readyArr[0].items.length > 10 ? uniqCustom10[index].items[z].place : null)
              + (readyArr[0].items.length > 11 ? uniqCustom11[index].items[z].place : null) + (readyArr[0].items.length > 12 ? uniqCustom12[index].items[z].place : null)
              + (readyArr[0].items.length > 13 ? uniqCustom13[index].items[z].place : null) + (readyArr[0].items.length > 14 ? uniqCustom14[index].items[z].place : null)
              + (readyArr[0].items.length > 15 ? uniqCustom15[index].items[z].place : null) + (readyArr[0].items.length > 16 ? uniqCustom16[index].items[z].place : null)
              + (readyArr[0].items.length > 17 ? uniqCustom17[index].items[z].place : null) + (readyArr[0].items.length > 18 ? uniqCustom18[index].items[z].place : null)
              + (readyArr[0].items.length > 19 ? uniqCustom19[index].items[z].place : null) + (readyArr[0].items.length > 20 ? uniqCustom20[index].items[z].place : null)
              + (readyArr[0].items.length > 21 ? uniqCustom21[index].items[z].place : null) + (readyArr[0].items.length > 22 ? uniqCustom22[index].items[z].place : null)
              + (readyArr[0].items.length > 23 ? uniqCustom23[index].items[z].place : null) + (readyArr[0].items.length > 24 ? uniqCustom24[index].items[z].place : null)
              + (readyArr[0].items.length > 25 ? uniqCustom25[index].items[z].place : null) + (readyArr[0].items.length > 26 ? uniqCustom26[index].items[z].place : null)
              + (readyArr[0].items.length > 27 ? uniqCustom27[index].items[z].place : null) + (readyArr[0].items.length > 28 ? uniqCustom28[index].items[z].place : null)
              + (readyArr[0].items.length > 29 ? uniqCustom29[index].items[z].place : null) + (readyArr[0].items.length > 30 ? uniqCustom30[index].items[z].place : null)
              + (readyArr[0].items.length > 31 ? uniqCustom31[index].items[z].place : null) + (readyArr[0].items.length > 32 ? uniqCustom32[index].items[z].place : null)
              + (readyArr[0].items.length > 33 ? uniqCustom33[index].items[z].place : null) + (readyArr[0].items.length > 34 ? uniqCustom34[index].items[z].place : null)
              + (readyArr[0].items.length > 35 ? uniqCustom35[index].items[z].place : null) + (readyArr[0].items.length > 36 ? uniqCustom36[index].items[z].place : null)
              + (readyArr[0].items.length > 37 ? uniqCustom37[index].items[z].place : null) + (readyArr[0].items.length > 38 ? uniqCustom38[index].items[z].place : null)
              + (readyArr[0].items.length > 39 ? uniqCustom39[index].items[z].place : null) + (readyArr[0].items.length > 40 ? uniqCustom40[index].items[z].place : null)
              + (readyArr[0].items.length > 41 ? uniqCustom41[index].items[z].place : null) + (readyArr[0].items.length > 42 ? uniqCustom42[index].items[z].place : null)
              + (readyArr[0].items.length > 43 ? uniqCustom43[index].items[z].place : null) + (readyArr[0].items.length > 44 ? uniqCustom44[index].items[z].place : null)
              + (readyArr[0].items.length > 45 ? uniqCustom45[index].items[z].place : null) + (readyArr[0].items.length > 46 ? uniqCustom46[index].items[z].place : null)
              + (readyArr[0].items.length > 47 ? uniqCustom47[index].items[z].place : null) + (readyArr[0].items.length > 48 ? uniqCustom48[index].items[z].place : null)
              + (readyArr[0].items.length > 49 ? uniqCustom49[index].items[z].place : null) + (readyArr[0].items.length > 50 ? uniqCustom50[index].items[z].place : null),
            changes: Number(index + '' + z),
            subChanges: (readyArr[index].foodTitle + '' + uniqCustom0[index].items[z].name).split('').length * (readyArr[index].foodTitle).split('').length + uniqCustom0[index].items[z].value + '' + readyArr[index].foodTitle + '' + uniqCustom0[index].items[z].name
          })

      }

    }

    return (mergedArr)
  } : []
  let uniqArr = readyArr.length ? sortVitamin() : []
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
                  foodName={foodName}
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