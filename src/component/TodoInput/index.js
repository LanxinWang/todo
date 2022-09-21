import React from "react";
import "./index.css";
import TODO_STATUS, { ENTER_KEY } from "../../constants";

let todoId = 0;

const TodoAdd = ({ addTodo, toggleAll, todoLength }) => {
  const handleCheck = ({ target }) => {
    toggleAll(target.checked);
  };

  const handleOnKeyDown = (event) => {
    let content = event.target.value.trim();
    if (event.keyCode === ENTER_KEY && content !== "") {
      let newTodo = {
        id: todoId++,
        status: TODO_STATUS.ACTIVE,
        content,
      };
      addTodo(newTodo);
      event.target.value = "";
    }
  };

  return (
    <div id="add-todo">
      <input id="toggle-all" type="checkbox" onChange={handleCheck} />
      <label
        htmlFor="toggle-all"
        style={{ visibility: todoLength > 0 ? "visible" : "hidden" }}
      >
        ❯
      </label>
      <input
        id="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={handleOnKeyDown}
      ></input>
    </div>
  );
};

export default TodoAdd;
