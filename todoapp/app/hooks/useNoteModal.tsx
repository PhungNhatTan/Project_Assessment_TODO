import { create } from 'zustand';

interface NoteModalState {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useNoteModal = create<NoteModalState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));

export default useNoteModal;