import React, { useContext } from "react";
import TrashcanIcon from "../assets/Trashcan.svg";
import mainContext from "../context/context";

const sortDateLatest = (a,b)=>{
  const temp1 = new Date(a.date);
  const temp2 = new Date(b.date);
  return temp2-temp1;
}

const sortDateOldest = (a,b)=>{
  const temp1 = new Date(a.date);
  const temp2 = new Date(b.date);
  return temp1-temp2;
}

const sortMoney = (a,b)=>{
  return b.amount-a.amount;
}

function ExpenseTable({sort}) {
  const ctx = useContext(mainContext);
  
  let list;
  
  if(sort === 'highest'){
    list = ctx.expenseList.slice().sort(sortMoney);
  }
  else if(sort === 'latest'){
    list = ctx.expenseList.slice().sort(sortDateLatest);
  }
  else if(sort === 'oldest'){
    list = ctx.expenseList.slice().sort(sortDateOldest);
  }

  return (
    <ul className="ExpenseTable-list">
      <li className="ExpenseTable-listitem">
        <p>S.No</p>
        <p>Amount</p>
        <p>Date</p>
        <p>Type</p>
      </li>
      {list.map((item, i) => (
        <li className="ExpenseTable-listitem" key={item.id}>
          <p>{i+1}</p>
          <p>{item.amount}</p>
          <p>{item.date}</p>
          <p>{item.type}</p>
          <div>
            <button className="ExpenseTable-listitem-btn" onClick={()=>{
              ctx.removeExpense(item);
            }}>
              <img src={TrashcanIcon} alt="trashcan"  />
            </button>
          </div>
        </li>
      ))}
      {ctx.expenseList.length === 0 && <p className="empty-text">List is Empty</p>}
    </ul>
  );
}

export default ExpenseTable;
// <li className="ExpenseTable-listitem">
//         <p>S.No</p>
//         <p>Amount</p>
//         <p>Date</p>
//         <p>Spent On</p>
//       </li>
//       <li className="ExpenseTable-listitem">
//         <p>1</p>
//         <p>100</p>
//         <p>10 june 2022</p>
//         <p>Food</p>
//         <div>
//           <button className="ExpenseTable-listitem-btn">
//             <img src={TrashcanIcon} alt="trashcac" />
//           </button>
//         </div>
//       </li>
//       <li className="ExpenseTable-listitem">
//         <p>2</p>
//         <p>100</p>
//         <p>11 june 2022</p>
//         <p>Food</p>
//         <div>
//           <button className="ExpenseTable-listitem-btn">
//             <img src={TrashcanIcon} alt="trashcac" />
//           </button>
//         </div>
//       </li>
