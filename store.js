import items from "./items.json" with {type: "json"}
import { addToCart } from "./shoppingCart.js"
import formatCurrency from "./util/formatCurrency.js"
import { addGlobalEventListener } from "./util/addNewGlobalListener.js"

const storeItemTemplate = document.querySelector("#store-item-template")
const storeItemContainer = document.querySelector("[data-store-container]")
const imageURL = "https://dummyimage.com/420x260"

export function setupStore() {
    if(storeItemContainer == null) return
    
  addGlobalEventListener("click", "[data-add-to-cart-button]", (e) => {
    const id = e.target.closest("[data-store-item]").dataset.itemId
    addToCart(parseInt(id))
  })

  items.forEach(renderStoreItems)
}

function renderStoreItems(item) {
  const storeItem = storeItemTemplate.content.cloneNode(true)

  const container = storeItem.querySelector("[data-store-item]")
  container.dataset.itemId = item.id

  const name = storeItem.querySelector("[data-name]")
  name.innerText = item.name

  const category = storeItem.querySelector("[data-category]")
  category.innerText = item.category

  const image = storeItem.querySelector("[data-image]")
  image.src = `${imageURL}/${item.imageColor}/${item.imageColor}`

  const price = storeItem.querySelector("[data-price]")

  price.innerText = formatCurrency(item.priceCents / 100)

  storeItemContainer.appendChild(storeItem)
}
