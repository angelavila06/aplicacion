import { LEVELS } from "../data/tasks";

export default function Header({ points, streak, level, xpPercent, selectedAvatar, userName, onAvatarClick, onLogout, userPhoto }) {
  const levelLabel = LEVELS[Math.min(level - 1, LEVELS.length - 1)];

  return (
    <div className="header">
      <div className="header-top">
        <div className="avatar-area">
          <div className="avatar-circle" onClick={onAvatarClick}>
            {userPhoto
              ? <img src={userPhoto} alt="avatar" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
              : selectedAvatar}
          </div>
          <div className="avatar-info">
            <div className="name">{userName}</div>
            <div className="level">Nivel {level} — {levelLabel}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          <div className="points-area">
            <div className="points-num">{points}</div>
            <div className="points-label">puntos</div>
            <div className="streak-row">🔥 {streak} {streak === 1 ? "dia seguido" : "dias seguidos"}</div>
          </div>
          <button
            onClick={onLogout}
            style={{
              fontSize: 11, fontWeight: 700, fontFamily: "Nunito, sans-serif",
              background: "rgba(255,255,255,0.2)", border: "none", color: "white",
              borderRadius: 99, padding: "3px 10px", cursor: "pointer",
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      <div className="xp-bar-wrap">
        <div className="xp-bar" style={{ width: xpPercent + "%" }} />
      </div>
    </div>
  );
}
