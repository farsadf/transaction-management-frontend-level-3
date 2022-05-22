<template>
  <div id="app">
    <section id="form_section">
      <TransactionForm msg="Welcome to Your Vue.js App"/>
    </section>
    <section id="list_section">
      <TransactionList />
    </section>
<!--    <router-view></router-view>-->
  </div>
</template>

<script>
import TransactionForm from '../components/TransactionForm.vue'
import TransactionList from '../components/TransactionList.vue'

export default {
  name: 'HO',
  components: {
    TransactionForm,
    TransactionList
  }
}
</script>

<style>
#app {
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-evenly;
}

#form_section{
  width: 35%;
}

#list_section{
  width: 55%;
}
</style>
