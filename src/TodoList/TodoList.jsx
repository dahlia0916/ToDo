export default function TodoList({
  id,
  text,
  starttime,
  endtime,
  isfinish,
  onMenuClick,
  onFinishClick,
}) {
  return (
    <div className="todo-list-block">
      <div>
        <img
          src="/menu.png"
          alt="메뉴버튼"
          style={{ width: 24, height: 24, marginLeft: "280px" }}
          onClick={() =>
            onMenuClick({ id, text, starttime, endtime, isfinish })
          }
        ></img>
      </div>
      <div className="todo-list-text">{text}</div>
      <div className="todo-list-time">
        {starttime.toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
        {" ~ "}
        {endtime.toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, //24시간제 표기
        })}
      </div>
      <button className="todo-list-done-btn" onClick={() => onFinishClick(id)}>
        완료
      </button>
    </div>
  );
}
