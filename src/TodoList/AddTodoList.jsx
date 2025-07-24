import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddTodoList({ onAdd, onClose }) {
    const [text, setText] = useState("");
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd({
            id: Date.now(),
            text,
            starttime: startTime,
            endtime: endTime,
            isfinish: false,
        });
        setText("");
        setStartTime(new Date());
        setEndTime(new Date());
    };

    return (
        <div className="add-modal-overlay">
            <div className="add-modal">
                <form onSubmit={handleSubmit}>
                    <div
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: "600",
                            margin: "0 0 5px 18px",
                        }}
                    >
                        {" "}
                        TODO
                    </div>

                    <div className="add-modal-row">
                        <input
                            id="add-text-input"
                            type="text"
                            placeholder="할 일 입력"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <div className="add-modal-row">
                        {" "}
                        <DatePicker
                            selected={startTime}
                            onChange={(date) => setStartTime(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                        />
                        ~
                        <DatePicker
                            selected={endTime}
                            onChange={(date) => setEndTime(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                        />
                    </div>
                    <div className="add-modal-row">
                        {" "}
                        <button type="submit">추가</button>
                        <button type="button" onClick={onClose}>
                            닫기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
