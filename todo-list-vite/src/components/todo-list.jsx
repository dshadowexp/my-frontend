import Todo from "./todo.jsx";

export default function TodoList({ todos, completeTodo, editTodo, removeTodo }) {
    return (<div className="todo__list">
        {
            todos.length === 0
            ?
            <p className="todo__list__empty">No ToDos...</p>
            :
            todos.map((todo) => 
                <Todo 
                    key={todo._id} 
                    todo={todo}
                    complete={(e) => {completeTodo(todo._id)}}
                    edit={(e) => {editTodo(todo._id)}}
                    remove={(e) => {removeTodo(todo._id)}} 
                />
            )
        }
    </div>);
}