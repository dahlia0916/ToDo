import "./App.css";
import TodoHeader from "./TodoList/TodoHeader";
import TodoListRow from "./TodoList/TodoListRow";
import { useState } from "react";
import AddTodoList from "./TodoList/AddTodoList";
import EditDelTodoList from "./TodoList/EditDelTodoList";
import GrowPot from "./Pot/GrowPot";

function App() {
    const [todoList, setTodoList] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const activeTodoCount = todoList.filter((todo) => !todo.isfinish).length;

    console.log(todoList);
    const handleMenuClick = (todoList) => setEditTarget(todoList);

    const handleAddTodo = (newTodo) => {
        setTodoList([...todoList, newTodo]); //...복사후 새로 추가
        setShowAddModal(false);
    };
    const handleFinishTodo = (id) => {
        setTodoList((todoList) =>
            todoList.map((todo) =>
                todo.id === id ? { ...todo, isfinish: true } : todo
            )
        );
    };
    const handleUpdateTodo = (updated) => {
        setTodoList((todoList) =>
            todoList.map((todo) =>
                todo.id === updated.id ? { ...todo, ...updated } : todo
            )
        );
        setEditTarget(null);
    };

    const handleDeleteTodo = (id) => {
        setTodoList((todoList) => todoList.filter((todo) => todo.id !== id));
        setEditTarget(null);
    };
    return (
        <div className="background">
            <TodoHeader onAddClick={() => setShowAddModal(true)}></TodoHeader>
            {activeTodoCount === 0 ? (
                <div>
                    <div className="basic-text">
                        + 버튼을 눌러 할 일을 추가해보세요!
                    </div>
                    <GrowPot></GrowPot>
                </div>
            ) : (
                <div>
                    <TodoListRow
                        todoList={todoList}
                        onMenuClick={handleMenuClick}
                        onFinishClick={handleFinishTodo}
                    ></TodoListRow>
                    <GrowPot></GrowPot>
                </div>
            )}
            {showAddModal && ( // + 버튼을 눌렀을때
                <AddTodoList
                    onAdd={handleAddTodo}
                    onClose={() => setShowAddModal(false)}
                />
            )}
            {editTarget && ( //메뉴 버튼을 눌렀을때
                <EditDelTodoList
                    {...editTarget}
                    onUpdate={handleUpdateTodo}
                    onDelete={handleDeleteTodo}
                    onClose={() => setEditTarget(null)}
                />
            )}
        </div>
    );
}

export default App;
