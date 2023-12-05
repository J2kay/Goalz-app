// This action is responsible for setting the user data upon successful login
export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

// This action is responsible for logging the user out
export const logout = () => ({
  type: "LOGOUT",
});

// This action is responsible for handling login errors
export const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});
