<template>
  <div>
    <div
      data-type="transaction"
      :data-account-id="{ accountId }"
      :data-amount="amount"
      :data-balance="amount"
      class="transaction-item my-5 p-5 border-2 border-gray-300 text-left"
    >
      Transferred {{ amount }}$ to account {{ id }}
      at
      <span class="text-right">
        {{ createdAt }}
      </span>
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
