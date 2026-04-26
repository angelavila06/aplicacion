import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import Header from "./components/Header";
import TabBar from "./components/TabBar";
import TasksTab from "./components/TasksTab";
import StatsTab from "./components/StatsTab";
import AvatarTab from "./components/AvatarTab";
import Toast from "./components/Toast";
import Login from "./components/Login";
import { INITIAL_TASKS } from "./data/tasks";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("tasks");
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastDate, setLastDate] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("🐱");
  const [userName, setUserName] = useState("Mi perfil");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) await loadUserData(u.uid);
      setLoading(false);
    });
    return unsub;
  }, []);

  async function loadUserData(uid) {
    try {
      const ref = doc(db, "users", uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        if (data.tasks) setTasks(data.tasks);
        if (data.points !== undefined) setPoints(data.points);
        if (data.streak !== undefined) setStreak(data.streak);
        if (data.lastDate) setLastDate(data.lastDate);
        if (data.selectedAvatar) setSelectedAvatar(data.selectedAvatar);
        if (data.userName) setUserName(data.userName);
      }
    } catch (e) {
      console.error("Error cargando datos:", e);
    }
  }

  async function saveUserData(updates) {
    if (!user) return;
    try {
      const ref = doc(db, "users", user.uid);
      await setDoc(ref, updates, { merge: true });
    } catch (e) {
      console.error("Error guardando datos:", e);
    }
  }

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
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, lastDone: today(), doneCount: task.doneCount + 1 } : task
    );
    const newPoints = points + 10;
    const newStreak = lastDate !== today() ? streak + 1 : streak;
    const newLastDate = today();
    setTasks(newTasks);
    setPoints(newPoints);
    setStreak(newStreak);
    setLastDate(newLastDate);
    saveUserData({ tasks: newTasks, points: newPoints, streak: newStreak, lastDate: newLastDate });
    showToast("🎉 +10 puntos! Tarea completada");
  }

  function addTask(task) {
    const newTasks = [...tasks, { ...task, id: Date.now(), lastDone: null, doneCount: 0 }];
    setTasks(newTasks);
    saveUserData({ tasks: newTasks });
    showToast("✅ Tarea creada!");
  }

  function deleteTask(id) {
    const newTasks = tasks.filter((t) => t.id !== id);
    setTasks(newTasks);
    saveUserData({ tasks: newTasks });
    showToast("🗑️ Tarea eliminada");
  }

  function handleSetAvatar(avatar) {
    setSelectedAvatar(avatar);
    saveUserData({ selectedAvatar: avatar });
  }

  function handleSetUserName(name) {
    setUserName(name);
    saveUserData({ userName: name });
  }

  function handleLogout() {
    signOut(auth);
    showToast("👋 Hasta luego!");
  }

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #7F77DD, #D4537E)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: 16,
      }}>
        <div style={{ fontSize: 48 }}>📋</div>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 24, color: "white" }}>Cargando...</div>
      </div>
    );
  }

  if (!user) return <Login />;

  const level = Math.floor(points / 100) + 1;
  const xpPercent = points % 100;

  return (
    <div className="app">
      <Header
        points={points} streak={streak} level={level} xpPercent={xpPercent}
        selectedAvatar={selectedAvatar} userName={userName}
        onAvatarClick={() => setTab("avatar")}
        onLogout={handleLogout} userPhoto={user.photoURL}
      />
      <TabBar tab={tab} setTab={setTab} />
      <div className="tab-content">
        {tab === "tasks" && <TasksTab tasks={tasks} onComplete={completeTask} onAdd={addTask} onDelete={deleteTask} today={today()} />}
        {tab === "stats" && <StatsTab tasks={tasks} points={points} streak={streak} />}
        {tab === "avatar" && <AvatarTab points={points} selectedAvatar={selectedAvatar} userName={userName} onSelectAvatar={handleSetAvatar} onSaveName={handleSetUserName} showToast={showToast} />}
      </div>
      {toast && <Toast message={toast} />}
    </div>
  );
}
