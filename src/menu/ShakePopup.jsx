import { useEffect, useState } from "react";

export default function ShakePopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let lastShake = 0;

    function handleShake(event) {
      const { x, y, z } = event.accelerationIncludingGravity;
      const total = Math.abs(x) + Math.abs(y) + Math.abs(z);
      const now = Date.now();

      if (total > 25 && now - lastShake > 1000) {
        lastShake = now;
        setShowPopup(true);
      }
    }

    function enableMotion() {
      if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission()
          .then(permission => {
            if (permission === "granted") {
              window.addEventListener("devicemotion", handleShake);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener("devicemotion", handleShake);
      }
    }

    enableMotion();

    return () => {
      window.removeEventListener("devicemotion", handleShake);
    };
  }, []);

  return (
    <>
      {showPopup && (
        <div className="shake-popup">
          <p>📳 Hai agitato il telefono!</p>
          <button onClick={() => setShowPopup(false)}>Chiudi</button>
        </div>
      )}
    </>
  );
}
