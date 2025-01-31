import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { orderReducer } from './slices/order';

const rootReducer = combineReducers({
  orders: orderReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
