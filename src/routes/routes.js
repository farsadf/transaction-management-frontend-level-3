import Transaction from "../pages/Transaction.vue";
import Home from "@/pages/Home";

export const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/transaction/:id',
        component: Transaction,
        name: "transaction"
    },
]
