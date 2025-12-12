import { menuArray } from "./data.js";

let orderArray = []

const menuListEl = document.getElementById('menu_ul')
const customerOrderEl = document.getElementById('customer_order')
const modalEl = document.getElementById('modal')

document.addEventListener('click', function(e){

    if( e.target.dataset.add ){
        const menuObj = getMenuObj(e.target.dataset.add)
        addOrderItem(menuObj)
        renderCustomerOrder()
        return
    }

    if( e.target.dataset.remove ){
        removeOrderItem(e.target.dataset.remove)
        renderCustomerOrder()
        return
    }

    if(e.target.id === 'complete-btn'){
        modalEl.style.display = 'block'
        return
    }

    if(e.target.id === 'pay-btn'){
        modalEl.style.display = 'none'
        orderArray = []
        displayThankyou()
        clearModal()
        return
    }
})

function removeOrderItem(item_id) {
    orderArray = orderArray.filter(
        orderItem => orderItem.id !== Number(item_id)
    )
    console.log(orderArray)
}

function getMenuObj(item_id) {
    for(let menuItem of menuArray){
        if(String(menuItem.id) === item_id)
            return menuItem
    }
}

function clearModal() {
    document.getElementById('inputName').value = ''
    document.getElementById('inputCardNumber').value = ''
    document.getElementById('inputCvv').value = ''
}

function displayThankyou() {
    const thankyouMessageEl = document.getElementById('thankyou-message')
    const nameValue = document.getElementById('inputName').value
    customerOrderEl.style.display = 'none'
    thankyouMessageEl.textContent = `Thanks, ${nameValue}! Your order is on its way!`
    document.getElementById('thankyou-container').style.display = 'block'
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
        orderArray.push({
            id: menuObj.id,
            name: menuObj.name,
            quantity: 1,
            totalPrice: menuObj.price
        })
        console.log(orderArray)
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
    if(orderArray.length > 0){
        const checkoutCartEl = document.getElementById('checkout_cart')
        const totalOrderPriceEl = document.getElementById('total_order_price')
        
        let order_html = orderArray.map(function(item){
            return `
                <li class='cart_item'>
                    <div class='cart_start'>
                        ${item.name}
                        <button data-remove='${item.id}'>remove</button>
                    </div>
                    $${item.totalPrice}
                </li>
            `
        }).join('')

        checkoutCartEl.innerHTML = order_html
        customerOrderEl.style.display = 'block'
        totalOrderPriceEl.textContent = '$' + getTotalOrderPrice()
    }
    else{
        customerOrderEl.style.display = 'none'
    }
}

function getTotalOrderPrice() {
    return orderArray.reduce((total, currentItem) => {
        return total + currentItem.totalPrice
    }, 0)
}

setup_menu()
