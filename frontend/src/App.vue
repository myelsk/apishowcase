<template>
  <div class="container">
    <Project />
  </div>
</template>
<script>

  import Project from './components/Project.vue';

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
