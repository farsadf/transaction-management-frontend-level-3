<template>
  <div
    class="lg:w-4/12 w-full border-r-2 border-gray-900 lg:h-screen mt-20 lg:mt-0 flex justify-center m-0"
  >
    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col lg:mt-52 border-gray-100 border-2 p-5 w-7/12 lg:w-11/12 h-96 justify-between items-center"
    >
      <span class="err text-red-500">{{ err }}</span>

      <label class="self-start" for="id-input">Account Id:</label>
      <input
        v-model="accountId"
        class="block border-gray-200 border-2 outline-none w-full focus:border-gray-400 p-2"
        id="id-input"
        data-type="account-id"
      />
      <label class="self-start" for="amount">Amount:</label>
      <input
        v-model="amount"
        id="amount"
        data-type="amount"
        class="border-gray-200 border-2 outline-none focus:border-gray-400 p-2 w-full"
      />
      <input
        data-type="transaction-submit"
        class="bg-blue-400 text-white hover:bg-blue-600 transition-all px-5 py-2 mt-4 cursor-pointer rounded"
        type="submit"
      />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: "",
      accountId: "",
      err: "",
      balance: "",
    };
  },
  methods: {
    handleSubmit() {
      let data = {
        account_id: this.accountId,
        amount: this.amount,
      };
      if (
        this.accountId === "0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2" &&
        typeof +this.amount === "number"
      ) {
        fetch("https://infra.devskills.app/api/accounting/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => this.$emit("newTransaction", data));
        this.amount = "";
        this.accountId = "";
      } else {
        this.err = "you're account number or amount is unvalid";
      }
    },
  },
};
</script>

<style></style>
