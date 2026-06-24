import { useEffect, useRef, useState } from "react";
import TodoItem from "./TodoItem";
import FilterBar from "./FilterBar";
import TodoForm from "./TodoForm";

const TodoMan = () => {
const [todos, setTodos] = useState(() => {
  try {
    if (typeof window !== "undefined") {
      const savedTodos = localStorage.getItem("My-Todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    }
  } catch (error) {
    console.error("خطا در دسترسی به لوکال استوریج:", error);
    return [];
  }
  return [];
});
  const [taskText, setTaskText] = useState("");
  const [editId, setEditId] = useState(null);
  const inputRef = useRef(null);
  const [filter, setFilter] = useState("all");
  const activeCount = todos.filter((t) => !t.completed);
  const completedCount = todos.filter((t) => t.completed);

  useEffect(() => {
    localStorage.setItem("My-Todos", JSON.stringify(todos));
  },[todos]);
  const addTodo = () => {
    if (!taskText.trim()) return;
    if (editId) {
      const updateTodo = todos.map((todo) =>
        todo.id === editId ? { ...todo, title: taskText } : todo
      );
      setTodos(updateTodo);
      setEditId(null);
    } else {
      const newTodo = {
        id: Date.now().toString(),
        title: taskText,
        completed: false,
      };
      setTodos([...todos, newTodo]);
    }
    setTaskText("");
    inputRef.current.focus();
  };
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setTaskText(todo.title);
    inputRef.current.focus();
  };

  const removeTodo = (idToRemove) => {
    const updateTodo = todos.filter((todo) => todo.id !== idToRemove);
    setTodos(updateTodo);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-black ">لیست کارهای من</h1>
      <div className="flex space-x-3 justify-center">
       <FilterBar
       filter={filter}
       setfilter={setFilter}
       todos={todos}
      activeCount={activeCount}
      completedCount={completedCount}
     
       />
       <TodoForm
       taskText={taskText}
       setTaskText={setTaskText}
       addTodo={addTodo}
       editId={editId}
       inputRef={inputRef}
       />


      </div>
      <ul className="flex flex-wrap gap-5 w-10/12 mx-auto">
        {filteredTodos.map((todo) => (
          <TodoItem
          toggleTodo={toggleTodo}
          todo={todo}
          startEdit={startEdit}
          removeTodo={removeTodo}
          />
        ))}
      </ul>
    </div>
  );
};
export default TodoMan;
