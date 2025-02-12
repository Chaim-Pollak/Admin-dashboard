import { useState, useEffect } from "react";

//function that calculates the elapsed time
function timeAgo(dateString) {
  const past = new Date(dateString);
  const now = new Date();
  const diffMs = now - past; // Time difference in milliseconds

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  if (diffMinutes > 0) return `${diffMinutes}m ago`;
  return `${diffSeconds}s ago`;
}

const TimeAgo = ({ date, onTimeUpdate }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updatedTime = timeAgo(date);
    setTime(updatedTime);
    if (onTimeUpdate) onTimeUpdate(updatedTime); // Sends the updated time back

    // Update every minute
    const interval = setInterval(() => {
      const updatedTime = timeAgo(date);
      setTime(updatedTime);
      if (onTimeUpdate) onTimeUpdate(updatedTime); // Sends the updated time back
    }, 60000);

    return () => clearInterval(interval);
  }, [date, onTimeUpdate]);

  return <span className="text-xs">{time}</span>;
};

export default TimeAgo;
