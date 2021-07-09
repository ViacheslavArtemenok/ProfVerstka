Vue.component('filter-el', {
    data() {
        return {
            userSearch: ''
        }
    },
    template: `<form class="area_search" action="#" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input class="input_search" type="text" v-model="userSearch" placeholder="Enter Your Keyword">
                <button type="submit" class="btn_search">Search</button>
                </form>`
})