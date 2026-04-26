export default function TabBar({ tab, setTab }) {
  const tabs = [
    { id: "tasks", label: "Tareas" },
    { id: "stats", label: "Estadisticas" },
    { id: "avatar", label: "Avatar" },
  ];

  return (
    <div className="tabbar">
      {tabs.map((t) => (
        <button
          key={t.id}
          className={`tabbar-btn ${tab === t.id ? "active" : ""}`}
          onClick={() => setTab(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
