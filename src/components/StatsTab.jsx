export default function StatsTab({ tasks, points, streak }) {
  const totalDone = tasks.reduce((sum, t) => sum + t.doneCount, 0);
  const activeTasks = tasks.filter((t) => t.doneCount > 0).length;

  return (
    <div>
      <div className="stat-card-wide">
        <div className="stat-num">{points}</div>
        <div className="stat-label">Puntos totales acumulados</div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-num">{tasks.length}</div>
          <div className="stat-label">Tareas activas</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{totalDone}</div>
          <div className="stat-label">Completadas</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{streak}</div>
          <div className="stat-label">Racha dias</div>
        </div>
      </div>

      <div className="section-title" style={{ marginBottom: "10px" }}>Progreso por tarea</div>
      {tasks.map((t) => (
        <div key={t.id} style={{
          background: "var(--card)",
          borderRadius: "var(--radius)",
          border: "1px solid var(--border)",
          padding: "12px 14px",
          marginBottom: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
              {t.doneCount} veces completada
            </div>
          </div>
          <div style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: 20,
            color: "var(--purple)",
          }}>
            +{t.doneCount * 10}pts
          </div>
        </div>
      ))}
    </div>
  );
}
