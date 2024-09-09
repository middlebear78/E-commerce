import api from "../../utils/api";
export const createOrUpdateUser = async (authtoken) => {
  try {
    const response = await api.post(
      "/create-or-update-user",
      {},
      {
        headers: {
          authtoken: authtoken,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error in createOrUpdateUser:", error.message);
    throw error;
  }
};

export const currentUser = async (authtoken) => {
  try {
    const response = await api.post(
      "/current-user",
      {},
      {
        headers: {
          authtoken: authtoken,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error in getting current user:", error.message);
    throw error;
  }
};

export const currentAdmin = async (authtoken) => {
  try {
    const response = await api.post(
      "/current-admin",
      {},
      {
        headers: {
          authtoken: authtoken,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error in fetching current admin:", error.message);
    throw error;
  }
};
