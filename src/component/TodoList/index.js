import React from "react";
import TODO_STATUS, { TODO_MENU } from "../../constants";
import "./index.css";

function TodoList({ todos, deleteTodo, checkTodo, selectedTodoStatusOption }) {
  const TodosByStatusOption = () => {
    if (selectedTodoStatusOption === TODO_MENU.ALL) {
      return todos;
    }
    return todos.filter((todo) => todo.status === selectedTodoStatusOption);
  };

  return (
    <div id="show-todo">
      <ul id="todo-list">
        {TodosByStatusOption().map((todo) => (
          <li key={todo.id}>
            <div className="todo-item">
              <input
                className="toggle"
                type="checkbox"
                id={todo.id}
                onChange={(event) => {
                  checkTodo(event.target.checked, event.target.id);
                }}
                checked={todo.status === TODO_STATUS.ACTIVE ? false : true}
              />
              <label htmlFor={todo.id} />
              <p className={todo.status}>{todo.content}</p>
              <button className="destroy" onClick={() => deleteTodo(todo.id)}>
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
