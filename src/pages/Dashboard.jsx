import React, { useState, useEffect } from "react";
import { cities, fetchWeatherForCity } from "../data/weatherData";
import WeatherCard from "../components/WeatherCard";
import brandIcon from "../assets/icon.png";

function Dashboard() {
  const [weatherList, setWeatherList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [activeCityId, setActiveCityId] = useState("surabaya");
  const [lastUpdated, setLastUpdated] = useState("");

  const loadWeatherData = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const dataPromises = cities.map(city => fetchWeatherForCity(city));
      const results = await Promise.all(dataPromises);
      setWeatherList(results);
      
      const hasActive = results.some(item => item.id === activeCityId);
      if (!hasActive && results.length > 0) {
        setActiveCityId(results[0].id);
      }

      const now = new Date();
      const timeString = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setLastUpdated(timeString);
    } catch (err) {
      console.error(err);
      setError("Gagal memperbarui data cuaca. Periksa koneksi internet Anda.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
  }, []);

  const activeWeatherData = weatherList.find(item => item.id === activeCityId);

  const getUvCategory = (uvValue) => {
    if (uvValue <= 2) return { text: "Rendah", color: "#10b981" };
    if (uvValue <= 5) return { text: "Sedang", color: "#f59e0b" };
    if (uvValue <= 7) return { text: "Tinggi", color: "#ef4444" };
    if (uvValue <= 10) return { text: "Sangat Tinggi", color: "#ec4899" };
    return { text: "Ekstrem", color: "#a855f7" };
  };

  return (
    <div className="page-container">
      <header className="glass-panel dashboard-header">
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{
            position: "relative",
            width: "50px",
            height: "50px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #38bdf8 0%, #a855f7 100%)",
            padding: "2px",
            boxShadow: "0 0 20px rgba(56, 189, 248, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
          }}>
            <img 
              src={brandIcon} 
              alt="Logo" 
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "12px",
                display: "block"
              }} 
            />
          </div>
          <div>
            <h1 style={{ 
              fontSize: "24px", 
              fontWeight: "800", 
              letterSpacing: "-0.03em",
              background: "linear-gradient(90deg, #ffffff 30%, #94a3b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              AetherCast
            </h1>
            <p style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: "500" }}>
              Sistem Informasi Cuaca Real-time Premium
            </p>
          </div>
        </div>

        <div className="header-actions">
          {lastUpdated && !loading && (
            <span style={{ 
              fontSize: "13px", 
              color: "var(--text-secondary)", 
              fontWeight: "600",
              background: "rgba(255,255,255,0.03)",
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.05)",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}>
              ⏱️ Terakhir diperbarui: <strong style={{ color: "#ffffff" }}>{lastUpdated} WIB</strong>
            </span>
          )}
          {error && (
            <span style={{ fontSize: "13px", color: "var(--accent-rose)", fontWeight: "600" }}>
              ⚠️ {error}
            </span>
          )}
          <button
            onClick={() => loadWeatherData(true)}
            disabled={loading || refreshing}
            style={{
              padding: "10px 20px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "600",
              cursor: (loading || refreshing) ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)"
            }}
            onMouseEnter={e => {
              if (!loading && !refreshing) {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }
            }}
            onMouseLeave={e => {
              if (!loading && !refreshing) {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }
            }}
          >
            <svg 
              className={refreshing || loading ? "animate-spin" : ""} 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ display: "inline-block" }}
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            {refreshing ? "Memperbarui..." : "Segarkan"}
          </button>
        </div>
      </header>

      <main style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "32px",
        width: "100%",
        maxWidth: "100%"
      }} className="responsive-dashboard-grid">
        <style dangerouslySetInnerHTML={{__html: `
          @media (min-width: 1024px) {
            .responsive-dashboard-grid {
              grid-template-columns: 1.2fr 1fr !important;
            }
          }
        `}} />

        <section style={{ display: "flex", flexDirection: "column", gap: "24px", minWidth: 0, maxWidth: "100%" }}>
          <div 
            className="glass-panel active-details-panel" 
            style={{
              background: activeWeatherData && !loading
                ? `${activeWeatherData.gradient}, rgba(13, 22, 41, 0.7)`
                : "var(--glass-bg)"
            }}
          >
            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ width: "50%" }}>
                    <div className="skeleton skeleton-title" style={{ width: "80%" }}></div>
                    <div className="skeleton skeleton-text" style={{ width: "40%" }}></div>
                  </div>
                  <div className="skeleton skeleton-circle" style={{ width: "64px", height: "64px" }}></div>
                </div>
                <div className="skeleton" style={{ width: "100%", height: "100px" }}></div>
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(3, 1fr)", 
                  gap: "16px" 
                }} className="active-metrics-grid">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div className="skeleton" key={i} style={{ height: "90px", borderRadius: "16px" }}></div>
                  ))}
                </div>
              </div>
            ) : activeWeatherData ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
                <div style={{
                  position: "absolute",
                  bottom: "-60px",
                  left: "-60px",
                  width: "250px",
                  height: "250px",
                  borderRadius: "50%",
                  background: activeWeatherData.themeColor,
                  opacity: 0.15,
                  filter: "blur(60px)",
                  pointerEvents: "none"
                }} />

                <div className="details-top-panel">
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent-blue)" }}>
                        Detail Wilayah
                      </span>
                      <span style={{ fontSize: "10px", padding: "2px 8px", background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8", borderRadius: "4px", fontWeight: "700" }}>
                        REAL-TIME
                      </span>
                    </div>
                    <h2 style={{ fontSize: "38px", fontWeight: "800", letterSpacing: "-0.03em", marginTop: "4px" }}>
                      {activeWeatherData.city}
                    </h2>
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontWeight: "500" }}>
                      {activeWeatherData.region} • Koord: {activeWeatherData.latitude.toFixed(4)}°, {activeWeatherData.longitude.toFixed(4)}°
                    </p>
                    {lastUpdated && (
                      <p style={{ 
                        fontSize: "12px", 
                        color: "var(--text-muted)", 
                        fontWeight: "600", 
                        marginTop: "8px", 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "6px" 
                      }}>
                        ⏱️ Data terakhir ditarik: <span style={{ color: "var(--accent-blue)" }}>{lastUpdated} WIB</span>
                      </p>
                    )}
                  </div>
                  
                  <div className="main-condition-display">
                    <span style={{ fontSize: "64px", filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.3))" }}>
                      {activeWeatherData.icon}
                    </span>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ 
                        fontSize: "20px", 
                        fontWeight: "700", 
                        color: "#ffffff", 
                        display: "block" 
                      }}>
                        {activeWeatherData.condition}
                      </span>
                      <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: "500" }}>
                        Kondisi saat ini
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
                  <div className="glass-panel detail-stat-card" style={{ width: "100%" }}>
                    <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: "600", display: "block", letterSpacing: "0.05em" }}>
                      SUHU SAAT INI
                    </span>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "12px", marginTop: "8px" }}>
                      <span className="temp-text" style={{ margin: 0 }}>
                        {activeWeatherData.temperature}°C
                      </span>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: "14px", fontWeight: "700", color: "#ffffff", display: "block" }}>
                          🔼 {activeWeatherData.tempMax}°C <span style={{ color: "var(--text-muted)", fontWeight: "500", margin: "0 4px" }}>|</span> 🔽 {activeWeatherData.tempMin}°C
                        </span>
                        <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: "500" }}>
                          Rentang Suhu Harian
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="active-metrics-grid">
                    <div className="metric-cell">
                      <div className="metric-cell-label">
                        🌡️ Terasa Seperti
                      </div>
                      <div className="metric-cell-value">
                        {activeWeatherData.feelsLike}°C
                      </div>
                      <div className="metric-cell-subtext">
                        {activeWeatherData.feelsLike > activeWeatherData.temperature ? "Lebih hangat" : "Lebih dingin"} dari suhu asli
                      </div>
                    </div>

                    {}
                    <div className="metric-cell">
                      <div className="metric-cell-label">
                        💧 Kelembapan
                      </div>
                      <div className="metric-cell-value">
                        {activeWeatherData.humidity}%
                      </div>
                      <div className="metric-cell-subtext">
                        Kandungan uap air di udara
                      </div>
                    </div>

                    <div className="metric-cell">
                      <div className="metric-cell-label">
                        💨 Kecepatan Angin
                      </div>
                      <div className="metric-cell-value">
                        {activeWeatherData.windSpeed} km/h
                      </div>
                      <div className="metric-cell-subtext">
                        Laju hembusan angin saat ini
                      </div>
                    </div>

                    <div className="metric-cell">
                      <div className="metric-cell-label">
                        ☀️ UV Indeks
                      </div>
                      <div className="metric-cell-value" style={{ color: getUvCategory(activeWeatherData.uv).color }}>
                        {activeWeatherData.uv}
                      </div>
                      <div className="metric-cell-subtext" style={{ fontWeight: "600", color: getUvCategory(activeWeatherData.uv).color }}>
                        {getUvCategory(activeWeatherData.uv).text}
                      </div>
                    </div>

                    <div className="metric-cell">
                      <div className="metric-cell-label">
                        🌅 Terbit
                      </div>
                      <div className="metric-cell-value">
                        {activeWeatherData.sunrise}
                      </div>
                      <div className="metric-cell-subtext">
                        Fajar menyingsing di wilayah ini
                      </div>
                    </div>

                    <div className="metric-cell">
                      <div className="metric-cell-label">
                        🌇 Terbenam
                      </div>
                      <div className="metric-cell-value">
                        {activeWeatherData.sunset}
                      </div>
                      <div className="metric-cell-subtext">
                        Senja dan malam tiba
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 style={{ 
                    fontSize: "14px", 
                    fontWeight: "700", 
                    letterSpacing: "0.05em", 
                    color: "var(--text-secondary)",
                    marginBottom: "16px",
                    textTransform: "uppercase"
                  }}>
                    Ramalan Cuaca 7 Hari Mendatang
                  </h4>
                  <div className="forecast-container">
                    {activeWeatherData.forecast.map((dayData, idx) => (
                      <div 
                        key={idx}
                        className="glass-panel"
                        style={{
                          minWidth: "100px",
                          flex: "0 0 auto",
                          padding: "16px 12px",
                          textAlign: "center",
                          background: idx === 0 ? "rgba(255, 255, 255, 0.08)" : "rgba(255,255,255,0.02)",
                          border: idx === 0 ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.03)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "8px"
                        }}
                      >
                        <span style={{ 
                          fontSize: "13px", 
                          fontWeight: idx === 0 ? "700" : "500",
                          color: idx === 0 ? "#ffffff" : "var(--text-secondary)",
                          display: "block"
                        }}>
                          {idx === 0 ? "Hari ini" : dayData.day}
                        </span>
                        <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block" }}>
                          {dayData.date}
                        </span>
                        <span style={{ fontSize: "28px", display: "block", margin: "6px 0" }}>
                          {dayData.icon}
                        </span>
                        <span style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-secondary)", display: "block", maxWidth: "80px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {dayData.condition}
                        </span>
                        <div style={{ 
                          marginTop: "4px",
                          fontSize: "12px", 
                          fontWeight: "700",
                          display: "flex",
                          gap: "6px"
                        }}>
                          <span style={{ color: "#ffffff" }}>{dayData.tempMax}°</span>
                          <span style={{ color: "var(--text-muted)" }}>{dayData.tempMin}°</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <p style={{ color: "var(--text-secondary)" }}>Tidak ada data cuaca yang dapat ditampilkan.</p>
              </div>
            )}
          </div>
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: "24px", minWidth: 0, maxWidth: "100%" }}>
          <div>
            <h3 style={{ 
              fontSize: "18px", 
              fontWeight: "700", 
              letterSpacing: "-0.01em",
              color: "#ffffff"
            }}>
              Pilih Wilayah Pemantauan
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
              Klik pada salah satu kota untuk melihat ramalan dan visualisasi cuaca detail secara real-time.
            </p>
          </div>

          <div className="cities-grid">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <WeatherCard key={index} isLoading={true} />
              ))
            ) : (
              weatherList.map((item) => (
                <WeatherCard 
                  key={item.id} 
                  {...item} 
                  isActive={item.id === activeCityId}
                  onClick={() => setActiveCityId(item.id)}
                />
              ))
            )}
          </div>
        </section>
      </main>

      <footer className="dashboard-footer">
        <div className="footer-brand">
          <span className="footer-copyright">
            © 2026. Data real-time disediakan oleh{" "}
            <a 
              href="https://open-meteo.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-link"
            >
              Open-Meteo API
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
