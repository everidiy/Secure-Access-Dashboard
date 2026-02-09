import { UserForm } from "./components/UserForm";
import { UsersTable } from "./components/UsersTable";
import { LoginForm } from "./components/LoginForm";
import { useAuthStore } from "./stores_zustand/useAuthStore";

function App() {
  const token = useAuthStore((s) => s.token);
  const currentUser = useAuthStore((s) => s.currentUser);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="bg-gray-950 min-h-screen p-8">
      <div className="max-w-5xl mx-auto space-y-8">

        <h1 className="text-4xl font-bold text-white text-center">
          Secure Access Dashboard
        </h1>

        {!token ? (
          <LoginForm />
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gray-900 rounded-xl p-4 shadow-lg">
              <div className="space-y-1">
                <div className="text-sm text-gray-400">Авторизован</div>
                <div className="text-white font-semibold">
                  {currentUser?.email} • {currentUser?.role}
                </div>
                <div className="text-xs text-gray-500 break-all">JWT: {token}</div>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-semibold transition"
              >
                Выйти
              </button>
            </div>

            <UserForm />
            <UsersTable />
          </div>
        )}
      </div>
    </div>
  );
}

export default App
