<template>
 <div>
   <div class="calc-top">
      <input type="number" v-model.number="op1" >
      <input type="number" v-model.number="op2" >
      = {{result}}
    <div class="error" v-if="error">
      {{error}}
    </div>
    <div class="massages">
      <template v-if="result<0">Отрицательное число</template>
      <template v-else-if="result<100">Результат в первой сотне</template>
      <template v-else>просто результат</template>
    </div>
   </div>
     <div class="btns">
       <button v-for="operation of operations"
       @click="calculate(operation)"
       :key="operation"
       >{{operation}}</button>
     </div>
  <div class="keyboard-check">
      <input
        id="checkshow"
        type="checkbox"
        v-model="CheckKeyboard"
      />
      <label for="checkshow">Отобразить экранную клавиатуру</label>
    </div>
    <div class="keyboard" v-show="CheckKeyboard">
      <div class="buttons">
        <button
          class="screen-keyboard__button"
          type="button"
          v-for="Keyboard in Keyboards"
          :key="Keyboard.char"
          :title="Keyboard.title"
          @click="inputItem (Keyboard.char)"
        >
          {{ Keyboard.char }}
        </button>
        <button
          class="delete_btn"
          type="button"
          title="Удалить"
          @click="deleteItem"
        >
          &#8592;
        </button>
      </div>
       <input
        id="op1"
        type="radio"
        name="fieldSelection"
        value="op1"
        v-model="CheckedOperand"
        checked
      />
      <label for="operand1">Операнд 1</label>
      <input
        id="op2"
        type="radio"
        name="fieldSelection"
        value="op2"
        v-model="CheckedOperand"
      />
      <label for="operand2">Операнд 2</label>
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
      result: 0,
      error: '',
      operations: ['+', '-', '/', '*', '^', '%'],
      Keyboards: [{ char: '0', title: '0' },
        { char: '1', title: '1' },
        { char: '2', title: '2' },
        { char: '3', title: '3' },
        { char: '4', title: '4' },
        { char: '5', title: '5' },
        { char: '6', title: '6' },
        { char: '7', title: '7' },
        { char: '8', title: '8' },
        { char: '9', title: '9' }],
      CheckKeyboard: false,
      CheckedOperand: 'op1'
    }
  },
  mounted () {},
  methods: {
    summ () {
      const { op1, op2 } = this
      this.result = op1 + op2
    },
    diff () {
      const { op1, op2 } = this
      this.result = op1 - op2
    },
    division () {
      const { op1, op2 } = this
      if (op2 === 0) {
        this.error = 'На ноль делить нельзя!!'
      } else this.result = op1 / op2
    },
    mult () {
      const { op1, op2 } = this
      this.result = op1 * op2
    },
    deg () {
      const { op1, op2 } = this
      this.result = op1 ** op2
    },
    integer () {
      const { op1, op2 } = this
      this.result = Math.floor(op1 / op2)
    },
    calculate (operation) {
      this.error = ''
      switch (operation) {
        case '+': this.summ(); break
        case '-': this.diff(); break
        case '/': this.division(); break
        case '*': this.mult(); break
        case '^': this.deg(); break
        case '%': this.integer(); break
      }
    },
    inputItem (char) {
      const operand = this.CheckedOperand
      console.log(operand)
      const value = String(this[operand])
      console.log(value)
      this[operand] = Number(value + char)
    },
    deleteItem () {
      const operand = this.CheckedOperand
      this[operand] = Math.trunc(this[operand] / 10)
    }
  }
}
</script>
 <style lang="scss" scoped>
input{
   margin-left:20px;
   margin-bottom: 20px;
 }
 button {
   font-weight: 700;
   width: 30px;
   height: 30px;
   text-align: center;
   align-items: center;
   border:1px solid;
   border-radius: 15px;
   margin-left: 15px;
   margin-bottom: 100px;
 }
 .buttons {
   display: flex;
   justify-content: center !important;
 }
 .error, .massages, .btns{
   margin-bottom: 20px;
 }
</style>
