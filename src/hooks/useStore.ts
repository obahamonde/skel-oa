import { create } from 'zustand';
type State<T> = T;
type Actions<T> = (set: (fn: (prevState: T) => T) => void) => T;
export default function useStore<T>(actions: Actions<T>): [() => State<T>, (fn: (state: State<T>) => State<T>) => void] {
	const useStore = create<T>(set => ({
		...actions(set)
	}));

	return [useStore, useStore.setState];
}