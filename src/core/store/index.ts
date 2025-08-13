import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import directionReducer from './features/direction/directionSlice';
import themeReducer from './features/theme/themeSlice';
import toastReducer from './features/toaster/toast.slice';

const rootReducer = combineReducers({
  theme: themeReducer,
  direction: directionReducer,
  toast: toastReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme', 'direction'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
          'persist/FLUSH',
        ],
      },
    }),
  // devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
