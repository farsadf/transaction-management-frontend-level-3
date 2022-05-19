<template>
  <div
    class="transaction-item border-2 w-full border-gray-400 h-10 text-center"
  >
    Transferred {{ amount }}$ to account {{ id }}
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
    },
    accountId: {
      type: String,
    },
    amount: {
      type: Number,
    },
    createdAt: {
      type: String,
    },
  },
};
</script>

<style></style>
