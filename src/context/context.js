import React, { useState, useReducer, useEffect } from "react";
import {
  addExpenseListItemDb,
  removeExpenseListItemDb,
  getAllDataFromListDb,
} from "../db/db";

const defaultSpendingState = {
  Food: 0,
  Education: 0,
  Travelling: 0,
  Medicine: 0,
  Others: 0,
};

const spendingReducer = (state, action) => {
  if (action.type === "SET") {
    return { ...action.payload };
  }
  if (action.add) {
    const newState = { ...state };
    newState[`${action.type}`] = state[`${action.type}`] + action.payload;
    return newState;
  }
  if (!action.add) {
    const newState = { ...state };
    newState[`${action.type}`] = state[`${action.type}`] - action.payload;
    return newState;
  }

  return defaultSpendingState;
};

const moneyReducer = (state, action) => {
  const tempState = { ...state };

  if (action.type === "SET") {
    return { ...action.payload };
  } else if (action.type === "UPDATE") {
    tempState[action.date] += action.payload;
  } else if (action.type === "ADD") {
    tempState[action.date] = action.payload;
  } else if (action.type === "DELETE") {
    delete tempState[action.date];
  } else if (action.type === "SUBTRACT") {
    tempState[action.date] -= action.payload;
  }

  return tempState;
};

const timelineActionCreater = (state, obj, add) => {
  if (state[obj.date]) {
    if (add) {
      return "UPDATE";
    } else {
      if (!(state[obj.date] - obj.amount)) {
        return "DELETE";
      }
      return "SUBTRACT";
    }
  } else {
    return "ADD";
  }
};

const mainContext = React.createContext({
  expenseList: [],
  addExpenseList: (obj) => {},
  removeExpense: (id) => {},
  totalMoney: 0,
  spending: defaultSpendingState,
  spentMoneyTimeline: {},
  popupOptions: {enable:false},
  openPopup:(heading,message)=>{},
  closePopup:()=>{}
});

export const MainContextProvider = (props) => {
  const [popup, setPopup] = useState({enable:false});
  const [expenseList, setExpenseList] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);
  const [spending, dispatch] = useReducer(
    spendingReducer,
    defaultSpendingState
  );
  const [spentMoneyTimeline, dispatchMoney] = useReducer(moneyReducer, {});

  useEffect(() => {
    getAllDataFromListDb()
      .then((val) => {
        setExpenseList(val);
        const timeLine = {};
        const types = { ...defaultSpendingState };
        let totalSum = 0;

        val.forEach((item) => {
          if (timeLine[item.date]) {
            timeLine[item.date] += item.amount;
          } else {
            timeLine[item.date] = item.amount;
          }
          totalSum += item.amount;
          types[item.type] += item.amount;
        });

        setTotalMoney(totalSum);
        dispatch({ type: "SET", payload: types });
        dispatchMoney({ type: "SET", payload: timeLine });
      })
      .catch((err) => {
        openPopup('Error',err.message);
      });
  }, []);

  const openPopup = (heading,message) => {
    setPopup({enbale:true ,heading, message });
  };
  const closePopup = ()=>{
    console.log('hola')
    console.log(popup)
    setPopup({enable:false});
  }

  const addExpenseList = (obj) => {
    setTotalMoney((cur) => cur + Number(obj.amount));

    addExpenseListItemDb(obj).catch(err => openPopup('Error',err.message));

    dispatchMoney({
      date: obj.date,
      payload: obj.amount,
      type: timelineActionCreater(spentMoneyTimeline, obj, true),
    });

    dispatch({ type: obj.type, add: true, payload: obj.amount });

    console.log("gola");
    setExpenseList((current) => {
      return [...current, obj];
    });
  };

  const removeExpense = (obj) => {
    setTotalMoney((cur) => cur - Number(obj.amount));

    removeExpenseListItemDb(obj).catch(err => openPopup('Error',err.message));
    dispatchMoney({
      date: obj.date,
      payload: obj.amount,
      type: timelineActionCreater(spentMoneyTimeline, obj),
    });

    dispatch({ type: obj.type, add: false, payload: obj.amount });

    setExpenseList((curr) => curr.filter((item) => item.id !== obj.id));
  };

  return (
    <mainContext.Provider
      value={{
        expenseList,
        addExpenseList,
        removeExpense,
        totalMoney,
        spending,
        spentMoneyTimeline,
        popupOptions: popup,
        openPopup,
        closePopup
      }}
    >
      {props.children}
    </mainContext.Provider>
  );
};

export default mainContext;
