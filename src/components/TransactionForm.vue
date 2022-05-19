<template>
  <div
    class="w-4/12 border-r-2 border-gray-900 min-h-screen flex justify-center m-0"
  >
    <form
      @submit.prevent=""
      class="flex flex-col lg:mt-52 border-gray-100 border-2 p-5 w-11/12 h-96 justify-between items-center"
    >
      <label class="self-start" for="id-input">Account Id:</label>
      <input
        class="block border-gray-200 border-2 outline-none w-full focus:border-gray-400 p-2"
        id="id-input"
        data-type="account-id"
      />
      <label class="self-start" for="amount">Amount:</label>
      <input
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
export default {};
</script>

<style></style>
