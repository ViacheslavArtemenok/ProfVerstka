Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
            imgProduct: 0,
            ptype: "some",
            psubtype: "main",
            checker: true
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            if (userSearch != "") {
                this.checker = false;
            } else this.checker = true;
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
        getAllProducts() {
            this.checker = false;
        },
        getCatMen() {
            this.ptype = "m";
            this.psubtype = "some";
            document.getElementById("breadcrumbs").innerHTML = "men";
            document.querySelector(".hideline").style.display = "block";
            document.querySelector(".hideback").style.display = "none";
            document.querySelector(".hidecathref").style.display = "none";
        },
        getCatWomen() {
            this.ptype = "w";
            this.psubtype = "some";
            document.getElementById("breadcrumbs").innerHTML = "women";
            document.querySelector(".hideline").style.display = "block";
            document.querySelector(".hideback").style.display = "none";
            document.querySelector(".hidecathref").style.display = "none";

        },
        getCatKids() {
            this.ptype = "k";
            this.psubtype = "some";
            document.getElementById("breadcrumbs").innerHTML = "kids";
            document.querySelector(".hideline").style.display = "block";
            document.querySelector(".hideback").style.display = "none";
            document.querySelector(".hidecathref").style.display = "none";
        }
    },
    template: `<div class="products">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="item.img"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
            <div class="product_item" v-if="product.type == $parent.ptype || product.subtype == $parent.psubtype || !$parent.checker">
                               <div @click="$emit('add-product', product)">
                <div class="box_pict">
                    <img class="pict_img" :src="img" alt="product">
                    <div class="bord_add_to_cart">
                        <div class="add_to_cart">
                            <img class="add_to_cart_img" src="img/cart.svg" alt="cart">
                            <p class="add_to_cart_text">Add to Cart</p>
                        </div>
                    </div>
                </div>
            </div>
            <a href="#">
                <h3 class="pd_tittle">{{product.product_name}}</h3>
                <p class="pd_text">Known for her sculptural takes on traditional tailoring, Australian arbiter of
                    cool
                    Kym Ellery teams up with Moda Operandi.</p>

                <p class="pd_price">$ {{product.price}}.00</p>
            </a>
            </div>
    `
});
Vue.component('allprod', {
    template: `<div class="box_btn carthider">
    <a class="btn" href="#"  @click="$parent.$refs.products.getAllProducts()">Browse All Product</a>
</div>`
});
Vue.component('hidemenu', {
    template:
        `<div class="list_box">
    <label for="menu_main" class="close">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.4158 6.00409L11.7158 1.71409C11.9041 1.52579 12.0099 1.27039 12.0099 1.00409C12.0099 0.73779 11.9041 0.482395 11.7158 0.294092C11.5275 0.105788 11.2721 0 11.0058 0C10.7395 0 10.4841 0.105788 10.2958 0.294092L6.0058 4.59409L1.7158 0.294092C1.52749 0.105788 1.2721 -1.9841e-09 1.0058 0C0.739497 1.9841e-09 0.484102 0.105788 0.295798 0.294092C0.107495 0.482395 0.0017066 0.73779 0.0017066 1.00409C0.0017066 1.27039 0.107495 1.52579 0.295798 1.71409L4.5958 6.00409L0.295798 10.2941C0.20207 10.3871 0.127676 10.4977 0.0769072 10.6195C0.0261385 10.7414 0 10.8721 0 11.0041C0 11.1361 0.0261385 11.2668 0.0769072 11.3887C0.127676 11.5105 0.20207 11.6211 0.295798 11.7141C0.388761 11.8078 0.499362 11.8822 0.621222 11.933C0.743081 11.9838 0.873786 12.0099 1.0058 12.0099C1.13781 12.0099 1.26852 11.9838 1.39038 11.933C1.51223 11.8822 1.62284 11.8078 1.7158 11.7141L6.0058 7.41409L10.2958 11.7141C10.3888 11.8078 10.4994 11.8822 10.6212 11.933C10.7431 11.9838 10.8738 12.0099 11.0058 12.0099C11.1378 12.0099 11.2685 11.9838 11.3904 11.933C11.5122 11.8822 11.6228 11.8078 11.7158 11.7141C11.8095 11.6211 11.8839 11.5105 11.9347 11.3887C11.9855 11.2668 12.0116 11.1361 12.0116 11.0041C12.0116 10.8721 11.9855 10.7414 11.9347 10.6195C11.8839 10.4977 11.8095 10.3871 11.7158 10.2941L7.4158 6.00409Z"
                fill="#6F6E6E" />
        </svg>
    </label>
    <p class="list_tittle">MENU</p>
    <a class="pink_list" href="#" @click="$parent.$refs.products.getCatMen()">men</a>
    <ul>
        <li><a class="menu_list" href="#">Accessories</a></li>
        <li><a class="menu_list" href="#">Bags</a></li>
        <li><a class="menu_list" href="#">Denim</a></li>
        <li><a class="menu_list" href="#">T-Shirts</a></li>
    </ul>
    <a class="pink_list" href="#" @click="$parent.$refs.products.getCatWomen()">women</a>
    <ul>
        <li><a class="menu_list" href="#">Accessories</a></li>
        <li><a class="menu_list" href="#">Jackets & Coats</a></li>
        <li><a class="menu_list" href="#">Polos</a></li>
        <li><a class="menu_list" href="#">T-Shirts</a></li>
        <li><a class="menu_list" href="#">Shirts</a></li>
    </ul>
    <a class="pink_list" href="#" @click="$parent.$refs.products.getCatKids()">kids</a>
    <ul>
        <li><a class="menu_list" href="#">Accessories</a></li>
        <li><a class="menu_list" href="#">Jackets & Coats</a></li>
        <li><a class="menu_list" href="#">Polos</a></li>
        <li><a class="menu_list" href="#">T-Shirts</a></li>
        <li><a class="menu_list" href="#">Shirts</a></li>
        <li><a class="menu_list" href="#">Bags</a></li>
    </ul>
    <a class="pink_list hide_tittle" href="registration.html">registration</a>
    <a class="pink_list hide_tittle" href="cart.html">cart</a>
</div>`
});
Vue.component('cathref', {
    template:
        `<div class="hidecathref">
        <div class="wrap">
            <div class="block_items">
                <a class="item_box" href="#" @click="$parent.$refs.products.getCatWomen()">
                    <img class="img_item" src="img/w.jpg" alt="w">
                    <div class="item_text">
                        <h3 class="item_h3">30% OFF</h3>
                        <h1 class="item_h1">FOR WOMEN</h1>
                    </div>
                </a>
                <a class="item_box" href="#" @click="$parent.$refs.products.getCatMen()">
                    <img class="img_item" src="img/m.jpg" alt="m">
                    <div class="item_text">
                        <h3 class="item_h3">HOT DEAL</h3>
                        <h1 class="item_h1">FOR MEN</h1>
                    </div>
                </a>
                <a class="item_box" href="#" @click="$parent.$refs.products.getCatKids()">
                    <img class="img_item" src="img/k.jpg" alt="k">
                    <div class="item_text">
                        <h3 class="item_h3">NEW ARRIVALS</h3>
                        <h1 class="item_h1">FOR KIDS</h1>
                    </div>
                </a>
            </div>
            <a href="#">
                <div class="item_box_long">
                    <div class="item_long">
                        <h3 class="item_h3">LUXIROUS & TRENDY</h3>
                        <h1 class="item_h1">ACCESORIES</h1>
                    </div>
                </div>
            </a>
        </div>
        <div class="tittle_product">
            <h1 class="tittle_product_h1">Fetured Items</h1>
            <h3 class="tittle_product_h3">Shop for items based on what we featured in this week</h3>
        </div>
        </div>`
});
Vue.component('catalogline', {
    template: `<div  class="hideline">
<div class="main_tittle_box">
    <div class="main_tittle">
        <h3 id="ptittle" class="pink_tittle">NEW ARRIVALS </h3>
        <div id="wayway" class="way">
            <a class="way_text" href="index.html">HOME&nbsp;</a>
            <p id="breadcrumbs" class="way_text"></p>
            <p class="way_text">NEW ARRIVALS</p>
        </div>
    </div>
</div>
<div class="product_menu">
    <details class="filter_box">
        <summary class="filter_click">
            <span class="filter_text">FILTER</span>
            <svg class="filter_svg" width="15" height="10" viewBox="0 0 15 10" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path class="filter_svg"
                    d="M0.833333 10H4.16667C4.625 10 5 9.625 5 9.16667C5 8.70833 4.625 8.33333 4.16667 8.33333H0.833333C0.375 8.33333 0 8.70833 0 9.16667C0 9.625 0.375 10 0.833333 10ZM0 0.833333C0 1.29167 0.375 1.66667 0.833333 1.66667H14.1667C14.625 1.66667 15 1.29167 15 0.833333C15 0.375 14.625 0 14.1667 0H0.833333C0.375 0 0 0.375 0 0.833333ZM0.833333 5.83333H9.16667C9.625 5.83333 10 5.45833 10 5C10 4.54167 9.625 4.16667 9.16667 4.16667H0.833333C0.375 4.16667 0 4.54167 0 5C0 5.45833 0.375 5.83333 0.833333 5.83333Z"
                    fill="#EF5B70" />
            </svg>
        </summary>
        <details class="categ_box">
            <summary class="categ">
                <span class="categ_text">CATEGORY</span>
            </summary>
            <a class="categ_item" href="#">Accessories</a>
            <a class="categ_item" href="#">Bags</a>
            <a class="categ_item" href="#">Denim</a>
            <a class="categ_item" href="#">Hoodies & Sweatshirts</a>
            <a class="categ_item" href="#">Jackets & Coats</a>
            <a class="categ_item" href="#">Polos</a>
            <a class="categ_item" href="#">Shirts</a>
            <a class="categ_item" href="#">Shoes</a>
            <a class="categ_item" href="#">Sweaters & Knits</a>
            <a class="categ_item" href="#">T-Shirts</a>
            <a class="categ_item" href="#">Tanks</a>
        </details>
        <details class="categ_box categ_box_margin">
            <summary class="categ">
                <span class="categ_text">BRAND</span>
            </summary>
            <a class="categ_item" href="#">Accessories</a>
            <a class="categ_item" href="#">Bags</a>
            <a class="categ_item" href="#">Denim</a>
            <a class="categ_item" href="#">Hoodies & Sweatshirts</a>
            <a class="categ_item" href="#">Jackets & Coats</a>
            <a class="categ_item" href="#">Polos</a>
            <a class="categ_item" href="#">Shirts</a>
            <a class="categ_item" href="#">Shoes</a>
            <a class="categ_item" href="#">Sweaters & Knits</a>
            <a class="categ_item" href="#">T-Shirts</a>
            <a class="categ_item" href="#">Tanks</a>
        </details>
        <details class="categ_box categ_box_margin">
            <summary class="categ">
                <span class="categ_text">DESIGNER</span>
            </summary>
            <a class="categ_item" href="#">Accessories</a>
            <a class="categ_item" href="#">Bags</a>
            <a class="categ_item" href="#">Denim</a>
            <a class="categ_item" href="#">Hoodies & Sweatshirts</a>
            <a class="categ_item" href="#">Jackets & Coats</a>
            <a class="categ_item" href="#">Polos</a>
            <a class="categ_item" href="#">Shirts</a>
            <a class="categ_item" href="#">Shoes</a>
            <a class="categ_item" href="#">Sweaters & Knits</a>
            <a class="categ_item" href="#">T-Shirts</a>
            <a class="categ_item" href="#">Tanks</a>
        </details>
    </details>

    <div class="product_menu_right">
        <details class="collection_select trending">
            <summary>
                TRENDING NOW
                <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.00214 5.00214C4.83521 5.00247 4.67343 4.94433 4.54488 4.83782L0.258102 1.2655C0.112196 1.14422 0.0204417 0.969958 0.00302325 0.781035C-0.0143952 0.592112 0.0439493 0.404007 0.165221 0.258101C0.286493 0.112196 0.460759 0.0204417 0.649682 0.00302327C0.838605 -0.0143952 1.02671 0.043949 1.17262 0.165221L5.00214 3.36602L8.83167 0.279536C8.90475 0.220188 8.98884 0.175869 9.0791 0.149125C9.16937 0.122382 9.26403 0.113741 9.35764 0.1237C9.45126 0.133659 9.54198 0.162021 9.6246 0.207156C9.70722 0.252292 9.7801 0.313311 9.83906 0.386705C9.90449 0.460167 9.95405 0.546351 9.98462 0.639855C10.0152 0.733359 10.0261 0.83217 10.0167 0.930097C10.0073 1.02802 9.97784 1.12296 9.93005 1.20895C9.88227 1.29494 9.81723 1.37013 9.73904 1.42982L5.45225 4.88068C5.32002 4.97036 5.16154 5.01312 5.00214 5.00214Z"
                        fill="#6F6E6E" />
                </svg>
            </summary>
            <div class="input_box">
                <label><input class="check_box" id="in_men" type="checkbox"> Men</label>
                <label><input class="check_box" id="in_women" type="checkbox"> Women</label>
                <label><input class="check_box" id="in_kids" type="checkbox"> Kids</label>
            </div>
        </details>
        <details class="collection_select size">
            <summary>
                SIZE<svg width="11" height="6" viewBox="0 0 11 6" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.00214 5.00214C4.83521 5.00247 4.67343 4.94433 4.54488 4.83782L0.258102 1.2655C0.112196 1.14422 0.0204417 0.969958 0.00302325 0.781035C-0.0143952 0.592112 0.0439493 0.404007 0.165221 0.258101C0.286493 0.112196 0.460759 0.0204417 0.649682 0.00302327C0.838605 -0.0143952 1.02671 0.043949 1.17262 0.165221L5.00214 3.36602L8.83167 0.279536C8.90475 0.220188 8.98884 0.175869 9.0791 0.149125C9.16937 0.122382 9.26403 0.113741 9.35764 0.1237C9.45126 0.133659 9.54198 0.162021 9.6246 0.207156C9.70722 0.252292 9.7801 0.313311 9.83906 0.386705C9.90449 0.460167 9.95405 0.546351 9.98462 0.639855C10.0152 0.733359 10.0261 0.83217 10.0167 0.930097C10.0073 1.02802 9.97784 1.12296 9.93005 1.20895C9.88227 1.29494 9.81723 1.37013 9.73904 1.42982L5.45225 4.88068C5.32002 4.97036 5.16154 5.01312 5.00214 5.00214Z"
                        fill="#6F6E6E" />
                </svg>
            </summary>
            <div class="input_box">
                <label><input class="check_box" id="in_xs" type="checkbox"> XS</label>
                <label><input class="check_box" id="in_s" type="checkbox"> S</label>
                <label><input class="check_box" id="in_m" type="checkbox"> M</label>
                <label><input class="check_box" id="in_l" type="checkbox"> L</label>
            </div>
        </details>
        <details class="collection_select price">
            <summary>
                PRICE<svg width="11" height="6" viewBox="0 0 11 6" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.00214 5.00214C4.83521 5.00247 4.67343 4.94433 4.54488 4.83782L0.258102 1.2655C0.112196 1.14422 0.0204417 0.969958 0.00302325 0.781035C-0.0143952 0.592112 0.0439493 0.404007 0.165221 0.258101C0.286493 0.112196 0.460759 0.0204417 0.649682 0.00302327C0.838605 -0.0143952 1.02671 0.043949 1.17262 0.165221L5.00214 3.36602L8.83167 0.279536C8.90475 0.220188 8.98884 0.175869 9.0791 0.149125C9.16937 0.122382 9.26403 0.113741 9.35764 0.1237C9.45126 0.133659 9.54198 0.162021 9.6246 0.207156C9.70722 0.252292 9.7801 0.313311 9.83906 0.386705C9.90449 0.460167 9.95405 0.546351 9.98462 0.639855C10.0152 0.733359 10.0261 0.83217 10.0167 0.930097C10.0073 1.02802 9.97784 1.12296 9.93005 1.20895C9.88227 1.29494 9.81723 1.37013 9.73904 1.42982L5.45225 4.88068C5.32002 4.97036 5.16154 5.01312 5.00214 5.00214Z"
                        fill="#6F6E6E" />
                </svg>
            </summary>
            <div class="input_box">
                <label><input class="check_box" id="in_price_1" type="checkbox"> 1$-100$</label>
                <label><input class="check_box" id="in_price_2" type="checkbox"> 100$-500$</label>
                <label><input class="check_box" id="in_price_3" type="checkbox"> 500$-1000$</label>
                <label><input class="check_box" id="in_price_4" type="checkbox"> 1000$.....</label>
            </div>
        </details>
    </div>
</div>
</div>`
});
Vue.component('promo', {
    template: `<div class="back hideback">
                    <div class="wrap_promo">
                        <img class="img_promo" src="img/man.png" alt="promo">
                        <div class="promo_tittle">
                            <h1 class="promo_h1">THE BRAND</h1>
                            <h3 class="promo_h3">OF LUXERIOUS <span class="pink">FASHION</span></h3>
                        </div>
                    </div>
                </div> `
});