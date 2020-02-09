import React, { createContext, useReducer, useEffect } from 'react'
import moment from 'moment'
let AppContext = createContext()

const initialState = {
  mealplan: [],
  lastMealplan: [],
  recipes: [{
    id: 'asdadad',
    name: 'test',
    summary: 'asdasdasd'
  }],
}

const makeRandomRange = (x) => {
  let range = new Array(x),
    pointer = x
  return function getRandom() {
    pointer = (pointer-1+x) % x
    let random = Math.floor(Math.random() * pointer)
    let num = (random in range) ? range[random] : random
    range[random] = (pointer in range) ? range[pointer] : pointer
    return range[pointer] = num
  }
}

let reducer = (state, { type, payload }) => {
  switch(type) {
    case 'setMealplan': {
      const { lastMealplan, recipes } = state
      const { startDate, numDays } = payload
      const lastRecipes = lastMealplan.map((r) => {
        return r.id
      })
      console.log(recipes);
      const available = recipes.filter((r) => {
        return lastRecipes.includes(r.id) === false
      })
console.log(available);
      const generate = makeRandomRange(available.length)

      let mealplan = []

      for (let i = 0; i < numDays; i++) {
        mealplan.push({
          key: i,
          date: moment(startDate).add(i, 'days'),
          recipe: available[generate()]
        })
      }

      return {
        ...state,
        mealplan,
      }
    }
    case 'setRecipes': {
      return {
        ...state,
        recipes: payload
      }
    }
    case 'addRecipe': {
      let { recipes } = state

      let index = recipes.findIndex((r) => {
        return r.id === payload.id
      })

      if (index !== -1) {
        recipes.splice(index, 1, payload)
      }
      else {
        recipes.push(payload)
      }

      return {
        ...state,
        recipes
      }
    }
    case 'removeRecipe': {
      let { recipes } = state

      let index = recipes.findIndex((r) => {
        return r.id === payload.id
      })

      if (index !== -1) {
        recipes.splice(index, 1)
      }

      return {
        ...state,
        recipes
      }
    }
    default:
      return state
  }
}

const logger = (reducer) => {
  const reducerWithLogger = (state, action) => {
    //console.log("%cPrevious State:", "color: #9E9E9E font-weight: 700", state)
    //console.log("%cAction:", "color: #00A7F7 font-weight: 700", action)
    //console.log("%cNext State:", "color: #47B04B font-weight: 700", reducer(state,action))
    return reducer(state,action)
  }
  return reducerWithLogger
}

const loggerReducer = logger(reducer)

let persistedState = {}

Object.keys(initialState).forEach((key) => {
  if (window.localStorage[key]) {
    persistedState[key] = JSON.parse(window.localStorage[key])
  }
})

function AppContextProvider(props) {
  const fullInitialState = {
    ...initialState,
    ...persistedState
  }

  let [state, dispatch] = useReducer(loggerReducer, fullInitialState)

  useEffect(() => {
    Object.keys(initialState).forEach((key) => {
      window.localStorage[key] = JSON.stringify(state[key])
    })
  }, [state])

  return (
    <AppContext.Provider value={{ state, dispatch }}>{props.children}</AppContext.Provider>
  )
}

let AppContextConsumer = AppContext.Consumer

export { AppContext, AppContextProvider, AppContextConsumer }
