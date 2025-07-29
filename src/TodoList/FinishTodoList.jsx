export default function FinishList({
  id,
  text,
  starttime,
  endtime,
  isfinish,
  onMenuClick,
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
      <div className="finish-list-text">{text}</div>
      <div style={{ display: "flex" }}>
        {" "}
        <div className="finish-list-time">
          {/* {starttime.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
          {" ~ "} */}
          {endtime.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </div>
        <div className="finish-list-time">
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
      </div>
    </div>
  );
}
