import { useState } from "react";
import { AVATARS } from "../data/tasks";

export default function AvatarTab({ points, selectedAvatar, userName, onSelectAvatar, onSaveName, showToast }) {
  const [nameInput, setNameInput] = useState(userName);

  function handleSave() {
    if (nameInput.trim()) {
      onSaveName(nameInput.trim());
      showToast("Nombre guardado!");
    }
  }

  return (
    <div>
      <div className="avatar-section-title">Elige tu avatar</div>
      <div className="avatar-grid">
        {AVATARS.map((a) => {
          const locked = points < a.pts;
          return (
            <div key={a.e} className="av-item">
              <div
                className={`av-opt ${selectedAvatar === a.e ? "selected" : ""} ${locked ? "locked" : ""}`}
                onClick={() => {
                  if (locked) showToast(`Necesitas ${a.pts} puntos`);
                  else onSelectAvatar(a.e);
                }}
              >
                {a.e}
              </div>
              {locked && <div className="av-pts">{a.pts}pts</div>}
            </div>
          );
        })}
      </div>

      <div className="name-section">
        <div className="avatar-section-title" style={{ marginBottom: 10 }}>Tu nombre</div>
        <input
          type="text"
          placeholder="Escribe tu nombre..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <button className="btn-save" style={{ width: "100%" }} onClick={handleSave}>
          Guardar nombre
        </button>
      </div>
    </div>
  );
}
