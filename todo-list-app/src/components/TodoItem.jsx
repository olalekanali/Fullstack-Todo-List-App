import { AiOutlineDelete, AiOutlineCheckSquare, AiOutlineBorder } from 'react-icons/ai';

export function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <button className="toggle-btn" onClick={() => onToggle(todo._id)}>
        {todo.completed
          ? <AiOutlineCheckSquare size={24} />
          : <AiOutlineBorder size={24} />
        }
      </button>
      <span className="todo-text">{todo.task}</span>
      <button className="delete-btn" onClick={() => onDelete(todo._id)}>
        <AiOutlineDelete size={20} />
      </button>
    </li>
  );
}

