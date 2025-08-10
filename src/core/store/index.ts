import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import directionReducer from './features/direction/directionSlice';
import themeReducer from './features/theme/themeSlice';
import toastReducer from './features/toaster/toast.slice';

const themePersistConfig = {
  key: 'theme',
  storage,
};

const directionPersistConfig = {
  key: 'direction',
  storage,
};

const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);
const persistedDirectionReducer = persistReducer(directionPersistConfig, directionReducer);

export const store = configureStore({
  reducer: {
    theme: persistedThemeReducer,
    direction: persistedDirectionReducer,
    toast: toastReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
