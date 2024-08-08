// utils/gitUtils.js
import axios from "axios";

export const fetchCodeSnippet = async (githubRawUrl) => {
    try {
        // Fetch the raw content directly from the provided URL
        const response = await axios.get(githubRawUrl);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching code snippet:', error);
        throw error; // Re-throw the error after logging
    }
};
