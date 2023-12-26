// api.ts
import axios from 'axios';

// Define the base URL for your API
const baseURL = 'http://localhost:3000'; // Replace with your actual API URL

// Function to make a GET request
export const fetchData = async (endpoint: string) => {
  try {
    const response = await axios.get(`${baseURL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Function to make a POST request
export const postData = async (endpoint: string, data: any) => {
  try {
    const response = await axios.post(`${baseURL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
