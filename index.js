import { menuArray } from "./data.js";

const menu_list = document.getElementById('menu_ul')

function setup_menu(){
    menuArray.forEach(function(item){
        const item_html = `
            <li class='menu_item'>
                <div class='item_container'>
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
            </li>
        `
        menu_list.innerHTML += item_html
    })
}

setup_menu()