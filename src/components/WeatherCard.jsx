import React from "react";

function WeatherCard({
  city,
  region,
  temperature,
  feelsLike,
  humidity,
  windSpeed,
  condition,
  icon,
  gradient,
  themeColor,
  isLoading = false,
  isActive = false,
  onClick
}) {
  if (isLoading) {
    return (
      <div 
        className="glass-panel weather-card" 
        style={{
          border: "1px solid rgba(255,255,255,0.05)"
        }}
      >
        <div className="skeleton skeleton-title" style={{ width: "70%", height: "20px" }}></div>
        <div className="skeleton skeleton-text hide-mobile" style={{ width: "40%", height: "12px" }}></div>
        <div className="weather-card-bottom" style={{ marginTop: "8px" }}>
          <div className="skeleton" style={{ width: "50px", height: "30px" }}></div>
          <div className="skeleton skeleton-circle" style={{ width: "36px", height: "36px" }}></div>
        </div>
      </div>
    );
  }


  const cardStyle = {
    border: isActive 
      ? `1.5px solid ${themeColor || "var(--accent-blue)"}` 
      : "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: isActive 
      ? `0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 20px 0px ${themeColor}22`
      : "var(--shadow-premium)",
    background: isActive 
      ? `${gradient}, var(--glass-bg)` 
      : "var(--glass-bg)",
  };

  return (
    <div 
      className={`glass-panel weather-card animate-fade-in ${isActive ? "active" : ""}`}
      style={cardStyle}
      onClick={onClick}
    >
      {}
      <div style={{
        position: "absolute",
        top: "-50px",
        right: "-50px",
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        background: themeColor || "var(--accent-blue)",
        opacity: isActive ? 0.35 : 0.15,
        filter: "blur(40px)",
        pointerEvents: "none",
        transition: "var(--transition-smooth)"
      }} />

      <div>
        {}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", width: "100%" }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h3 
              className="weather-card-city"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%"
              }}
            >
              {city}
            </h3>
            <span 
              className="hide-mobile"
              style={{ 
                fontSize: "12px", 
                color: "var(--text-secondary)", 
                fontWeight: "500",
                display: "block",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {region}
            </span>
          </div>
          
          {}
          <span style={{ 
            fontSize: "36px", 
            filter: "drop-shadow(0 4px 10px rgba(0, 0, 0, 0.2))",
            display: "inline-block",
            flexShrink: 0
          }}>
            {icon}
          </span>
        </div>

        {}
        <div 
          className="weather-card-condition"
          style={{ 
            marginTop: "16px",
            display: "inline-flex",
            padding: "4px 12px",
            borderRadius: "99px",
            background: isActive ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
            fontSize: "13px",
            fontWeight: "600",
            color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
            border: "1px solid rgba(255,255,255,0.05)"
          }}
        >
          {condition}
        </div>
      </div>

      {}
      <div className="weather-card-bottom">
        <div>
          <span className="weather-card-temp">
            {temperature}°
          </span>
          <span 
            className="hide-mobile"
            style={{ 
              fontSize: "12px", 
              color: "var(--text-muted)", 
              display: "block",
              marginTop: "4px"
            }}
          >
            Terasa seperti {feelsLike}°C
          </span>
        </div>

        {}
        <div className="weather-card-mini-stats">
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            💧 {humidity}%<span className="hide-mobile"> kelembapan</span>
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            💨 {windSpeed} km/h<span className="hide-mobile"> angin</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
