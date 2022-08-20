import Dixie from "dexie";

const ExpenseDb = new Dixie("expenseDb");

ExpenseDb.version(1).stores({
  list: "id,amount,date,type",
});

export const addExpenseListItemDb = async (obj) => {
  try {
    const id = await ExpenseDb.list.add({
      id: obj.id,
      amount: obj.amount,
      type: obj.type,
      date: obj.date,
    });
    console.log(id);
  } catch (err) {
    throw(err)
  }
};

export const removeExpenseListItemDb = async (obj) => {
  try {
    await ExpenseDb.list.delete(obj.id);
  } catch (err) {
    throw(err)
  }
};

export const getAllDataFromListDb = async () => {
  try {
    const data = await ExpenseDb.list.toArray();
    return data;
  } catch (err) {
    throw(err)
  }
};


export default ExpenseDb;
