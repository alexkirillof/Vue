<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Калькулятор" :isShow="true"/>
    <!-- <button @click="increase(2,$event)">Increapse</button>
    <button @click="reset">reset</button>
     {{counter}} -->
     <Calc/>
  </div>
 </template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Calc from './pages/Calc.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    Calc
  },
  data () {
    return {
      counter: 0,
      str: 'Hellow'
    }
  },
  methods: {
    increase (step, event) {
      console.log(event)
      this.counter += step
    },
    reset () {
      this.counter = 0
    },
    input (event) {
      console.log(event.target.value)
    },
    blur () {
      console.log(blur)
    },
    focus () {
      console.log(focus)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.keybtns{
  display: flex;
  justify-content: center;
  gap:10px;
}
button{
   font-weight: 700;
   width: 30px;
   height: 30px;
   text-align: center;
   align-items: center;
   border:1px solid;
   border-radius: 15px;
   margin-left: 15px;
 }
</style>
