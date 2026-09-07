import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { IconoCerrar, IconoCorreo, IconoLlave, IconoUsuario } from "./icons";
import { IconoGoogle } from "./icons";

interface AuthModalProps {
  abierto: boolean;
  modoInicial?: "login" | "registro";
  onClose: () => void;
}

export default function AuthModal({ abierto, modoInicial = "login", onClose }: AuthModalProps) {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [modo, setModo] = useState<"login" | "registro">(modoInicial);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [oauthLoading, setOauthLoading] = useState<"google" | null>(null);

  if (!abierto) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (modo === "login") {
        const { error } = await signIn(email, password);
        if (error) throw error;
        onClose();
      } else {
        const { error } = await signUp(email, password, nombre);
        if (error) throw error;
        setSuccess("¡Cuenta creada! Revisa tu email para confirmar tu cuenta.");
        setModo("login");
        setPassword("");
      }
    } catch (err: any) {
      setError(err.message || "Ocurrió un error");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    setOauthLoading("google");
    try {
      const { error } = await signInWithGoogle();
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || "No se pudo conectar con Google");
    } finally {
      setOauthLoading(null);
    }
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-vino-950/85 backdrop-blur-sm"
        aria-label="Cerrar"
      />

      <div className="relative w-full max-w-md rounded-xl bg-marfil-50 p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-tinta/15 text-tinta/60 transition hover:bg-vino-900 hover:text-marfil-50"
          aria-label="Cerrar"
        >
          <IconoCerrar className="h-5 w-5" />
        </button>

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-oro-400">
            <IconoUsuario className="h-8 w-8 text-vino-950" />
          </div>
          <h2 className="font-display text-2xl font-bold text-vino-900">
            {modo === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </h2>
          <p className="mt-2 text-sm text-tinta/60">
            {modo === "login"
              ? "Ingresa a tu cuenta para ver tus favoritos"
              : "Regístrate para guardar tus favoritos"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {modo === "registro" && (
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-tinta/50">
                Nombre
              </label>
              <div className="relative mt-1.5">
                <IconoUsuario className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-tinta/40" />
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  required={modo === "registro"}
                  className="w-full rounded-lg border border-tinta/15 bg-white/80 py-3.5 pl-11 pr-4 text-sm text-vino-900 outline-none transition placeholder:text-tinta/35 focus:border-oro-500 focus:ring-4 focus:ring-oro-400/20"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-tinta/50">
              Correo electrónico
            </label>
            <div className="relative mt-1.5">
              <IconoCorreo className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-tinta/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full rounded-lg border border-tinta/15 bg-white/80 py-3.5 pl-11 pr-4 text-sm text-vino-900 outline-none transition placeholder:text-tinta/35 focus:border-oro-500 focus:ring-4 focus:ring-oro-400/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-tinta/50">
              Contraseña
            </label>
            <div className="relative mt-1.5">
              <IconoLlave className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-tinta/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full rounded-lg border border-tinta/15 bg-white/80 py-3.5 pl-11 pr-4 text-sm text-vino-900 outline-none transition placeholder:text-tinta/35 focus:border-oro-500 focus:ring-4 focus:ring-oro-400/20"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-vino-600/10 p-3 text-sm text-vino-600">{error}</p>
          )}

          {success && (
            <p className="rounded-lg bg-oro-400/20 p-3 text-sm text-vino-800">{success}</p>
          )}

          {oauthLoading === "google" && (
            <p className="rounded-lg bg-vino-600/10 p-3 text-sm text-vino-600">Conectando con Google...</p>
          )}

          <button
            type="submit"
            disabled={loading || !!oauthLoading}
            className="w-full rounded-full bg-oro-400 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-vino-950 shadow-xl transition-all hover:-translate-y-0.5 hover:bg-oro-300 disabled:opacity-50"
          >
            {loading ? "Cargando..." : modo === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </button>

          <div className="mt-4">
            <button
              onClick={handleGoogle}
              disabled={loading || !!oauthLoading}
              className="w-full rounded-full bg-white py-3 text-sm font-medium text-vino-900 border border-tinta/15 hover:bg-gray-50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {oauthLoading === "google" ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              ) : (
                <IconoGoogle className="h-4 w-4" />
              )}
              {oauthLoading === "google" ? "Conectando..." : "Google"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setModo(modo === "login" ? "registro" : "login");
              setError(null);
              setSuccess(null);
              setOauthLoading(null);
            }}
            className="text-sm text-oro-600 transition hover:text-oro-400"
          >
            {modo === "login"
              ? "¿No tienes cuenta? Regístrate"
              : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </div>
      </div>
    </div>
  );
}
