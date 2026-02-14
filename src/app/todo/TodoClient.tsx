"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export default function TodoClient() {
  const { data: todos, isLoading, refetch } = api.todo.getAll.useQuery();
  const { mutate: createTodo } = api.todo.create.useMutation({
    onSuccess: () => {
      void refetch(); // Refresh the list after adding a new todo
    },
  });

  const { mutate: toggleTodo } = api.todo.toggle.useMutation({
    onSuccess: () => {
      void refetch(); // Refresh the list after toggling
    },
  });

  const { mutate: deleteTodo } = api.todo.delete.useMutation({
    onSuccess: () => {
      void refetch(); // Refresh the list after deleting
    },
  });

  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      createTodo({ title: newTodo.trim() });
      setNewTodo("");
    }
  };

  const handleToggleTodo = (id: string, completed: boolean) => {
    toggleTodo({ id, completed: !completed });
  };

  return (
    <div className="w-full max-w-md bg-white/10 p-6 rounded-xl">
      <h2 className="text-2xl mb-4">Todo List</h2>
      {isLoading ? (
        <p>Loading todos...</p>
      ) : todos && todos.length > 0 ? (
        <ul className="mb-4 space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`p-2 bg-white/20 rounded flex justify-between items-center ${todo.completed ? 'opacity-70 line-through' : ''
                }`}
            >
              <span
                onClick={() => handleToggleTodo(todo.id, todo.completed)}
                className="cursor-pointer flex-1"
              >
                {todo.title}
              </span>
              <button
                onClick={() => deleteTodo({ id: todo.id })}
                className="ml-2 text-red-400 hover:text-red-300"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No todos found</p>
      )}
      <form onSubmit={handleAddTodo} className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo..."
          className="flex-1 px-3 py-2 rounded bg-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
        >
          Add
        </button>
      </form>
    </div>
  );
}