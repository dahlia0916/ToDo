import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditDelTodoList({
    id,
    text: origText,
    starttime: origStart,
    endtime: origEnd,
    isfinish,
    onUpdate,
    onDelete,
    onClose,
}) {
    const [text, setText] = useState(origText);
    const [startTime, setStartTime] = useState(origStart);
    const [endTime, setEndTime] = useState(origEnd);

    const handelUpdateClick = () => {
        if (!text.trim()) return;
        onUpdate({
            id,
            text,
            starttime: startTime,
            endtime: endTime,
            isfinish,
        });
        onClose();
    };

    // 삭제 버튼 클릭
    const handleDeleteClick = () => {
        onDelete(id);
        onClose();
    };

    return (
        <div className="add-modal-overlay">
            <div className="add-modal">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handelUpdateClick();
                    }}
                >
                    {" "}
                    <div className="add-modal-row">
                        <input
                            id="edit-text-input"
                            className="add-text-input"
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="할 일 수정"
                        />
                    </div>
                    <div className="add-modal-row">
                        <DatePicker
                            selected={startTime}
                            onChange={setStartTime}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="시작"
                            dateFormat="HH:mm"
                        />
                        ~
                        <DatePicker
                            selected={endTime}
                            onChange={setEndTime}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="종료"
                            dateFormat="HH:mm"
                        />
                    </div>
                    <div className="add-modal-row">
                        <button type="submit">수정완료</button>

                        <button type="button" onClick={onClose}>
                            닫기
                        </button>
                        <button
                            type="button"
                            onClick={handleDeleteClick}
                            style={{ background: "#ffe3e3" }}
                        >
                            삭제
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
