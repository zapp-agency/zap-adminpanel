import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import directionReducer from './features/direction/directionSlice';
import themeReducer from './features/theme/themeSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme',"direction"],
};

const persistedThemeReducer = persistReducer(persistConfig, themeReducer);
const persistedDirectionReducer = persistReducer(persistConfig, directionReducer);

export const store = configureStore({
  reducer: {
    theme: persistedThemeReducer,
    direction:persistedDirectionReducer
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