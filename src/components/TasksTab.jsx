import { useState } from "react";
import { CATEGORIES } from "../data/tasks";

const CATS = ["todas", "hogar", "personal", "salud", "mascotas"];

function daysUntilDue(task) {
  if (!task.lastDone) return 0;
  const diff = Math.floor((Date.now() - new Date(task.lastDone)) / 86400000);
  return task.freq - diff;
}

function dueInfo(task) {
  const d = daysUntilDue(task);
  if (d < 0) return { text: "Atrasada", cls: "due-overdue" };
  if (d === 0) return { text: "Hoy!", cls: "due-today" };
  if (d <= 2) return { text: `En ${d} dias`, cls: "due-soon" };
  return { text: `En ${d} dias`, cls: "due-ok" };
}

export default function TasksTab({ tasks, onComplete, onAdd, onDelete, today }) {
  const [activeCat, setActiveCat] = useState("todas");
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCat, setNewCat] = useState("hogar");
  const [newFreq, setNewFreq] = useState(7);

  function handleAdd() {
    if (!newName.trim()) return;
    onAdd({ name: newName.trim(), cat: newCat, freq: parseInt(newFreq) });
    setNewName("");
    setShowForm(false);
  }

  const filtered = tasks
    .filter((t) => activeCat === "todas" || t.cat === activeCat)
    .sort((a, b) => daysUntilDue(a) - daysUntilDue(b));

  return (
    <div>
      <div className="cat-filter">
        {CATS.map((cat) => (
          <button
            key={cat}
            className={`cat-pill ${activeCat === cat ? `active-${cat}` : ""}`}
            onClick={() => setActiveCat(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {filtered.map((task) => {
        const done = task.lastDone === today;
        const due = dueInfo(task);
        const cat = CATEGORIES[task.cat] || CATEGORIES.hogar;

        return (
          <div key={task.id} className={`task-card ${done ? "done" : ""}`}>
            <div className="task-icon" style={{ background: cat.color }}>
              {cat.icon}
            </div>
            <div className="task-info">
              <div className={`task-name ${done ? "done" : ""}`}>{task.name}</div>
              <div className="task-meta">
                Cada {task.freq} dia{task.freq > 1 ? "s" : ""} · {task.doneCount} veces
              </div>
            </div>
            <span className={`due-badge ${due.cls}`}>{due.text}</span>
            <button
              className={`check-btn ${done ? "done" : ""}`}
              onClick={() => onComplete(task.id)}
            >
              {done ? "✓" : ""}
            </button>
            <button className="delete-btn" onClick={() => onDelete(task.id)}>
              ✕
            </button>
          </div>
        );
      })}

      {showForm && (
        <div className="add-form">
          <div className="form-row">
            <input
              type="text"
              placeholder="Nombre de la tarea..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="form-row">
            <select value={newCat} onChange={(e) => setNewCat(e.target.value)}>
              <option value="hogar">Hogar</option>
              <option value="personal">Personal</option>
              <option value="salud">Salud</option>
              <option value="mascotas">Mascotas</option>
            </select>
            <select value={newFreq} onChange={(e) => setNewFreq(e.target.value)}>
              <option value={1}>Cada dia</option>
              <option value={3}>Cada 3 dias</option>
              <option value={7}>Cada semana</option>
              <option value={14}>Cada 2 semanas</option>
              <option value={30}>Cada mes</option>
            </select>
          </div>
          <div className="form-actions">
            <button className="btn-cancel" onClick={() => setShowForm(false)}>Cancelar</button>
            <button className="btn-save" onClick={handleAdd}>Guardar</button>
          </div>
        </div>
      )}

      <button className="add-btn" onClick={() => setShowForm(!showForm)}>
        + Nueva tarea
      </button>
    </div>
  );
}
