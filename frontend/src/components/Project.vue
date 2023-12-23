<template>
  <div class="add-project-block">
    <span class="btn add-project-btn" @click="validateAndCreateProject()">
    Add Project
  </span>
    <input type="text" class="project-title-input">
  </div>
  <div class="projects" :key="componentKey">
    <div v-for="project in projects" class="project-item" :project-item-id="project.id">

      <div class="project-name">
        Project Name:
        <span class="project-name-label" :project-label-id="project.id">
        {{ project.name }}
      </span>
        <input class="project-name-label-edit hidden" :project-input-id="project.id">
        <span class="cancel-button hidden" :project-button-cancel-id="project.id">
        X
      </span>
        <span class="accept-button hidden" :project-button-accept-id="project.id">
        ✔
      </span>
      </div>
      <div class="add-task-block">
      <span class="add-task-btn" @click="postTask(project.id)">
      Add task
    </span>
        <input type="text" class="task-title-input">

        <ul class="tasks">
          <ProjectTask :project_id="project.id" />
        </ul>
      </div>

      <div class="change-block">
      <span class="remove-project" :project_id="project.id" @click="removeProject(project.id)">
        Remove
      </span>
        <span class="edit-project" :project_id="project.id" @click="putProject(project.id)">
        Edit
      </span>
      </div>
    </div>
  </div>
</template>

<script>

import Task from './ProjectTask.vue';
import ApiService from "../services/ApiService";


const server = new ApiService();
var projectId;

export default {
  methods: {
    validateAndCreateProject: function() {
      let input = document.querySelector('.project-title-input');
      if (!input.value) {
        input.classList.add('invalid');
      } else {
          input.classList.remove('invalid');
          this.$store.dispatch('postProject', input.value);
          input.value = '';

      }
    },
    removeProject: function(projectId) {
      this.$store.dispatch('destroyProject', projectId)
    },
    putProject: function(projectId) {
      let input = document.querySelector(`input[project-input-id='${projectId}']`);
      let label = document.querySelector(`span[project-label-id='${projectId}']`);
      let cancelButton = document.querySelector(`span[project-button-cancel-id='${projectId}']`);
      let acceptButton = document.querySelector(`span[project-button-accept-id='${projectId}']`);
      label.classList.add('hidden');
      input.classList.remove('hidden');
      cancelButton.classList.remove('hidden');
      acceptButton.classList.remove('hidden');
      input.setAttribute('value', label.textContent);
      cancelButton.addEventListener('click', function() {
        if (input.value) {
          input.classList.remove('invalid');
        } else {
          input.classList.add('invalid');
        }
        label.classList.remove('hidden');
        input.classList.add('hidden');
        acceptButton.classList.add('hidden');
        this.classList.add('hidden');
        input.value = label.textContent;
      });

      function sendData() {
        if (input.value) {
          server.putProject({name: input.value}, projectId);
          input.classList.remove('invalid');
          label.classList.remove('hidden');
          input.classList.add('hidden');
          cancelButton.classList.add('hidden');
          this.classList.add('hidden');
          label.textContent = input.value;
        } else {
          input.classList.add('invalid');
        }
        acceptButton.removeEventListener("click", sendData);
      }
      acceptButton.addEventListener("click", sendData);

    },
    postTask: function(projectId) {
      let input = document.querySelector(`.project-item[project-item-id='${projectId}'] .task-title-input`);
      let response = server.postTask({project_id: projectId, name: input.value});
      // response.then(function response(r) {
      //   projectId = r.data[0].id;
      //   input.value = '';
      // });
    }
  },
  computed: {
    projects() {
      return this.$store.state.projects;
    },
  },
  created() {
    this.$store.dispatch('loadProjects');
  },
  // updated() {
  //   let project = document.querySelector('.projects > .project-item');
  //   if (!project.hasAttribute('project-item-id')) {
  //     this.$store.dispatch('loadProjects');
  //   }
  // },
  components: {
    'ProjectTask': Task
  }
}

</script>

<style>
 .project-item {
   background: #636b6f;
   color: floralwhite;
   padding: 20px;
   border-bottom: 1px solid black;
   position: relative;
 }

 .project-item:nth-last-child {
   border: 0;
 }

 .add-task-btn {
   display: inline-block;
   padding: 4px;
   background: #a1d9ff;
   color: #000;
   cursor: pointer;
   margin-top: 10px;
 }

 .add-task-btn:hover {
   background: #5d5dff;
 }

 .task-title-input {
   padding: 6px;
   background: #a1d9ff;
   color: #000;
   margin: 0 10px;
   outline: 0;
 }

 ul.tasks {
   padding: 0 15px;
 }

 .change-block {
   position: absolute;
   right: 20px;
   top: 20px;
   font-size: 13px;
 }

 .change-block span {
   cursor: pointer;
 }

 .change-block span:hover {
   color: #a1d9ff;
 }

 .hidden {
   display: none;
 }

 .project-name-label-edit {
   background: #a1d9ff;
   color: #000;
   margin: 0 10px;
   outline: 0;
 }

 .cancel-button,
 .accept-button {
   margin-left: -30px;
   color: #000;
   cursor: pointer;
 }

 .add-project-btn {
   display: inline-block;
   padding: 10px;
   background: #a1d9ff;
   color: #000000;
   margin: 20px 0;
   cursor: pointer;
 }
 .add-project-btn:hover {
   background: #5d5dff;
 }

 .project-title-input {
   padding: 12px;
   background: #a1d9ff;
   color: #000;
   margin: 0 10px;
   outline: 0;
 }

 .invalid {
   border: 1px solid red;
 }


</style>
