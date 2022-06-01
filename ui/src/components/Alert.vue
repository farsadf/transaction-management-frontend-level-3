<template>
    <v-alert
        :type="status"
        class="alert"
        text
        icon="-"
    >
        {{message}}
    </v-alert>
</template>

<script>

  export default {
    name: 'Alert',

    props: {
        message: Object,
        status: String,
        alert:Object,
    },

    data: () => ({
        
    }),

    mounted(){
        setTimeout(()=>this.$store.commit('removeItem',alert),3000);
    }
  }
</script>


