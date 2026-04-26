import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function Login() {
  async function handleLogin() {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #7F77DD, #D4537E)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
    }}>
      <div style={{
        background: "white",
        borderRadius: 24,
        padding: "2.5rem 2rem",
        textAlign: "center",
        maxWidth: 360,
        width: "100%",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>📋</div>
        <h1 style={{
          fontFamily: "'Fredoka One', cursive",
          fontSize: 32,
          color: "#7F77DD",
          marginBottom: 8,
        }}>
          Recuerdalo
        </h1>
        <p style={{
          fontSize: 14,
          color: "#6b6b8a",
          marginBottom: 32,
          lineHeight: 1.5,
        }}>
          Tu app de recordatorios con puntos, rachas y avatares 🎮
        </p>

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "13px 20px",
            borderRadius: 12,
            border: "1.5px solid #e0e0e0",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "'Nunito', sans-serif",
            cursor: "pointer",
            transition: "all 0.2s",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
          onMouseOver={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)"}
          onMouseOut={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"}
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            style={{ width: 20, height: 20 }}
          />
          Continuar con Google
        </button>

        <p style={{ fontSize: 11, color: "#9b97c0", marginTop: 20 }}>
          Tus datos se guardan de forma segura en la nube ☁️
        </p>
      </div>
    </div>
  );
}
