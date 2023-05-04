<template>
  <main>
    <h1>タスク一覧</h1>
    <form @submit.prevent="handleSubmit">
      <div class="create-new">
        <input type="text" v-model="useTodoTask.newTask" placeholder="内容を入力してください。" @keyup.enter="add(useTodoTask.newTask)" maxlength="40" />
        <button @click="add(useTodoTask.newTask)">追加</button>
      </div>
    </form>
    <div class="tasks-options">
      <select v-model="useTodoTask.selectedValue" @change="onChange()">
        <option value='1'>すべて</option>
        <option value='2'>完了</option>
        <option value='3'>未完了</option>
      </select>
    </div>
    <div class="tasks">
      <div v-for="(task, i) in onChange()" :class="`task ${task.done ? 'is-complete' : ''}`">
        <div class="content">
          <h3 class="title">{{ task.title }}</h3>
          <div>作成日: {{ task.createAt.toLocaleDateString("ja-JP") }}</div>
        </div>
        <div class="buttons">
          <button @click="useTodoTask.update(task.id, update = { done: !task.done })">{{ task.done ? '未完了' : '完了'
          }}</button>
          <button @click="useTodoTask.remove(task.id)" class="delete">削除</button>
        </div>
      </div>
    </div>

  </main>
</template>

<script setup>
import { useTodoTaskStore } from '~/store';
const useTodoTask = useTodoTaskStore()
const { add } = useTodoTask

const dropdownVal = computed(() => {
    const stringVal = useTodoTask.selectedValue;
    return stringVal
})

const onChange = () =>{
  const valueChange = dropdownVal.value;
  if(valueChange=="2"){
    return useTodoTask.getDoneTodos();
  }
  else if(valueChange=="3"){
    return useTodoTask.getUnDoneTodos();
  }
  return useTodoTask.getAll()
}
const handleSubmit = () => {
  if (useTodoTask.newTask) {
    useTodoTask.newTask = "";
  }
}
</script>
<!-- 
<script>
export default {
  data() {
    return {
      newTask: ""
    };
  },
  methods: {
    handleSubmit() {
      if (this.newTask) {
        this.newTask = "";
      }
    }
  }
}
</script> -->
