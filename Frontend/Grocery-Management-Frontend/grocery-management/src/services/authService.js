import API from "./api";

/**
 * Login API
 */
export const login = async (data) => {
  try {
    const response = await API.post("/api/auth/login", {
      email: data.email,
      password: data.password,
    });

    return response.data;

  } catch (error) {
    throw error; // let UI handle it
  }
};

/**
 * Register API
 */
export const register = async (data) => {
  try {
    const response = await API.post("/api/auth/register", {
      name: data.name,
      email: data.email,
      password: data.password,
    });

    return response.data;

  } catch (error) {
    throw error;
  }
}

// forget password
export const forgotPassword = async (data) => {
  try {
    const response = await API.post("/api/auth/forgot-password", {
      email: data.email,
    });

    return response.data;

  } catch (error) {
    throw error;
  }
}

//reset password
export const resetPassword = async (data) => {
  try {
    const response = await API.post("/api/auth/reset-password", {
      email: data.email,
      otp: data.otp,
      newPassword: data.password,
    });

    return response.data;

  } catch (error) {
    throw error;
  }
}


//get profile
export const getProfile = async () => {

  try {

    const response = await API.get(
      "/api/users/profile"
    );

    return response.data;

  } catch (error) {

    throw error;

  }
};