const FilterBar = ({filter,setFilter,activeCount,completedCount,todos}) => {
    return(
        <div className="flex space-x-2 items-center justify-center *:px-2 *:py-2 *:rounded-sm *:bg-zinc-400 *:hover:scale-105 *:hover:cursor-pointer *:transition *:duration-300 ">
          <button onClick={() => setFilter("all")}>همه({todos.length})</button>
          <button onClick={() => setFilter("completed")}>انجام شده({completedCount.length})</button>
          <button onClick={() => setFilter("active")}>درجریان({activeCount.length})</button>
        </div>
    )
}

export default FilterBar;