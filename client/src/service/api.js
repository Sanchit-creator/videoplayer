import axios from 'axios'

const URL = 'http://localhost:3000'

export const signUpAdmin = async(data) => {
    try {
        return await axios.post(`${URL}/api/admin/register-admin`, data)
    } catch (error) {
        console.log('Error while calling signup api', error.response.data);
    }
}

export const signInAdmin = async(data) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }
        const result = await axios.post(`${URL}/api/admin/login`, data, config)
        return result.data;
    } catch (error) {
        console.log('Error while calling signin api', error.response.data);
    }
}


export const signUpUser = async(data) => {
    try {
        return await axios.post(`${URL}/api/user/signup`, data)
    } catch (error) {
        console.log('Error while calling signup api', error.response.data);
    }
}

export const signInUser = async(data) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }
        const result = await axios.post(`${URL}/api/user/login`, data, config)
        return result.data;
    } catch (error) {
        console.log('Error while calling signin api', error.response.data);
    }
}

export const getUsers = async () => {
    try {
        const config = {
            headers: {
                authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        return await axios.get(`${URL}/api/admin/users`, config);
    } catch (error) {
        console.log('Error', error.response.data);
    }
}

export const getU = async (data) => {
    try {
        const config = {
            headers: {
                authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        return await axios.get(`${URL}/api/admin/user/${data}`, config);
    } catch (error) {
        console.log('Error', error.response.data);
    }
}

export const updateUser = async (data) => {
    try {
        const config = {
            headers: {
                authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        return await axios.patch(`${URL}/api/admin/update/${data.params}`, data.data, config);
    } catch (error) {
        console.log('Error', error.response.data);
    }
}

export const postVideo = async (data) => {
    try {
        const config = {
            headers: {
                authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        return await axios.post(`${URL}/api/user/post`, data, config);
    } catch (error) {
        console.log('Error', error.response.data);
    }
}

export const deleteUser = async (data) => {
    try {
        const config = {
            headers: {
                authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        return await axios.post(`${URL}/api/admin/delete/${data}`, data, config);
    } catch (error) {
        console.log('Error', error.response.data);
    }
}

export const getVideos = async () => {
    try {
        const config = {
            headers: {
                authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        return await axios.get(`${URL}/api/user/get`, config);
    } catch (error) {
        console.log('Error', error.response.data);
    }
}

export const getV = async (data) => {
    try {
        const config = {
            headers: {
                authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        return await axios.get(`${URL}/api/user/getone/${data}`, config);
    } catch (error) {
        console.log('Error', error.response.data);
    }
}





