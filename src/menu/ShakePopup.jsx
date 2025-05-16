import { useEffect, useState } from "react";

export default function ShakePopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    if (!permissionGranted) return;

    let lastShake = 0;

    function handleShake(event) {
      const { x, y, z } = event.accelerationIncludingGravity || {};
      if (x === null || y === null || z === null) return;

      const total = Math.abs(x) + Math.abs(y) + Math.abs(z);
      const now = Date.now();

      if (total > 15 && now - lastShake > 1000) {
        lastShake = now;
        setShowPopup(true);
      }
    }

    window.addEventListener("devicemotion", handleShake);
    return () => {
      window.removeEventListener("devicemotion", handleShake);
    };
  }, [permissionGranted]);

  function enableMotion() {
    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      DeviceMotionEvent.requestPermission()
        .then((state) => {
          if (state === "granted") {
            setPermissionGranted(true);
          } else {
            alert("Permesso negato.");
          }
        })
        .catch(console.error);
    } else {
      setPermissionGranted(true); // Android o non iOS
    }
  }

  return (
    <>
      {!permissionGranted && (
        <button className="shake-enable-button" onClick={enableMotion}>
          📳 Abilita movimento
        </button>
      )}

      {showPopup && (
        <div className="shake-popup">
          <p>📳 Hai agitato il telefono!</p>
          <button onClick={() => setShowPopup(false)}>Chiudi</button>
        </div>
      )}
    </>
  );
}
