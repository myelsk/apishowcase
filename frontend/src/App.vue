<template>
  <div class="container">
    <Project :key="componentKey" @forceRerender="forceRerender()" />
  </div>
</template>
<script>

  import Project from './components/Project.vue';
  import ApiService from "./services/ApiService";

  export default {
    components: {
      'Project': Project
    }
  }
</script>

<style>
  .container {
    width: 1024px;
    margin: 0 auto;
  }
</style>
