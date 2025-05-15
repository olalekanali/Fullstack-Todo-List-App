import { useState, useEffect } from 'react';
import axios from 'axios';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch from backend
    axios.get('http://localhost:5000/api/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);

  const addTodo = (text) => {
    axios.post('http://localhost:5000/api/todos', { text })
      .then(res => setTodos([...todos, res.data]))
      .catch(err => console.error(err));
  };

  const toggleTodo = (id) => {
    const todo = todos.find(t => t._id === id);
    axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !todo.completed })
      .then(res => setTodos(todos.map(t => t._id === id ? res.data : t)))
      .catch(err => console.error(err));
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
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