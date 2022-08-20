import React, { useRef, useContext } from "react";
import mainContext from "../context/context";

const todayDate = Intl.DateTimeFormat("en-us", {
  month: "2-digit",
  year: "numeric",
  day: "2-digit",
})
  .format(Date.now())
  .split("/");
const defaultDate = `${todayDate[2]}-${todayDate[0]}-${todayDate[1]}`;


function ExpenseForm() {
  const formRef = useRef();
  const ctx = useContext(mainContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(formRef.current));
    form.id = Date.now();
    form.date = Intl.DateTimeFormat("en-us", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }).format(new Date(form.date));
    form.amount = Number(form.amount);
    ctx.addExpenseList(form);
    formRef.current.reset();
  };

  return (
    <form className="ExpenseForm" ref={formRef} onSubmit={onSubmitHandler}>
      <input
        required={true}
        type="number"
        placeholder="Amount"
        className="input"
        name="amount"
        min={1}
      />
      <input
        required={true}
        type="date"
        defaultValue={defaultDate}
        name="date"
        className="input"
      />
      <select className="input" name="type">
        <option value="Food">Food</option>
        <option value="Medicine">Medicine</option>
        <option value="Travelling">Travelling</option>
        <option value="Education">Education</option>
        <option value="Others">Others</option>
      </select>
      <button className="btn">Add</button>
    </form>
  );
}

export default ExpenseForm;
