import { create } from 'zustand';

const init: ZustandState = {
};

const useZustand = create<ZustandActions & ZustandState>(() => ({
    ...init,
}));

export default useZustand;
