<template>
  <div>
    <div class="transaction-item p-5 border-2 border-gray-300 text-left">
      Transferred {{ amount }}$ to account {{ id }}
    </div>
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
