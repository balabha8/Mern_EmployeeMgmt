import axios from 'axios';
import variables from '../Common';

export async function getEmpList() {
    const configuration = {
        url: variables.SERVER + 'emp/',
        method: 'get',
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

export async function getEmpDetail(empId) {
    const configuration = {
        url: variables.SERVER + 'emp/' + empId,
        method: 'get',
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

export async function getEmpListByFilter(data) {
    const configuration = {
        url: variables.SERVER + 'emp/getOne',
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

export async function AddEmp(data) {
    const configuration = {
        url: variables.SERVER + 'emp/',
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

export async function EditEmp(orgId, data) {
    const configuration = {
        url: variables.SERVER + 'emp/' + orgId,
        method: 'put',
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


export async function DeleteEmp(orgId) {
    const configuration = {
        url: variables.SERVER + 'emp/' + orgId,
        method: 'delete',
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