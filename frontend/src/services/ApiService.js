import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8087/api';

export default class ApiService {

    async getProjects() {
        return await axios.get(`${baseUrl}/projects`);
    }

    async postProject(data) {
        return await axios.post(`${baseUrl}/project`, data);
    }

    async destroyProject(projectId) {
        return await axios.delete(`${baseUrl}/project/${projectId}`)
    }

    async putProject(data, projectId) {
        return await axios.put(`${baseUrl}/project/${projectId}`, data);
    }

    async postTask(data) {
        return await axios.post(`${baseUrl}/task`, data);
    }

    async getTasks() {
        return await axios.get(`${baseUrl}/tasks`)
    }

    async toggleDone(taskId) {
        return await axios.put(`${baseUrl}/task/${taskId}`)
    }
}
