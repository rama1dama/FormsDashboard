import { create } from "zustand";
import type { Role } from "@/lib/types";

interface AuthState {
  email: string | null;
  role: Role | null;
  setAuth: (email: string, role: Role) => void;
  clearAuth: () => void;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  email: null,
  role: null,
  setAuth: (email, role) => set({ email, role }),
  clearAuth: () => set({ email: null, role: null }),
  isAdmin: () => get().role === "Admin",
}));
