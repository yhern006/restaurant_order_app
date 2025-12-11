import { menuArray } from "./data.js";

let orderArray = []

const menuListEl = document.getElementById('menu_ul')
const customerOrderEl = document.getElementById('customer_order')

document.addEventListener('click', function(e){
    const menuObj = getMenuObj(e.target.dataset.add)
    if( menuObj ){
        addOrderItem(menuObj)
        renderCustomerOrder()
    }
})

function getMenuObj(item_id) {
    for(let menuItem of menuArray){
        if(String(menuItem.id) === item_id)
            return menuItem
    }
}

// returns orderArray object if menuObj is found
function itemInOrder(menuObj) {
    for(let orderItem of orderArray){
        if(menuObj.name === orderItem.name){
            return orderItem
        }
    }
}

function addOrderItem(menuObj) {
    const orderItem = itemInOrder(menuObj)
    if(orderItem){
        orderItem.quantity++
        orderItem.totalPrice = orderItem.quantity * menuObj.price
    }
    else{
        console.log('adding item to order')
        orderArray.push({
            id: menuObj.id,
            name: menuObj.name,
            quantity: 1,
            totalPrice: menuObj.price
        })
    }
}

function setup_menu() {
    menuArray.forEach(function(item){
        const item_html = `
            <li class='menu_item' id='${item.id}'>
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
                        <span class="material-symbols-outlined md-40"
                            data-add='${item.id}'>
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
                    ${item.name}
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

setup_menu()
