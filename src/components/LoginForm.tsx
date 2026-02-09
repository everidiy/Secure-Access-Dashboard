import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, type AuthFormData } from "../schemas_zod/authSchema";
import { useUserStore } from "../stores_zustand/useUserStore";
import { useAuthStore } from "../stores_zustand/useAuthStore";

export function LoginForm() {
  const { users } = useUserStore();
  const login = useAuthStore((s) => s.login);
  const [authError, setAuthError] = useState<string | null>(null);

  const defaultHint = useMemo(() => {
    const admin = users.find((u) => u.role === "admin");
    if (!admin?.password) return null;
    return { email: admin.email, password: admin.password };
  }, [users]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: defaultHint?.email ?? "",
      password: defaultHint?.password ?? "",
    },
  });

  const onSubmit = (data: AuthFormData) => {
    setAuthError(null);
    const user = users.find((u) => u.email === data.email);

    if (!user || !user.password || user.password !== data.password) {
      setAuthError("Неверный email или пароль");
      return;
    }

    if (!user.isActive) {
      setAuthError("Пользователь заблокирован");
      return;
    }

    login(user);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-900 p-6 rounded-xl shadow-lg space-y-5 max-w-md mx-auto"
    >
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-white">Вход</h2>
        <p className="text-sm text-gray-400">Дашборд доступен только после авторизации</p>
      </div>

      <div className="flex flex-col">
        <input
          {...register("email")}
          placeholder="Email"
          className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.email && (
          <span className="text-red-400 text-sm mt-1">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.password && (
          <span className="text-red-400 text-sm mt-1">{errors.password.message}</span>
        )}
      </div>

      {authError && <div className="text-red-400 text-sm">{authError}</div>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition"
      >
        Войти
      </button>

      {defaultHint && (
        <div className="text-xs text-gray-500 text-center">
          Demo: {defaultHint.email} / {defaultHint.password}
        </div>
      )}
    </form>
  );
}
