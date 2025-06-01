import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

export function AddTodo({ onAdd }) {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    onAdd(task);
    setTask('');
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-input"
        placeholder="Add a new task..."
        value={task}
        onChange={e => setTask(e.target.value)}
      />
      <button type="submit" className="add-button">
        <AiOutlinePlus size={20} />
      </button>
    </form>
  );
}
