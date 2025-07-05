import React, { useState } from "react";

function Shortener() {
  const [url, setUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [clicks, setClicks] = useState(0);

  const shortenUrl = () => {
    const code = Math.random().toString(36).substring(2, 8);
    localStorage.setItem(code, JSON.stringify({ url, clicks: 0 }));
    setShortCode(code);
  };

  const openUrl = () => {
    const data = JSON.parse(localStorage.getItem(shortCode));
    data.clicks += 1;
    localStorage.setItem(shortCode, JSON.stringify(data));
    setClicks(data.clicks);
    window.open(data.url, "_blank");
  };

  const containerStyle = {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "#f0f4f8",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  };

  const inputStyle = {
    padding: "10px",
    width: "80%",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const resultStyle = {
    marginTop: "20px",
    fontSize: "16px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>
        🎯 Simple URL Shortener
      </h2>
      <input
        type="text"
        placeholder="Enter a long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={inputStyle}
      />
      <br />
      <button onClick={shortenUrl} style={buttonStyle}>
        Shorten
      </button>

      {shortCode && (
        <div style={resultStyle}>
          <p>
            🔗 Short URL:{" "}
            <button onClick={openUrl} style={{ ...buttonStyle, fontSize: "14px" }}>
              {window.location.origin}/{shortCode}
            </button>
          </p>
          <p>📊 Total Clicks: {clicks}</p>
        </div>
      )}
    </div>
  );
}

export default Shortener;
