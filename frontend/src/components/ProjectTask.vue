<template>
  <div v-for="task in tasks">
    <div class="task-item">
      <input type="checkbox" :checked="task.isDone" @click="toggleDone(task.id)">
      <span class="task-label">{{ task.name }}</span>
    </div>
  </div>
</template>

<script>

export default {
  props: ['project_id'],
  created() {
    this.$store.dispatch('loadTasks');
  },
  computed: {
    tasks() {
      return this.$store.state.tasks.filter(task => (task.project_id == this.project_id));
    },
  },
  methods: {
    toggleDone: function(taskId) {
      this.$store.dispatch('toggleDone', taskId);
    }
  }
}

</script>

<style>
  .task-item {
    background: #a1d9ff;
    padding: 10px;
    margin: 5px 0;
    color: #000;
  }

  .task-label {
    display: inline-block;
    margin-left: 10px;
    color: #000;
  }
</style>
