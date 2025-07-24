import { useState } from "react";
export default function GrowPot() {
    const [isWatered, setIsWatered] = useState(false);

    const handleWaterClick = () => {
        if (!isWatered) setIsWatered(true);
    };
    return (
        <div
            style={{
                position: "relative",
            }}
        >
            <img
                src="/pot_1.png"
                alt="화분"
                style={{
                    width: "27%",
                    height: "27%",
                    marginLeft: "37%",
                    marginTop: "20%",
                }}
            />
            <button
                className="pot-water-button"
                onClick={handleWaterClick}
                disabled={isWatered}
            >
                물주기
            </button>
        </div>
    );
}
