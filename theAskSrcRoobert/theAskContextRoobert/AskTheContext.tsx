type RoobertUserSession = Record<string, unknown> | null;
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  useCallback as useRoobertCallback,
  createContext,
  type ReactNode,
  useMemo as useRoobertMemo,
  useState as useRoobertState,
  useEffect as useRoobertEffect,
} from 'react';


interface RoobertSessionCtx {
  sessionData: RoobertUserSession;
  clearSession: () => Promise<void>;
  saveSession: (payload: RoobertUserSession) => Promise<void>;
}

export const UserSessionContext = createContext<RoobertSessionCtx>({
  sessionData: null,
  clearSession: async () => {},
  saveSession: async () => {},
});

type RoobertProviderProps = { children: ReactNode };

const STORAGE_SLOT = 'ask_the_roobert_prof_of_session';

export const AskTheContext: React.FC<RoobertProviderProps> = ({ children }) => {
  const [sessionData, updateSession] = useRoobertState<RoobertUserSession>(null);

  // завантаження з памʼяті
  useRoobertEffect(() => {
    let alive = true;
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_SLOT);
        if (stored && alive) {
          updateSession(JSON.parse(stored));
        }
      } catch (error) {
        if (__DEV__) console.log('AskTheRoobert context init error:', error);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // функція, яка реально пише в AsyncStorage
  const commit = useRoobertCallback(async (data: RoobertUserSession) => {
    updateSession(data);
    try {
      if (data) {
        await AsyncStorage.setItem(STORAGE_SLOT, JSON.stringify(data));
      } else {
        await AsyncStorage.removeItem(STORAGE_SLOT);
      }
    } catch (error) {
      if (__DEV__) console.log('AskTheRoobert context save error:', error);
    }
  }, []);

  const saveSession = useRoobertCallback(async (payload: RoobertUserSession) => {
    await commit(payload);
  }, [commit]);

  const clearSession = useRoobertCallback(async () => {
    await commit(null);
  }, [commit]);

  const contextPayload = useRoobertMemo(
    () => ({
      sessionData,
      saveSession,
      clearSession,
    }),
    [sessionData, saveSession, clearSession]
  );

  return (
    <UserSessionContext.Provider value={contextPayload}>
      {children}
    </UserSessionContext.Provider>
  );
};
