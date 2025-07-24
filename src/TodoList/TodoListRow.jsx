import TodoList from "./TodoList";
export default function TodoListRow({ todoList, onMenuClick, onFinishClick }) {
    return (
        <div className="todo-list-row">
            {todoList
                .filter((todo) => !todo.isfinish) //완료되지 않은 것만
                .map((todo) => (
                    <TodoList
                        key={todo.id}
                        id={todo.id}
                        text={todo.text}
                        starttime={todo.starttime}
                        endtime={todo.endtime}
                        isfinish={todo.isfinish}
                        onMenuClick={onMenuClick}
                        onFinishClick={onFinishClick}
                    />
                ))}
        </div>
    );
}
