import { useEffect, useState } from "react";

export default function ShakePopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    async function requestPermissionIfNeeded() {
      if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof DeviceMotionEvent.requestPermission === "function"
      ) {
        try {
          const state = await DeviceMotionEvent.requestPermission();
          if (state === "granted") {
            setPermissionGranted(true);
          } else {
            console.warn("Permesso movimento negato.");
          }
        } catch (err) {
          console.error("Errore richiesta permesso:", err);
        }
      } else {
        setPermissionGranted(true); // Android o browser non iOS
      }
    }

    requestPermissionIfNeeded();
  }, []);

  useEffect(() => {
    if (!permissionGranted) return;

    let lastShake = 0;

    function handleShake(event) {
      const { x, y, z } = event.accelerationIncludingGravity || {};
      if (x == null || y == null || z == null) return;

      const total = Math.abs(x) + Math.abs(y) + Math.abs(z);
      const now = Date.now();

      if (total > 100 && now - lastShake > 1000) {
        lastShake = now;
        setShowPopup(true);
      }
    }

    window.addEventListener("devicemotion", handleShake);
    return () => {
      window.removeEventListener("devicemotion", handleShake);
    };
  }, [permissionGranted]);

  return (
    <>
      {showPopup && (
        <div className="shake-popup">
          <p>📳 Non ti agitare</p>
          <button onClick={() => setShowPopup(false)}>Chiudi</button>
        </div>
      )}
    </>
  );
}
