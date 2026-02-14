"use client";

import { api } from "~/trpc/react";

export default function TodoPage() {
  const { data: todos, isLoading } = api.todo.getAll.useQuery();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-4xl font-bold">Todo Page</h1>
        <div className="w-full max-w-md bg-white/10 p-6 rounded-xl">
          <h2 className="text-2xl mb-4">Todo List</h2>
          {isLoading ? (
            <p>Loading todos...</p>
          ) : todos ? (
            <ul className="mb-4 space-y-2">
              {todos.map((todo) => (
                <li key={todo.id} className="p-2 bg-white/20 rounded">
                  {todo.title}
                </li>
              ))}
            </ul>
          ) : (
            <p>No todos found</p>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add new todo..."
              className="flex-1 px-3 py-2 rounded bg-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}