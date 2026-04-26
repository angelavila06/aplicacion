import { useState } from "react";
import Header from "./components/Header";
import TabBar from "./components/TabBar";
import TasksTab from "./components/TasksTab";
import StatsTab from "./components/StatsTab";
import AvatarTab from "./components/AvatarTab";
import Toast from "./components/Toast";
import { INITIAL_TASKS } from "./data/tasks";
import "./App.css";

export default function App() {
  const [tab, setTab] = useState("tasks");
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastDate, setLastDate] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("🐱");
  const [userName, setUserName] = useState("Mi perfil");
  const [toast, setToast] = useState(null);

  function today() {
    return new Date().toISOString().split("T")[0];
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  function completeTask(id) {
    const t = tasks.find((x) => x.id === id);
    if (!t || t.lastDone === today()) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, lastDone: today(), doneCount: task.doneCount + 1 }
          : task
      )
    );
    setPoints((p) => p + 10);
    if (lastDate !== today()) {
      setStreak((s) => s + 1);
      setLastDate(today());
    }
    showToast("🎉 +10 puntos! Tarea completada");
  }

  function addTask(task) {
    setTasks((prev) => [...prev, { ...task, id: Date.now(), lastDone: null, doneCount: 0 }]);
    showToast("✅ Tarea creada!");
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast("🗑️ Tarea eliminada");
  }

  const level = Math.floor(points / 100) + 1;
  const xpPercent = points % 100;

  return (
    <div className="app">
      <Header
        points={points}
        streak={streak}
        level={level}
        xpPercent={xpPercent}
        selectedAvatar={selectedAvatar}
        userName={userName}
        onAvatarClick={() => setTab("avatar")}
      />
      <TabBar tab={tab} setTab={setTab} />

      <div className="tab-content">
        {tab === "tasks" && (
          <TasksTab
            tasks={tasks}
            onComplete={completeTask}
            onAdd={addTask}
            onDelete={deleteTask}
            today={today()}
          />
        )}
        {tab === "stats" && (
          <StatsTab tasks={tasks} points={points} streak={streak} />
        )}
        {tab === "avatar" && (
          <AvatarTab
            points={points}
            selectedAvatar={selectedAvatar}
            userName={userName}
            onSelectAvatar={setSelectedAvatar}
            onSaveName={setUserName}
            showToast={showToast}
          />
        )}
      </div>

      {toast && <Toast message={toast} />}
    </div>
  );
}
