import { create } from 'zustand';
import { createAuthStore } from './authStore';

const useStore = create((...a) => ({
  ...createAuthStore(...a),
}));

export default useStore;
