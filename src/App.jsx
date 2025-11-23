import "./App.css";

import { useEffect, useState } from "react";
import Timer from "./components/Timer";

export default function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [times, setTimes] = useState({
    utc: "",
    jakarta: "",
    browser: "",
  });

  const [visitors, setVisitors] = useState(null);

  // Birth Date - 5.5.2026
  const birthdayMonth = 4; // 0 = Jan, so 8 = September
  const birthdayDay = 5; // 09 September

  const updateTimes = () => {
    const now = new Date();
    // date.toLocaleString('en-US', { hour12: false });

    setTimes({
      mumbai: now.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
      }),
      utc: now.toLocaleString("en-US", { timeZone: "Etc/UTC", hour12: false }),

      browser: now.toLocaleString(),

      newyork: now.toLocaleString("en-US", {
        timeZone: "America/New_York",
        hour12: false,
      }),
      london: now.toLocaleString("en-US", {
        timeZone: "Europe/London",
        hour12: false,
      }),
    });
  };

  const updateCountdown = () => {
    const now = new Date();
    let year = now.getFullYear();

    let birthday = new Date(year, birthdayMonth, birthdayDay);

    if (now > birthday) {
      birthday = new Date(year + 1, birthdayMonth, birthdayDay);
    }

    const diff = birthday - now;

    setTimeLeft({
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    });
  };

  //API Endpoint
  const API_URL =
    "https://m8k4ijx2z7.execute-api.ap-south-1.amazonaws.com/count";

  function handleData(val = null) {
    const data = val?.value ?? 0;
    console.log("DB Data", val.value);
    setVisitors(data);
  }

  useEffect(() => {
    updateTimes();
    updateCountdown();
    const interval = setInterval(() => {
      updateTimes();
      updateCountdown();
    }, 1000);

    // Example: calling your API (replace with your real endpoint)
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => handleData(data))
      .catch((err) => console.error(err));

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Timer
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        times={times}
        setTimes={setTimes}
      />

      <div className="visitor">
        👤 Total Visitors:{" "}
        <span>{visitors !== null ? visitors : "Loading..."}</span>
        <div className="detail">
          (This shows the Total number of Users visits after creating this
          website.)
        </div>
      </div>

      <footer className="footer">
        <p className="footer-text">
          Made with 💖 by
          <strong className="footer-author">Yokesh B</strong>
        </p>
      </footer>
    </>
  );
}
