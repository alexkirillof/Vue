<template>
  <div>
    <div>
      <input type="number" v-model.number="op1" >
      <input type="number" v-model.number="op2" >
      ={{result}}
    </div>
     <div>
       <button @click="summ">+</button>
       <button @click="diff">-</button>
       <button @click="division">/</button>
       <button @click="mult">*</button>
       <button @click="deg">^</button>
       <button @click="integer">%</button>
     </div>
  </div>
</template>

<script>
export default {
  name: 'Calc',
  components: {},
  props: {},
  data () {
    return {
      op1: 0,
      op2: 0,
      result: 0
    }
  },
  mounted () {},
  methods: {
    summ () {
      this.result = this.op1 + this.op2
    },
    diff () {
      this.result = this.op1 - this.op2
    },
    division () {
      this.result = this.op1 / this.op2
      if (this.op2 === 0) {
        this.result = 0
      }
    },
    mult () {
      this.result = this.op1 * this.op2
    },
    deg () {
      this.result = this.op1 ** this.op2
    },
    integer () {
      this.result = this.op1 % this.op2
    }

  }
}
</script>
 <style lang="css" scoped>
input{
   margin-left:20px;
   margin-bottom: 20px;
 }
 button{
   font-weight: 700;
   width: 30px;
   height: 30px;
   text-align: center;
   align-items: center;
   border:1px solid;
   border-radius: 15px;
 }
</style>
