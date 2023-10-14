import { create } from "zustand";

export type FormType = "tag" | "book" | null;

type FormModalState = {
  form: FormType;
};

type FormModalActions = {
  setForm: (form: FormType) => void;
};

const useFormModalStore = create<FormModalState & FormModalActions>((set) => ({
  form: null,
  setForm: (form: FormType) => {
    set({ form });
  },
}));

export default useFormModalStore;
