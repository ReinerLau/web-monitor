<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const onClick = () => {
  test1()
}

const visible = ref(false)

const onAsync = () => {
  setTimeout(() => {
    test1()
  }, 0)
}

const onPromise = () => {
  new Promise((resolve) => {
    test1()
    resolve('test')
  })
}

const onXHR = () => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:5173/test', true)
  xhr.send(JSON.stringify({ name: 'test' }))
}

const onAxios = () => {
  axios.get('/test', {
    params: {
      name: 'test'
    },
    data: {
      name: 'test'
    }
  })
}
</script>
<template>
  <el-button @click="onClick">运行错误</el-button>
  <button @click="visible = true">资源加载错误</button>
  <button @click="onAsync">异步错误</button>
  <button id="promise" class="promise" @click="onPromise">promise 错误</button>
  <button @click="onXHR">xhr 请求错误</button>
  <button @click="onAxios">axios 请求错误</button>
  <div>
    <img src="/images/test.jpg" />
    <img v-if="visible" src="http://www.abc.com/test.png" />
  </div>
</template>
