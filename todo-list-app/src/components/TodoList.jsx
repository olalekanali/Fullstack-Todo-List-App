import { TodoItem } from './TodoItem';

export function TodoList({ todos, onToggle, onDelete }) {
  if (!todos.length) return <p className="empty-msg">All Done For Today!</p>;

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}