import { put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, take } from "redux-saga/effects";
import { LoginPayload, authActions } from "redux/slices/authSlice";
import { AuthService } from "services/auth_service";
import { clearToken, setToken } from "common/function";
import { ApiRes } from "types/ApiResponse";
import { toastMessage } from "component/molecules/toast/index";

function* handleLogin(payload: LoginPayload) {
  try {
    const response: ApiRes = yield call(AuthService.LoginAdmin, payload);
    if (response.status === "OK") {
      let token = response.data[0].id;
      setToken(token);
      yield put(
        authActions.loginSuccess({
          id: 1,
          name: payload.UserName,
        })
      );
      toastMessage(`Wellcome ${payload.UserName}`, "success");
    } else {
      yield put(authActions.loginFailed(response.message)); // Dispatch action
      toastMessage(response.message, "error");
    }
  } catch (error: any) {
    yield put(authActions.loginFailed(error.message));
    toastMessage(error.message, "error");
  }
}

function* handleLogout() {
  yield put(authActions.logout());
  yield clearToken();
  // Redirect to Login page
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(
        authActions.login.type
      );
      yield fork(handleLogin, action.payload); // Non-blocking
    } else {
      yield take(authActions.logout.type);
      yield call(handleLogout);
    }
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
