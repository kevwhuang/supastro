import { create } from 'zustand';

const initialize: ZustandState = {
};

const useZustand = create<ZustandActions & ZustandState>(() => ({
    ...initialize,
}));

export default useZustand;
