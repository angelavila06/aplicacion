export const INITIAL_TASKS = [
  { id: 1, name: "Cambiar sabanas", cat: "hogar", freq: 14, lastDone: null, doneCount: 0 },
  { id: 2, name: "Sacar la basura", cat: "hogar", freq: 3, lastDone: null, doneCount: 0 },
  { id: 3, name: "Limpiar la nevera", cat: "hogar", freq: 30, lastDone: null, doneCount: 0 },
  { id: 4, name: "Barrer y trapear", cat: "hogar", freq: 7, lastDone: null, doneCount: 0 },
  { id: 5, name: "Tomar vitaminas", cat: "salud", freq: 1, lastDone: null, doneCount: 0 },
  { id: 6, name: "Hacer ejercicio", cat: "salud", freq: 2, lastDone: null, doneCount: 0 },
  { id: 7, name: "Lavar ropa", cat: "personal", freq: 7, lastDone: null, doneCount: 0 },
];

export const CATEGORIES = {
  hogar:    { icon: "🏠", color: "#E6F1FB", label: "Hogar" },
  personal: { icon: "✨", color: "#EEEDFE", label: "Personal" },
  salud:    { icon: "💪", color: "#EAF3DE", label: "Salud" },
  mascotas: { icon: "🐾", color: "#FAEEDA", label: "Mascotas" },
};

export const AVATARS = [
  { e: "🐱", pts: 0 }, { e: "🐶", pts: 0 }, { e: "🐸", pts: 0 },
  { e: "🦊", pts: 0 }, { e: "🐼", pts: 0 }, { e: "🦁", pts: 50 },
  { e: "🐯", pts: 50 }, { e: "🐨", pts: 100 }, { e: "🐙", pts: 150 },
  { e: "🦄", pts: 200 }, { e: "🚀", pts: 300 }, { e: "🌟", pts: 400 },
  { e: "👑", pts: 500 }, { e: "🔥", pts: 600 }, { e: "💎", pts: 800 },
];

export const LEVELS = [
  "Principiante", "Aprendiz", "Constante",
  "Experto", "Maestro", "Leyenda"
];
