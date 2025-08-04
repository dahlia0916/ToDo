import Slider from "react-slick";
import TodoList from "./TodoList";
import FinishList from "./FinishTodoList";
export default function TodoListRow({
  todoList,
  onMenuClick,
  onFinishClick,
  isFinished,
}) {
  const filteredTodos = todoList.filter((todo) =>
    isFinished ? todo.isfinish : !todo.isfinish
  ); //리스트에서 완료된건지 아닌건지 필터링
  const ListComponent = isFinished ? FinishList : TodoList; //완료된 리스트인지 기본 리스트인지 결정
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  };

  if (filteredTodos.length >= 4) {
    return (
      <div style={{ margin: "30px 0 0 80px", gap: "32px" }}>
        <Slider {...settings}>
          {filteredTodos.map((todo) => (
            <ListComponent
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
        </Slider>
      </div>
    );
  } else {
    return (
      <div className="todo-list-row">
        {filteredTodos.map((todo) => (
          <ListComponent
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
}
