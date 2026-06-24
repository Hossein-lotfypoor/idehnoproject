import { useEffect, useState } from "react";

const ExpenstApp = () => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState('');
  
  const [expenses, setExpenses] = useState(() => {
    try {      if (typeof window !== "undefined") {
        const savedExpenses = localStorage.getItem("My-Expenses");
        return savedExpenses ? JSON.parse(savedExpenses) : [];
      }   } catch (error) {
      console.error("خطا در دسترسی به لوکال استوریج:", error);

    }       return [];      
  }

  )

  useEffect(() => {
    localStorage.setItem("My-Expenses", JSON.stringify(expenses));
  },[expenses]);

  const addExpense = () => {
    if(!expenseName.trim() || !expenseAmount) return;
    const newExpense = {
        id :Date.now().toString(),
        expenseName,
        expenseAmount
    }
    setExpenses([...expenses,newExpense]);
    setExpenseName('');
    setExpenseAmount('');
  }
  
  const totalAmount =expenses.reduce((total, item) => {
    return total + item.expenseAmount
  },0)

  const totalItems = expenses.reduce((total, item) => {
    return total + 1 
  },0)

  const removeExpense = (idToRemove) => {
    const updatedExpenses = expenses.filter ((expense) => (
      expense.id !== idToRemove 
    ))
    setExpenses(updatedExpenses)
  }

  return (
    <div className="flex flex-col space-y-6">
      <h2>لیست مخارج روزانه</h2>
      <div className="flex items-center justify-center space-x-4 ">
        <div className="flex items-center justify-center space-x-3 *:border *:px-2 *:py-2 *:rounded-sm">
          <input
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            placeholder="نام هزینه"
            type="text"
          />
          <input
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(parseInt(e.target.value) || 0)}
          placeholder="مبلغ هزینه" type="number" />
        </div>
        <button onClick={addExpense} className="px-2 py-2 rounded-sm bg-red-600 text-white" >اضافه کردن هزینه</button>
      </div>
      <ul className="flex flex-wrap w-5/6 mx-auto space-x-4 *:px-2 *:py-4 *:rounded-lg *:border *:border-purple-600 ">
        {expenses.map((expense) => (
            <li className="flex items-center justify-center space-x-2" key={expense.id}>
               <p> {expense.expenseName} : {expense.expenseAmount} تومان</p>
           <span onClick={() => removeExpense(expense.id)} className="px-1 py-1 rounded-sm bg-red-600 text-white">حذف هزینه</span>
            </li>
        ))}
      </ul>
      <h3 className=" w-1/6 mx-auto px-2 py-2 rounded-sm bg-blue-700 text-white ">مجموع هزینه ها:  {totalAmount}  تومان</h3>
      <h2 className=" w-1/6 mx-auto px-2 py-2 rounded-sm bg-zinc-700 text-white ">تعداد کل هزینه ها :  {totalItems}</h2>
    </div>
  );
};

export default ExpenstApp;
