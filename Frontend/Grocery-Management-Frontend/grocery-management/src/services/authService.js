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
};