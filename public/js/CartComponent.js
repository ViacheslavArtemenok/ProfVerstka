// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            imgCart: 0,
            showCart: false,
            resultCount: 0,
            resultPrice: 0
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }

            // this.$parent.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if(data.result === 1){
            //             let find = this.cartItems.find(el => el.id_product === item.id_product);
            //             if(find){
            //                 find.quantity++;
            //             } else {
            //                 const prod = Object.assign({quantity: 1}, item);
            //                 this.cartItems.push(prod)
            //             }
            //         }
            //     })
        },
        remove(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find.quantity > 0) {
                this.$parent.deleteJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity--
                        }
                    })
            } if (this.resultCount == 1) {
                document.querySelector(".cartsum").style.display = "none";
            }
        },
        showCartBlock() {
            this.showCart = !this.showCart;
            if (this.cartItems.length > 0 && this.showCart) {
                document.querySelector(".hideline").style.display = "block";
                document.querySelector(".hideback").style.display = "none";
                document.querySelector(".hidecathref").style.display = "none";
                document.querySelector(".wrap_product").style.display = "none";
                document.querySelector(".carthider").style.display = "none";
                document.querySelector(".carthider2").style.display = "none";
                document.querySelector(".list_box").style.display = "none";
                document.querySelector(".area_search").style.display = "none";
                document.getElementById("ptittle").innerHTML = "SHOPPING CART";
                document.getElementById("wayway").innerHTML = "";
            } else {
                location.reload();
            }

        },
        totalProducts() {
            return this.cartItems.reduce((sum, product) => {
                return sum + product.quantity
            }, 0)
        },
        totalPrice() {
            return this.cartItems.reduce((sum, product) => {
                return sum + product.price * product.quantity
            }, 0)
        },
        write(text) {
            if (text) {
                document.querySelector(".cartsum").style.display = "flex";
                document.getElementById("cartamount").innerHTML = text;
            }
        }
    },
    template: `        
        <div class="wrap_cart bottomspace" v-show="showCart && cartItems.length > 0">
            <div class="cart_change">
                <cart-item v-for="item of cartItems" :key="item.id_product" :img="item.img" :cart-item="item" @remove="remove" @addProduct="addProduct">
                </cart-item>
                <form class="cart_btns" action="#">
                    <button class="cart_btn" type="submit">CLEAR SHOPPING CART</button>
                    <a class="cart_btn" href="index.html">CONTINUE SHOPPING</a>
                </form>
            </div>
        <form class="cart_form_box" action="cart.html" method="POST" enctype="multipart/form-data">
            <div class="cart_form_box_left">
                <p class="cart_form_tittle">SHIPPING ADRESS</p>
                <input class="cart_form_input" required type="text" placeholder="USA">
                <input class="cart_form_input" required type="text" placeholder="State">
                <input class="cart_form_input" required type="text" placeholder="Postcode / Zip">
                <button class="cart_form_btn" type="submit">GET A QUOTE</button>
            </div>

            <div class="checkout_box">
                <div class="sub_total">
                    <p>SUB TOTAL</p>
                    <p id="totalproducts">{{resultCount = totalProducts()}}{{write(resultCount)}}</p>
                </div>
                <div class="grand_total">
                    <p>GRAND TOTAL</p>
                    <p class="cart_price_pink">$ {{resultPrice = totalPrice()}}.00</p>
                </div>

                <svg class="checkout_line" width="275" height="1" viewBox="0 0 275 1" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M275 0H0V1H275V0Z" fill="#E2E2E2" />
                </svg>
                <a class="checkout_href" href="index.html">PROCEED TO CHECKOUT</a>
            </div>
        </form>
        </div>
            `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
    <div class="cart_change_item" v-if="cartItem.quantity != 0">
                <img class="img_cart" :src="img" alt="img">
                <div class="cart_change_item_info">
                    <div @click="$emit('remove', cartItem)">
                        <svg class="cart_close" width="18" height="18" viewBox="0 0 18 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z"
                                fill="#575757" />
                        </svg>
                    </div>
                    <a class="cart_tittle" href="#">
                        <p>{{ cartItem.product_name }}</p>
                    </a>
                    <ul class="cart_tittle_info">
                        <li>Price: $ {{ cartItem.price }}.00</li>
                        <li>Total price: <span class="cart_price_pink">$ {{cartItem.quantity*cartItem.price}}.00</span></li>
                        <li></li>
                        <li class="quant" @click="$emit('addProduct', cartItem)">
                            <p>Quantity: <span  class="quant_item">{{ cartItem.quantity }}</span> +</p>
                        </li>
                    </ul>
                </div>
            </div>    
                `
});
Vue.component('cart-icon', {
    template: `<a href="#" class="logo_right_img cartadditional" @click="$parent.$refs.cart.showCartBlock()">
    <div id="cartamount" class="cartsum">0</div>
        <svg width="32" height="29" viewBox="0 0 32 29"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path class="logo_svg"
                                        d="M26.2009 29C25.5532 28.9738 24.9415 28.6948 24.4972 28.2227C24.0529 27.7506 23.8114 27.1232 23.8245 26.475C23.8376 25.8269 24.1043 25.2097 24.5673 24.7559C25.0303 24.3022 25.6527 24.048 26.301 24.048C26.9493 24.048 27.5717 24.3022 28.0347 24.7559C28.4977 25.2097 28.7644 25.8269 28.7775 26.475C28.7906 27.1232 28.549 27.7506 28.1047 28.2227C27.6604 28.6948 27.0488 28.9738 26.401 29H26.2009ZM6.75293 26.32C6.75293 25.79 6.91011 25.2718 7.20459 24.8311C7.49907 24.3904 7.91764 24.0469 8.40735 23.844C8.89705 23.6412 9.43594 23.5881 9.95581 23.6915C10.4757 23.7949 10.9532 24.0502 11.328 24.425C11.7028 24.7998 11.9581 25.2773 12.0615 25.7972C12.1649 26.317 12.1118 26.8559 11.9089 27.3456C11.7061 27.8353 11.3626 28.2539 10.9219 28.5483C10.4812 28.8428 9.96304 29 9.43298 29C9.08087 29.0003 8.73212 28.9311 8.40674 28.7966C8.08136 28.662 7.78569 28.4646 7.53662 28.2158C7.28755 27.9669 7.09001 27.6713 6.9552 27.3461C6.82039 27.0208 6.75098 26.6721 6.75098 26.32H6.75293ZM10.553 20.686C10.2935 20.6868 10.0409 20.6024 9.83411 20.4457C9.62727 20.2891 9.47758 20.0689 9.40796 19.819L4.57495 2.36401H1.18201C0.868521 2.36401 0.567859 2.23947 0.346191 2.01781C0.124523 1.79614 0 1.49549 0 1.18201C0 0.868519 0.124523 0.567873 0.346191 0.346205C0.567859 0.124537 0.868521 5.81268e-06 1.18201 5.81268e-06H5.46301C5.7225 -0.00080736 5.97504 0.0837201 6.18176 0.240568C6.38848 0.397416 6.53784 0.617884 6.60693 0.868006L11.4399 18.323H24.6179L29.001 8.27501H14.401C14.2428 8.27961 14.0854 8.25242 13.9379 8.19507C13.7904 8.13771 13.6559 8.05134 13.5424 7.94108C13.4288 7.83082 13.3386 7.69891 13.277 7.55315C13.2154 7.40739 13.1836 7.25075 13.1836 7.0925C13.1836 6.93426 13.2154 6.77762 13.277 6.63186C13.3386 6.4861 13.4288 6.35419 13.5424 6.24393C13.6559 6.13367 13.7904 6.0473 13.9379 5.98994C14.0854 5.93259 14.2428 5.90541 14.401 5.91001H30.814C31.0097 5.90996 31.2022 5.95866 31.3744 6.05172C31.5465 6.14478 31.6928 6.27926 31.7999 6.44301C31.9078 6.60729 31.9734 6.79569 31.9908 6.99145C32.0083 7.18721 31.9771 7.38424 31.9 7.565L26.495 19.977C26.4026 20.1876 26.251 20.3668 26.0585 20.4927C25.866 20.6186 25.641 20.6858 25.411 20.686H10.553Z"
                                        fill="#E8E8E8" />
                                </svg>
                                </a>`
});

/*
<button class="logo_right_img" type="button" @click="$parent.$refs.cart.showCartBlock">
<svg width="32" height="29" viewBox="0 0 32 29"
                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path class="logo_svg"
                                    d="M26.2009 29C25.5532 28.9738 24.9415 28.6948 24.4972 28.2227C24.0529 27.7506 23.8114 27.1232 23.8245 26.475C23.8376 25.8269 24.1043 25.2097 24.5673 24.7559C25.0303 24.3022 25.6527 24.048 26.301 24.048C26.9493 24.048 27.5717 24.3022 28.0347 24.7559C28.4977 25.2097 28.7644 25.8269 28.7775 26.475C28.7906 27.1232 28.549 27.7506 28.1047 28.2227C27.6604 28.6948 27.0488 28.9738 26.401 29H26.2009ZM6.75293 26.32C6.75293 25.79 6.91011 25.2718 7.20459 24.8311C7.49907 24.3904 7.91764 24.0469 8.40735 23.844C8.89705 23.6412 9.43594 23.5881 9.95581 23.6915C10.4757 23.7949 10.9532 24.0502 11.328 24.425C11.7028 24.7998 11.9581 25.2773 12.0615 25.7972C12.1649 26.317 12.1118 26.8559 11.9089 27.3456C11.7061 27.8353 11.3626 28.2539 10.9219 28.5483C10.4812 28.8428 9.96304 29 9.43298 29C9.08087 29.0003 8.73212 28.9311 8.40674 28.7966C8.08136 28.662 7.78569 28.4646 7.53662 28.2158C7.28755 27.9669 7.09001 27.6713 6.9552 27.3461C6.82039 27.0208 6.75098 26.6721 6.75098 26.32H6.75293ZM10.553 20.686C10.2935 20.6868 10.0409 20.6024 9.83411 20.4457C9.62727 20.2891 9.47758 20.0689 9.40796 19.819L4.57495 2.36401H1.18201C0.868521 2.36401 0.567859 2.23947 0.346191 2.01781C0.124523 1.79614 0 1.49549 0 1.18201C0 0.868519 0.124523 0.567873 0.346191 0.346205C0.567859 0.124537 0.868521 5.81268e-06 1.18201 5.81268e-06H5.46301C5.7225 -0.00080736 5.97504 0.0837201 6.18176 0.240568C6.38848 0.397416 6.53784 0.617884 6.60693 0.868006L11.4399 18.323H24.6179L29.001 8.27501H14.401C14.2428 8.27961 14.0854 8.25242 13.9379 8.19507C13.7904 8.13771 13.6559 8.05134 13.5424 7.94108C13.4288 7.83082 13.3386 7.69891 13.277 7.55315C13.2154 7.40739 13.1836 7.25075 13.1836 7.0925C13.1836 6.93426 13.2154 6.77762 13.277 6.63186C13.3386 6.4861 13.4288 6.35419 13.5424 6.24393C13.6559 6.13367 13.7904 6.0473 13.9379 5.98994C14.0854 5.93259 14.2428 5.90541 14.401 5.91001H30.814C31.0097 5.90996 31.2022 5.95866 31.3744 6.05172C31.5465 6.14478 31.6928 6.27926 31.7999 6.44301C31.9078 6.60729 31.9734 6.79569 31.9908 6.99145C32.0083 7.18721 31.9771 7.38424 31.9 7.565L26.495 19.977C26.4026 20.1876 26.251 20.3668 26.0585 20.4927C25.866 20.6186 25.641 20.6858 25.411 20.686H10.553Z"
                                    fill="#E8E8E8" />
                            </svg>
                            </button>


let find = this.cartItems.find(el => el.id_product === item.id_product);
           if (item.quantity > 1) {
               this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                   .then(data => {
                       if (data.result === 1) {
                           find.quantity--;
                       }
                   })
           } else {
               const prod = Object.assign({ quantity: 1 }, item);
               this.$parent.deleteJson(`/api/cart/${find.id_product}`, prod)
                   .then(data => {
                       if (data.result === 1) {
                           this.cartItems.splice(this.cartItems.indexOf(item), 1);
                       }
                   })
           }
           this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })


                <div class="cart-item" v-if="cartItem.quantity != 0">
                    <div class="product-bio">
                        <img class="cartImg" :src="img" alt="Some img">
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price }} each</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>

                */