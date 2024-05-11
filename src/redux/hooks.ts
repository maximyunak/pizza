import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// import { TypedUseSelectorHook, useDispatch } from 'react-redux';
// // import { AppDispatch, RootState } from "../store/store";
// import { useSelector } from 'react-redux';
// import { AppDispatch, RootState } from './store';

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
