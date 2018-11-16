<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>


<!--<template>-->
    <!--<div class="container">-->
        <!--<div class="row" id="first">-->
            <!--<div class="form-group">-->
                <!--<div class="input-group">-->
                    <!--<input type="text" class="form-control" id="msg">-->
                    <!--<span class="input-group-btn">-->
            <!--<button class="btn btn-primary" type="button" id="send">Send-->
            <!--</button>-->
          <!--</span>-->
                <!--</div>-->
                <!--<p class="help-block">Example: "Hello", "4 Hello"</p>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--import '../grpc-web/client'-->
    <!--export default class Home extends Vue{}-->
<!--</script>-->
