import { useState, useEffect } from 'react';
import axios from 'axios';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch from backend
    axios.get(`${import.meta.env.BACKEND_URL}/api/todos`)
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);

  const addTodo = (text) => {
    axios.post(`${import.meta.env.BACKEND_URL}/api/todos`, { text })
      .then(res => setTodos([...todos, res.data]))
      .catch(err => console.error(err));
  };

  const toggleTodo = (id) => {
    const todo = todos.find(t => t._id === id);
    axios.put(`${import.meta.env.BACKEND_URL}/api/todos/${id}`, { completed: !todo.completed })
      .then(res => setTodos(todos.map(t => t._id === id ? res.data : t)))
      .catch(err => console.error(err));
  };

  const deleteTodo = (id) => {
    axios.delete(`${import.meta.env.BACKEND_URL}/api/todos/${id}`)
      .then(() => setTodos(todos.filter(t => t._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Todo List App</h1>
      <AddTodo onAdd={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}

export default App;