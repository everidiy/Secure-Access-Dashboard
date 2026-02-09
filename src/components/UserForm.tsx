import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, type UserFormData } from "../schemas_zod/userSchema";
import { useUserStore } from "../stores_zustand/useUserStore";

export function UserForm() {
    const addUser = useUserStore((s) => s.addUser);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UserFormData>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            role: "viewer",
            isActive: true,
        },
    });

    const onSubmit = (data: UserFormData) => {
        const error = addUser({
            userName: data.userName,
            email: data.email,
            password: data.password,
            role: data.role,
            isActive: data.isActive,
        });

        if (!error) reset();
        else alert(error);
    }

    return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-900 p-6 rounded-xl shadow-lg space-y-5 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-white">Create User</h2>

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

      <div>
        <select
          {...register("role")}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <label className="flex items-center gap-2 text-white">
        <input
          type="checkbox"
          {...register("isActive")}
          className="accent-purple-500"
        />
        Active
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition"
      >
        Create
      </button>
    </form>
  );
}
