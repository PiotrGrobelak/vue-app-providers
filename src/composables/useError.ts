import type { ComponentPublicInstance } from "vue";
import { reactive } from "vue";

export interface UseError {
  setError: (error: ErrorType) => void;
  getError: () => ErrorType | null;
}

export type ErrorType = {
  error: Error;
  instance: ComponentPublicInstance | null;
  info: string;
};

export interface ErrorState {
  error: ErrorType | null;
}

const state: ErrorState = reactive({
  error: null,
});

const useError = (): UseError => {
  const setError = (error: ErrorType) => {
    console.log("error", error);
    state.error = error;
  };

  const getError = () => {
    return state.error;
  };

  return {
    setError,
    getError,
  };
};

export default useError;
