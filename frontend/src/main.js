import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex';
import ApiService from './services/ApiService';

const server = new ApiService();

const store = createStore({
    state: {
        projects: [],
        tasks: [],
    },
    mutations: {
        SAVE_PROJECTS(state, projects) {
            state.projects = projects;
        },
        SAVE_TASKS(state, tasks) {
            state.tasks = tasks;
        },
        PUSH_PROJECT(state, project) {
            state.projects.push(project);
        },
        PUSH_TASK(state, task) {
            state.tasks.push(task);
        },
        REMOVE_PROJECT(state, projectId) {
            state.projects.forEach((item, index) => {
                if (item.id === projectId) {
                    state.projects.splice(index, 1);
                }
            });
        }
    },
    actions: {
        loadProjects({commit}) {
            server.getProjects().then(result => {
               commit('SAVE_PROJECTS', result.data.projects)
            });
        },
        postProject({commit}, name) {
            let response = server.postProject({name: name});
            response.then(function response(r) {
                commit('PUSH_PROJECT', {id: r.data[0].id, name: name});
            });
        },
        destroyProject({commit}, projectId) {
            server.destroyProject(projectId);
            commit('REMOVE_PROJECT', projectId);
        },
        postTask({commit}, data) {
            let response = server.postTask(data);
            response.then(function response(r) {
                commit('PUSH_TASK', {project_id: r.data.project_id, name: r.data.name, isDone: false, id: r.data.id});
            });
        },
        loadTasks({commit}) {
            server.getTasks().then(result => {
                commit('SAVE_TASKS', result.data.tasks)
            });
        },
        toggleDone({commit}, taskId) {
            server.toggleDone(taskId);
        }
    },
});


createApp(App).use(store).mount('#app')
