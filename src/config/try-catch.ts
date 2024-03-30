import { commonActions } from "@/redux_store/common/commonSlice";

export const tryCatch = async <T, U>(fn: () => T, fnError?: (error: any) => U) => {
  try {
    return await fn();
  } catch (error) {
    fnError && (await fnError(error));
  }
};
