import "./App.css";
import "./component/TodoInput";
import TodoInput from "./component/TodoInput";
import TodoList from "./component/TodoList";
import TodoMenu from "./component/TodoMenu";
import { useState } from "react";
import TODO_STATUS, { TITLE, TODO_MENU } from "./constants";
import remove from "lodash.remove";

function App() {
  const [todos, setTodos] = useState([]);
  const [selectedTodoStatus, setSelectedTodoStatus] = useState(TODO_MENU.ALL);

  const toggleAll = (toggleFlag) => {
    setTodos(
      todos.map((todo) => {
        todo.status = toggleFlag ? TODO_STATUS.COMPLETED : TODO_STATUS.ACTIVE;
        return todo;
      })
    );
  };

  const checkTodo = (isChecked, todoId) => {
    let todoPosition = todos.findIndex((todo) => todo.id === parseInt(todoId));
    todos[todoPosition].status = isChecked
      ? TODO_STATUS.COMPLETED
      : TODO_STATUS.ACTIVE;
    setTodos([...todos]);
  };

  const getTodoStatus = (selectedTodoStatus) => {
    setSelectedTodoStatus(selectedTodoStatus);
  };

  const clearCompletedTodo = () => {
    remove(todos, (todo) => todo.status === TODO_STATUS.COMPLETED);
    setTodos([...todos]);
  };

  return (
    <div className="TODO">
      <header id="title">
        <h1>{TITLE}</h1>
      </header>
      <div id="todo-app">
        <TodoInput
          addTodo={(newTodo) => {
            setTodos([newTodo, ...todos]);
          }}
          toggleAll={toggleAll}
          todoLength={todos.length}
        />
        <TodoList
          todos={todos}
          deleteTodo={(todoId) => {
            setTodos(todos.filter((todo) => todo.id !== todoId));
          }}
          checkTodo={checkTodo}
          todoStatus={selectedTodoStatus}
        />
        <TodoMenu
          todos={todos}
          getTodoStatus={getTodoStatus}
          selectedTodoStatus={selectedTodoStatus}
          clearCompletedTodo={clearCompletedTodo}
        />
      </div>
      <footer id="info">
        <p>Double-click to edit a todo</p>
        <p>
          Create by <a href="http://github.com/petehunt/">petehunt</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
