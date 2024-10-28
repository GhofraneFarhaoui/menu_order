import axios from 'axios';
const API_URL = 'http://localhost:3000/auth';

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'An unexpected error occurred';
    } else {
      throw 'An unexpected error occurred';
    }
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};
