<template>
  <div>
    <div
      data-type="transaction"
      :data-account-id="accountId"
      :data-amount="amount"
      :data-balance="balance"
      class="transaction-item my-5 p-5 border-2 text-black border-gray-300 text-left"
    >
      Transferred <span class="text-gray-500">{{ amount }}</span
      >$ to account <span class="text-gray-500"> {{ accountId }}</span>
      at
      <span class="text-right text-gray-700">
        {{ createdAt }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
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
    balance: {
      type: Number,
    },
  },
};
</script>

<style></style>
