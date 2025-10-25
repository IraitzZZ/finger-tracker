# Finger Tracker

> 🖐️ **Beta** – Real-time hand state detection (OPEN / CLOSED) for sim racing and gesture control.  
> Built for **you to use, test, and modify**.

A lightweight, single-file web app that uses your webcam to track hand gestures in real time.  
Designed with **sim racing aesthetics**: black background, glowing blue skeleton, red landmarks.

- ✅ **OPEN** = all fingers extended  
- ✅ **CLOSED** = fist  
- ✅ **PARTIAL** = in-between  
- 🎨 Minimalist UI (inspired by BMW M / sim racing)  
- 💻 Works in Chrome/Edge — no server needed

## ▶️ How to Use

### Option 1: All-in-one (easiest)
1. Go to `/demo/index.html`
2. Open it in Chrome or Edge
3. Allow camera → show your hand

### Option 2: Modular (for development)
- Edit files in `/src/` to customize behavior or design
- Open `/src/index.html` to test

> ⚠️ First load requires internet (MediaPipe from CDN). Works offline after.

## 🛠️ Tech

- MediaPipe Hands (Google)
- Vanilla JavaScript
- HTML5 Canvas

## 📜 License

MIT © IraitzZZ

---

> “Code should disappear. Only the solution should remain.”  
> — IraitzZZ
