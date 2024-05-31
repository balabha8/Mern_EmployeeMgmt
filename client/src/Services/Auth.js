import axios from 'axios';

export async function login(data) {
    const configuration = {
        url: 'http://localhost:4000/api/login',
        method: 'post',
        data: data
    };
    try {
        const response = await axios(configuration);
        console.log(response);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}