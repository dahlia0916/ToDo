import { useCallback } from "react";
export default function GrowPot({ lastWatered, waterCount, onWater }) {
  const THREE_HOURS = 3 * 60 * 60 * 1000; //3시간
  const canWater = !lastWatered || Date.now() - lastWatered > THREE_HOURS;

  const handleWaterClick = useCallback(() => {
    if (canWater) {
      const newLastWatered = Date.now();
      const newWaterCount = (waterCount ?? 0) + 1;
      onWater(newLastWatered, newWaterCount);
      alert("물을 주었습니다!");
    } else {
      const minLeft = Math.ceil(
        (THREE_HOURS - (Date.now() - lastWatered)) / 60000
      );
      alert(`${minLeft}분 후에 다시 물을 줄 수 있어요!`);
    }
  }, [canWater, lastWatered, onWater, waterCount]);
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
        disabled={!canWater}
      >
        물주기
      </button>
    </div>
  );
}
