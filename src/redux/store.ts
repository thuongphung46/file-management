import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "redux/slice";

export const store = configureStore({
  reducer: {
    data: rootReducer.data,
    availableVersionData: rootReducer.availableVersions,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
