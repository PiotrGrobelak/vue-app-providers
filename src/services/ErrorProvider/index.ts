import ErrorProvider from "./ErrorProvider.vue";

export const ErrorStateSymbol = Symbol("State provider");
export const ErrorSetSymbol = Symbol("Set provider");
export const ErrorClearSymbol = Symbol("Clear provider");

export default ErrorProvider;
