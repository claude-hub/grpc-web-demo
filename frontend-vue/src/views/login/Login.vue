<template>
  <div>
    <el-input v-model="account" placeholder="账号"></el-input>
    <el-input v-model="password" placeholder="密码"></el-input>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      account: '',
      password: ''
    }
  }
}
</script>

<style scoped>

</style>
