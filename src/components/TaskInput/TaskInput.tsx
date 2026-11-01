
import { Plus } from 'lucide-react';
import './TaskInput.css';

type TaskInputProps = {
  onAdd: (title: string) => void;
};

export function TaskInput({ onAdd }: TaskInputProps) {
  return (
    <form
      className="task-input"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const title = String(formData.get('title') ?? '').trim();

        if (!title) return;

        onAdd(title);
        event.currentTarget.reset();
      }}
    >
      <input
        className="task-input__field"
        type="text"
        name="title"
        placeholder="What needs to be done?"
        aria-label="New task"
        maxLength={200}
      />

      <button className="task-input__button" type="submit">
        <Plus size={18} />
        <span>Add task</span>
      </button>
    </form>
  );
}
