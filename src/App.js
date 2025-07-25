import "./App.css";
import TodoHeader from "./TodoList/TodoHeader";
import TodoListRow from "./TodoList/TodoListRow";
import { useState, useEffect } from "react";
import AddTodoList from "./TodoList/AddTodoList";
import EditDelTodoList from "./TodoList/EditDelTodoList";
import GrowPot from "./Pot/GrowPot";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "./FireBase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
function App() {
  const [todoList, setTodoList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const activeTodoCount = todoList.filter((todo) => !todo.isfinish).length;
  const [user, setUser] = useState(null);
  const [lastWatered, setLastWatered] = useState(null);
  const [waterCount, setWaterCount] = useState(0);

  const savePotStatus = async (uid, lastWatered, waterCount) => {
    const potRef = doc(db, "users", uid, "potStatus", "main");
    await setDoc(potRef, { lastWatered, waterCount });
  };

  const fetchPotStatus = async (uid) => {
    const potRef = doc(db, "users", uid, "potStatus", "main");
    const docSnap = await getDoc(potRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        lastWatered: data.lastWatered ?? null,
        waterCount: data.waterCount ?? 0,
      };
    } else {
      return { lastWatered: null, waterCount: 0 };
    }
  };

  console.log(todoList);
  const handleMenuClick = (todoList) => setEditTarget(todoList);

  const fetchTodos = async (uid) => {
    const todosRef = collection(db, "users", uid, "todos");
    const snapshot = await getDocs(todosRef);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        starttime: new Date(data.starttime), //읽어올때 Date객체로 변환
        endtime: new Date(data.endtime),
      };
    });
  };
  const addTodoToFirestore = async (uid, todo) => {
    const todosRef = collection(db, "users", uid, "todos");
    await addDoc(todosRef, todo);
  };

  const handleAddTodo = async (newTodo) => {
    if (!user) return;
    await addTodoToFirestore(user.uid, newTodo);
    const updatedTodos = await fetchTodos(user.uid);
    setTodoList(updatedTodos);
    setShowAddModal(false);
  };
  const updateTodoInFirestore = async (uid, todoId, updatedTodo) => {
    const todoRef = doc(db, "users", uid, "todos", todoId);
    const { id, ...fields } = updatedTodo;
    await updateDoc(todoRef, fields);
  };
  const handleUpdateTodo = async (updated) => {
    //수정 버튼
    if (!user) return;
    await updateTodoInFirestore(user.uid, updated.id, updated);
    const updatedTodos = await fetchTodos(user.uid);
    setTodoList(updatedTodos);
    setEditTarget(null);
  };
  const finishTodoInFirestore = async (uid, todoId) => {
    const todoRef = doc(db, "users", uid, "todos", todoId);
    await updateDoc(todoRef, { isfinish: true });
  };

  const handleFinishTodo = async (id) => {
    //완료버튼
    if (!user) return;
    await finishTodoInFirestore(user.uid, id);
    const updatedTodos = await fetchTodos(user.uid);
    setTodoList(updatedTodos);
  };

  const deleteTodoFromFirestore = async (uid, todoId) => {
    const todoRef = doc(db, "users", uid, "todos", todoId);
    await deleteDoc(todoRef);
  };
  const handleDeleteTodo = async (id) => {
    if (!user) return;
    await deleteTodoFromFirestore(user.uid, id);
    const updatedTodos = await fetchTodos(user.uid);
    setTodoList(updatedTodos);
    setEditTarget(null);
  };
  const handleGoogleSign = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((data) => {
        setUser(data.user);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (user) {
      fetchTodos(user.uid).then((list) => {
        setTodoList(list);
        console.log("현재 유저의 todoList:", list);
      });
      fetchPotStatus(user.uid).then(({ lastWatered, waterCount }) => {
        setLastWatered(lastWatered);
        setWaterCount(waterCount);
        console.log(waterCount);
      });
    } else {
      setTodoList([]); // 로그아웃 등 user가 없을 때 초기화
      setLastWatered(null);
      setWaterCount(0);
    }
  }, [user]);
  const handleWaterPot = async (newLastWatered, newWaterCount) => {
    if (!user) return;
    setLastWatered(newLastWatered);
    setWaterCount(newWaterCount);
    await savePotStatus(user.uid, newLastWatered, newWaterCount);
  };
  return (
    <div className="background">
      <div className="login-area">
        {!user ? (
          <button onClick={handleGoogleSign} className="login-btn">
            Login with Google
          </button>
        ) : (
          <span className="user-info">
            {user.displayName || user.email} 정원사님
          </span>
        )}
      </div>
      <TodoHeader onAddClick={() => setShowAddModal(true)}></TodoHeader>
      {activeTodoCount === 0 ? (
        <div>
          <div className="basic-text">+ 버튼을 눌러 할 일을 추가해보세요!</div>
          <GrowPot
            lastWatered={lastWatered}
            waterCount={waterCount}
            onWater={handleWaterPot}
          />
        </div>
      ) : (
        <div>
          <TodoListRow
            todoList={todoList}
            onMenuClick={handleMenuClick}
            onFinishClick={handleFinishTodo}
          ></TodoListRow>
          <GrowPot
            lastWatered={lastWatered}
            waterCount={waterCount}
            onWater={handleWaterPot}
          />
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
