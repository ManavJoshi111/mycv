import { create } from 'zustand';
import { createAuthStore } from './authStore';
import { createCvStore } from './cvStore';

const useStore = create((...a) => ({
  ...createAuthStore(...a),
  ...createCvStore(...a),
}));

export default useStore;
