const video = document.getElementById("video");
const canvas = document.getElementById("output");
const ctx = canvas.getContext("2d");
const statusDiv = document.getElementById("status");

const connections = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [0, 9], [9, 10], [10, 11], [11, 12],
  [0, 13], [13, 14], [14, 15], [15, 16],
  [0, 17], [17, 18], [18, 19], [19, 20]
];

const hands = new Hands({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.6,
  minTrackingConfidence: 0.6
});

hands.onResults(onResults);

const camera = new Camera(video, {
  onFrame: async () => {
    await hands.send({ image: video });
  },
  width: 640,
  height: 480
});
camera.start();

function angle(a, b, c) {
  const ab = { x: a.x - b.x, y: a.y - b.y };
  const cb = { x: c.x - b.x, y: c.y - b.y };
  const dot = ab.x * cb.x + ab.y * cb.y;
  const cross = ab.x * cb.y - ab.y * cb.x;
  return Math.atan2(cross, dot);
}

function isFingerExtended(base, mid, tip) {
  const ang = Math.abs(angle(base, mid, tip));
  const deg = ang * (180 / Math.PI);
  return deg > 100;
}

function classifyHand(landmarks) {
  const fingers = [
    { base: 5, mid: 6, tip: 8 },
    { base: 9, mid: 10, tip: 12 },
    { base: 13, mid: 14, tip: 16 },
    { base: 17, mid: 18, tip: 20 }
  ];

  let extendedCount = 0;
  for (const f of fingers) {
    if (isFingerExtended(landmarks[f.base], landmarks[f.mid], landmarks[f.tip])) {
      extendedCount++;
    }
  }

  const thumbExtended = landmarks[4].x > landmarks[3].x + 0.02;
  const totalExtended = extendedCount + (thumbExtended ? 1 : 0);

  if (totalExtended >= 5) return "OPEN";
  if (totalExtended <= 1) return "CLOSED";
  return "PARTIAL";
}

function onResults(results) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (results.multiHandLandmarks.length > 0) {
    const landmarks = results.multiHandLandmarks[0];

    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-canvas.width, 0);

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#00bfff";
    for (const [i, j] of connections) {
      ctx.beginPath();
      ctx.moveTo(landmarks[i].x * canvas.width, landmarks[i].y * canvas.height);
      ctx.lineTo(landmarks[j].x * canvas.width, landmarks[j].y * canvas.height);
      ctx.stroke();
    }

    ctx.fillStyle = "#ff0000";
    for (const lm of landmarks) {
      ctx.beginPath();
      ctx.arc(lm.x * canvas.width, lm.y * canvas.height, 4, 0, 2 * Math.PI);
      ctx.fill();
    }

    ctx.restore();

    const state = classifyHand(landmarks);
    statusDiv.textContent = state;
    statusDiv.style.color = 
      state === "OPEN" ? "#00ff88" :
      state === "CLOSED" ? "#ff3333" : "#ffff00";
  } else {
    statusDiv.textContent = "Detecting...";
    statusDiv.style.color = "#ffffff";
  }
}
