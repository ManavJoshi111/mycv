import { callApi } from '../utils';

const createInitialCv = (user = {}) => ({
  name: user.name || '',
  email: user.email || '',
  number: user.number || '',
  address: user.address || '',
  portfolio: user.portfolio || '',
  github: user.github || '',
  skills: Array.isArray(user.skills) ? user.skills : [],
  certificates: Array.isArray(user.certificates) ? user.certificates : [],
  achievements: Array.isArray(user.achievements) ? user.achievements : [],
  about: user.about || '',
  collegesdate: user.collegesdate || '',
  collegeedate: user.collegeedate || '',
  cname: user.cname || '',
  cpi: user.cpi || '',
  experience: Array.isArray(user.experience) ? user.experience : [],
  projects: Array.isArray(user.projects) ? user.projects : [],
});

export const createCvStore = (set, get) => ({
  cvUserId: '',
  cv: createInitialCv(),
  selectedTemplate: '',
  cvLoading: false,
  cvError: null,
  setCvFromUser: (user) =>
    set(() => ({
      cvUserId: user?._id || '',
      cv: createInitialCv(user),
      cvError: null,
    })),
  setSelectedTemplate: (template) => set(() => ({ selectedTemplate: template })),
  updateCvField: (field, value) =>
    set((state) => ({ cv: { ...state.cv, [field]: value } })),
  updateCvArrayItem: (field, index, value, key) =>
    set((state) => {
      const list = [...(state.cv[field] || [])];
      if (key) {
        const currentItem =
          list[index] && typeof list[index] === 'object' ? list[index] : {};
        list[index] = { ...currentItem, [key]: value };
      } else {
        list[index] = value;
      }
      return { cv: { ...state.cv, [field]: list } };
    }),
  addCvArrayItem: (field, initialValue) =>
    set((state) => ({
      cv: { ...state.cv, [field]: [...(state.cv[field] || []), initialValue] },
    })),
  saveCv: async () => {
    const { cvUserId, cv } = get();
    if (!cvUserId) {
      return;
    }

    try {
      set(() => ({ cvLoading: true, cvError: null }));
      await callApi('/update', { method: 'POST' }, { id: cvUserId, Name: cv });
      set(() => ({ cvLoading: false, cvError: null }));
    } catch (err) {
      const message = err?.response?.data?.error || err?.message || 'Could not save CV';
      set(() => ({ cvLoading: false, cvError: message }));
      throw new Error(message);
    }
  },
});
