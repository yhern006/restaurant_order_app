import { menuArray } from "./data.js";

const menuListEl = document.getElementById('menu_ul')
const customerOrderEl = document.getElementById('customer_order')
let orderArray = [{
    item: "Pizza",
    quantity: 2,
    totalPrice: 28
},{
    item: "Beer",
    quantify: 1,
    totalPrice: 12
}]

function setup_menu() {
    menuArray.forEach(function(item){
        const item_html = `
            <li class='menu_item'>
                <div class='item_container'>
                    <div class='container_start'>
                        <div class='item_emoji'>
                            ${item.emoji}
                        </div>
                        <div class='item_info'>
                            <p class='item_name'>
                                ${item.name}
                            </p>
                            <p class='item_ingredients'>
                                ${item.ingredients}
                            </p>
                            <p class='item_price'>
                                $${item.price}
                            </p>
                        </div>
                    </div>
                    <div class='container_end'>
                        <span class="material-symbols-outlined md-40">
                        add_circle
                        </span>
                    </div>
                </div>
            </li>
        `
        menuListEl.innerHTML += item_html
    })
}

function renderCustomerOrder() {
    const checkoutCartEl = document.getElementById('checkout_cart')
    const totalOrderPriceEl = document.getElementById('total_order_price')
    
    let order_html = orderArray.map(function(item){
        return `
            <li class='cart_item'>
                <div class='cart_start'>
                    ${item.item}
                    <button>remove</button>
                </div>
                $${item.totalPrice}
            </li>
        `
    }).join('')

    checkoutCartEl.innerHTML = order_html
    customerOrderEl.style.display = 'block'
    totalOrderPriceEl.textContent = '$' + getTotalOrderPrice()
}

function getTotalOrderPrice() {
    return orderArray.reduce((total, currentItem) => {
        return total + currentItem.totalPrice
    }, 0)
}

function addOrderItem() {

}

setup_menu()
renderCustomerOrder()