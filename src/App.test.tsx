import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import axios from "axios";

jest.mock("axios");

const mockedTodos = [
  { id: "1", status: "active", name: "todo1" },
  { id: "2", status: "active", name: "todo2" },
];

const setup = () => {
  (axios.get as jest.MockedFunction<typeof axios.get>)
  .mockImplementation((url: string) => {
    if (url === 'http://localhost:5000/todos') {
        return Promise.resolve({ data: {mockedTodos} });
    } else {
      return Promise.resolve();
    }
});
  render(<App />);
};

describe("App", () => {
  test("should renders APP", () => {
    setup();
    const todoTitle = screen.queryByRole("heading");
    const todoInput = screen.getByPlaceholderText("What needs to be done?");
    const todoMenu = screen.getAllByRole("link");
    const todoFooter = screen.getByRole("contentinfo");
    expect(todoTitle).toBeInTheDocument();
    expect(todoInput).toBeInTheDocument();
    expect(todoMenu.length).toBe(2);
    expect(todoFooter).toBeInTheDocument();
  });
});

describe("add todo", () => {
  test("should add a todo when name is not null and key down", async () => {
    setup();
    const todoInput: HTMLInputElement = screen.getByPlaceholderText("What needs to be done?");
    todoInput.value = "todo3"
    fireEvent.keyDown(todoInput, {
      key: "Enter",
    });
    const todoItems = screen
      .getAllByRole("listitem")
      .filter((todo) => todo.className === "todo-item");
    expect(todoItems.length).toBe(3);
  });

  test("should do not add a todo when name is null and key down", () => {
    setup();
    const todoInput = screen.getByPlaceholderText("What needs to be done?");

    fireEvent.keyDown(todoInput, {
      target: { value: "  " },
      key: "Enter",
    });
    const todoItems = screen
      .getAllByRole("listitem")
      .filter((todo) => todo.className === "todo-item");
    expect(todoItems.length).toBe(2);
  });

  test("should do not add a todo when name is not null and key down not 'enter key", () => {
    setup();
    const todoInput = screen.getByPlaceholderText("What needs to be done?");

    fireEvent.keyDown(todoInput, {
      target: { value: "todo3" },
      key: "other key",
    });
    const todoItems = screen
      .getAllByRole("listitem")
      .filter((todo) => todo.className === "todo-item");
    expect(todoItems.length).toBe(2);
  });
});

describe("delete todo", () => {
  test("should delete first todo in todo list when click destroy button", async () => {
    setup();
    const destroyButton = screen.getAllByText("×")[0];
    const li = screen
      .getAllByRole("listitem")
      .filter((todo) => todo.className === "todo-item")[0] as HTMLLIElement | any;
    fireEvent.click(destroyButton, li.key);

    const todoItems = screen
      .getAllByRole("listitem")
      .filter((todo) => todo.className === "todo-item");
    expect(todoItems.length).toBe(1);
  });
});

describe("toggle todo", () => {
  test("should toggle first todo in todo list", () => {
    setup();
    const toggleBox = screen.getAllByLabelText("")[0] as HTMLInputElement;
    fireEvent.click(toggleBox);
    expect(toggleBox.checked).toBe(true);
    fireEvent.click(toggleBox);
    expect(toggleBox.checked).toBe(false);
  });

  test("should toggle all todos checked in todo list", () => {
    setup();
    const toggleAll = screen.getByLabelText("❯") as HTMLInputElement;
    fireEvent.click(toggleAll);
    const todos = screen.getAllByLabelText("") as HTMLInputElement[];
    todos.forEach((todo) => {
      expect(todo.checked).toBe(true);
    });
  });

  test("should toggle all todos unchecked in todo list", () => {
    setup();
    const toggleAll = screen.getByLabelText("❯") as HTMLInputElement;
    fireEvent.click(toggleAll);
    fireEvent.click(toggleAll);
    const todos = screen.getAllByLabelText("") as HTMLInputElement[];
    todos.forEach((todo) => {
      expect(todo.checked).toBe(false);
    });
  });
});

describe("clear all completed todos", () => {
  test("should clear completed todos in todo list", () => {
    setup();
    const todos = screen.getAllByLabelText("");
    fireEvent.click(todos[0]);
    const clearCompletedButton = screen.getByText("Clear completed");
    fireEvent.click(clearCompletedButton);
    expect(screen.getAllByLabelText("").length).toBe(1);
    const todoList = screen
      .getAllByRole("listitem")
      .filter((li) => li.className === "todo-item");
    expect(todoList.length).toBe(1);
  });
});

describe("todo status menu", () => {
  test("should show active status todos", () => {
    setup();

    const activeButton = screen.getByText("active");
    fireEvent.click(activeButton);
    const activeTodoList = screen
      .getAllByRole("listitem")
      .filter((li) => li.className === "todo-item");
    expect(activeTodoList.length).toBe(2);
  });

  test("should show completed status todos", () => {
    render(<App />);
    const todoInput = screen.getByPlaceholderText("What needs to be done?");

    fireEvent.keyDown(todoInput, {
      target: { value: "todo1" },
      key: "Enter",
    });

    fireEvent.keyDown(todoInput, {
      target: { value: "todo2" },
      key: "Enter",
    });

    const completedButton = screen.getByText("completed");
    fireEvent.click(completedButton);
    const completedTodoList = screen
      .getAllByRole("listitem")
      .filter((li) => li.className === "todo-item");
    expect(completedTodoList.length).toBe(0);
  });
});
