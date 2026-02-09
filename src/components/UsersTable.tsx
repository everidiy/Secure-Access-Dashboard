import { useUserStore } from "../stores_zustand/useUserStore";

export function UsersTable() {
    const { users, toggleActive, removeUser } = useUserStore();

  return (
    <div className="overflow-x-auto mt-8 max-w-4xl mx-auto rounded-xl">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-800 text-gray-300 uppercase text-sm">
          <tr>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Role</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-700 text-gray-200">
          {users.map((u) => (
            <tr key={u.id}>
              <td className="px-6 py-4">{u.email}</td>
              <td className="px-6 py-4 capitalize">{u.role}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    u.isActive ? "bg-green-600 text-white" : "bg-red-600 text-white"
                  }`}
                >
                  {u.isActive ? "Active" : "Disabled"}
                </span>
              </td>
              <td className="px-6 py-4 flex gap-2">
                <button
                  onClick={() => {
                    const err = toggleActive(u.id);
                    if (err) alert(err);
                  }}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-white text-sm transition"
                >
                  Toggle
                </button>
                <button
                  onClick={() => {
                    const err = removeUser(u.id);
                    if (err) alert(err);
                  }}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}