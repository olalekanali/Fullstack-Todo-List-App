import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

export function AddTodo({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-input"
        placeholder="Add a new task..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type="submit" className="add-button">
        <AiOutlinePlus size={20} />
      </button>
    </form>
  );
}