
import { useState } from "react";

const OnlineTodos = () => {
  const [todo, setTodo] = useState(null);
  const fetchTodo = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        if (!response.ok) {
            throw new Error('خطا در دریافت داده ها از سرور');
        }                   const data = await response.json(); 
        setTodo(data);                                      
    } catch (error) {
        console.error('خطا در دریافت داده ها:', error);             
  }};   
  return (
    <div>
      <button onClick={fetchTodo} className="px-2 py-2 rounded-sm bg-zinc-700 text-white">
        گرفتن اطلاعات از سرور مجازی
      </button>
      {todo && <p>{todo.title}</p>}
      {todo && <p>شماره تسک : {todo.id}</p> }
      {todo && <p>وضعیت تسک : {todo.completed ? 'تکمیل شده' : 'تکمیل نشده'}</p> }
    </div>
  );
} ;

export default OnlineTodos
