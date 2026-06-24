const TodoItem = ({toggleTodo,removeTodo,startEdit,todo}) => {
  return (
    <>
     
          <li
            className="flex space-x-2  px-4 py-4 rounded-lg bg-purple-800 text-white"
            key={todo.id}
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              className={`cursor-pointer ${todo.completed ? "line-through" : ""}`}
            >
              {todo.title}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}
              className="px-1 py-1 rounded-xs bg-red-600"
            >
              حذف کار
            </button>
            <button
              onClick={() => startEdit(todo)}
              className="px-1 py-1 rounded-sm bg-green-600 text-white"
            >
              ویرایش
            </button>
          </li>
      
    </>
  );
};

export default TodoItem;
