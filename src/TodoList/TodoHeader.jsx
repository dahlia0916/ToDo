export default function TodoHeader({ onAddClick }) {
  function AddButton({ onClick }) {
    return (
      <div className="add-button" onClick={onClick}>
        +
      </div>
    );
  }

  return (
    <div className="todo-header">
      <div className="todo-header-row">
        <div className="todo-title">TODO</div>
        <AddButton onClick={onAddClick} />
      </div>
      <div className="todo-header-underline" />
    </div>
  );
}
