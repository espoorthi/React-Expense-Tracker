import React, { Fragment, useContext,useState } from "react";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseForm from "../components/ExpenseForm";
import mainContext from "../context/context";

function Expense() {
  const ctx = useContext(mainContext);
  const date = new Date();
  const [sort,setSort] = useState('latest');
  

  const onChangeHandler = (e)=>{
    setSort(e.target.value);
  }

  return (
    <Fragment>
      <div className="flex-container flex-1 flex-wrap">
        <div className="ExpenseTable-Total card ">
          <p>Spent Money</p>
          <h5>{ctx.totalMoney}₹</h5>
        </div>
        <div className="card ExpenseTable-Total">
          <p>Date</p>
          <div className="flex-container">
            <h5>{date.getDate()}</h5>
            <h5>
              {Intl.DateTimeFormat("en-us", { month: "long" }).format(date)}
            </h5>
            <h5>{date.getFullYear()}</h5>
          </div>
        </div>
      </div>
      <div className="sort-box">
      <h3>Sort By</h3>
        <select className="sort-select" onChange={onChangeHandler}>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="highest">Highest</option>
        </select>
      </div>
      <ExpenseForm />
      <ExpenseTable sort={sort}/>
    </Fragment>
  );
}

export default Expense;
