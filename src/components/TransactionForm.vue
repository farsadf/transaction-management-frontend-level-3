<template>
  <div class="transaction">
    <p id="title">{{ title }}</p>
    <form @submit.prevent="addTransaction" id="new_transaction">
  <label class="form_field_lable" >
    Account Id:
    <input type="text" data-type="account-id" 
    :class="{ invalid: $v.accountId.$error }" @blur="$v.accountId.$touch()"
     v-model="accountId" class="form_field" />
  </label>
  <p v-if="!$v.accountId.required && $v.accountId.$dirty">this field is required</p>
  <p v-if="!$v.accountId.mustBeUuid && $v.accountId.$dirty">this field must be uuid v4 format</p>
      <label class="form_field_lable">
        Amount:
        <input type="number" @blur="$v.amount.$touch()" :class="{ invalid: $v.amount.$error }"
         data-type="amount" v-model="amount" class="form_field" />
           <p v-if="!$v.amount.required && $v.amount.$dirty">this field is required</p>
      </label>
  <input data-type="transaction-submit" type="submit" class="form_btn" />
</form>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid'
import { required, helpers  } from 'vuelidate/lib/validators'

const mustBeUuid = helpers.regex('id', /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)

export default {
  name: 'TransactionForm',
  props: {
  },
  data: () => {
    return {
    title: "Submit new Transaction",
      id: '',
      accountId: uuid(),
      amount: null,
      error: ''
    }
  },
  computed: {
  },
  methods: {
    addTransaction() {
      const transaction = {
        account_id: this.accountId,
        amount: this.amount
      }
      const options = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      this.$axios.post("/transactions",transaction, options)
      .then(() => {
        this.$axios.get('/transactions')
            .then(res => {
              console.log(res)
            })
            .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
      this.user.amount = ''
      this.id = ''
    }
  },
    validations () {
    return {
      accountId: { required, mustBeUuid },
      amount: { required },
    }
  },
}
</script>


<style scoped>

.transaction{
  border: 1px solid #000;
  border-radius: 10px;
  width: 100%;

}

#title{
  font-size: 2rem;
  margin-left: 15px;
}
.invalid{
  background-color: red;
}

#new_transaction{
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: start;
  padding: 20px;
}

.form_field_lable{
  width: 100%;
  display: flex;
  flex-flow: column;
  font-size: 1.3rem;
  justify-content: center;
  text-align: left;
}

.form_field{
width: 100%;
  height: 40px;
  margin: 10px 0;
}

.form_btn{
  width: 50%;
  height: 40px;
  border-radius: 10px;
  margin: 10px auto;
  font-size: 1rem;
  background-color: #fff;
  color: #000;
  cursor: pointer;
  transition: all 0.2s;
}

.form_btn:hover{
  background-color: gray;
  color: #fff;
}
</style>
