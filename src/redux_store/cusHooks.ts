import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import type { AppDispatch, RootState } from '.'

type DispatchFunc = () => AppDispatch

export const cusSelector: TypedUseSelectorHook<RootState> = useSelector
export const cusDispatch: DispatchFunc = useDispatch
