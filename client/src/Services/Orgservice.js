import axios from 'axios';
import variables from '../Common';

export async function getOrgList() {
    const configuration = {
        url: variables.SERVER + 'org/',
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

export async function getOrgDetail(orgID) {
    const configuration = {
        url: variables.SERVER + 'org/' + orgID,
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

export async function AddOrg(data) {
    const configuration = {
        url: variables.SERVER + 'org/',
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

export async function EditOrg(orgId, data) {
    const configuration = {
        url: variables.SERVER + 'org/' + orgId,
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


export async function DeleteOrg(orgId) {
    const configuration = {
        url: variables.SERVER + 'org/' + orgId,
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