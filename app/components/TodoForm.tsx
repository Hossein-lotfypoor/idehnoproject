const TodoForm = ({ taskText, setTaskText, addTodo, editId, inputRef }) => {
    return(
        <div>
            
        <input
          ref={inputRef}
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyDown={(e) => {
            e.key === "Enter" && addTodo();
          }}
          className="border px-2 py-2 rounded-sm "
          type="text"
          placeholder={`${editId ? "ویرایش کار" : "افزودن کار جدید"}`}
        />
        <button
          onClick={addTodo}
          className="px-2 py-2 rounded-sm bg-zinc-600 text-white hover:scale-105 transition duration-300 hover:cursor-pointer"
        >
          {editId ? "ثبت تغییرات" : "اضافه کردن"}
        </button>

        </div>
    )
}

export default TodoForm;