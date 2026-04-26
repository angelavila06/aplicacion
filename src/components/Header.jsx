import { LEVELS } from "../data/tasks";

export default function Header({ points, streak, level, xpPercent, selectedAvatar, userName, onAvatarClick }) {
  const levelLabel = LEVELS[Math.min(level - 1, LEVELS.length - 1)];

  return (
    <div className="header">
      <div className="header-top">
        <div className="avatar-area">
          <div className="avatar-circle" onClick={onAvatarClick}>
            {selectedAvatar}
          </div>
          <div className="avatar-info">
            <div className="name">{userName}</div>
            <div className="level">Nivel {level} — {levelLabel}</div>
          </div>
        </div>
        <div className="points-area">
          <div className="points-num">{points}</div>
          <div className="points-label">puntos</div>
          <div className="streak-row">🔥 {streak} {streak === 1 ? "dia seguido" : "dias seguidos"}</div>
        </div>
      </div>
      <div className="xp-bar-wrap">
        <div className="xp-bar" style={{ width: xpPercent + "%" }} />
      </div>
    </div>
  );
}
