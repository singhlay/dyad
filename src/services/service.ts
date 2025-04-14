import axios from 'axios';

const API_BASE_URL = ' https://dev.dyadmd.com'; // Replace with your API base URL

// Create an Axios instance with a base URL
const apiService = axios.create({
  baseURL: API_BASE_URL,
});


// Function to post some data
export const formSubmit = async (data: any) => {
  try {
    const response = await apiService.post('/public/contact-us', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};