import type { Component, ComponentPublicInstance } from "vue";

export enum ErrorLayout {
  ERROR_PAGE = "ERROR_PAGE",
  ERROR_COMPONENT = "ERROR_COMPONENT",
  ERROR_CUSTOM_COMPONENT = "ERROR_CUSTOM_COMPONENT",
}

export type ErrorCaptured = {
  error: Error;
  instance: ComponentPublicInstance | null;
  info: string;
};

export interface ErrorProviderProps {
  layout: ErrorLayout;
  customLayout?: Component | null;
  stopPropagation?: boolean;
}

export interface ErrorState {
  hasError: boolean;
  error: ErrorCaptured | null;
}
