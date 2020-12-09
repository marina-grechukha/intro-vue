Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <div>
      <h3>Details:</h3>
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
    </div>
  `
})

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="product">

      <div class="product-image">
        <img :src="image" alt=""/>
      </div>
  
      <div class="product-info">
        <h1>{{ title }}</h1>
        <a :href="link" target="_blank">More cats like this</a>
        <p v-if="inStock">In Stock</p>
        <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
        <p>{{ sale }}</p>
        
        <product-details :details="details"></product-details>
  
        <h3>Colors:</h3>
        <div v-for="(variant, index) in variants"
             :key="variant.variantId"
             class="color-box"
             :style="{ backgroundColor: variant.variantColor }"
             @mouseover="updateProduct(index)"
        >
        </div>
  
        <button @click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock}"
        >
          Add to cart
        </button>
  
        <div class="cart">
          <p>Cart({{ cart }})</p>
        </div>
      </div>
  
    </div>
   `,
    data() {
      return {
        product: 'Cat',
        brand: 'Sleepy',
        selectedVariant: 0,
        link: 'https://unsplash.com/collections/33304287/the-cats-',
        onSale: true,
        details: ['99% fur', '1% claws', 'Gender-neutral'],
        variants: [
          {
            variantId: 2234,
            variantColor: 'red',
            variantImage: './assets/red-cat.jpg',
            variantQuantity: 10
          },
          {
            variantId: 2235,
            variantColor: 'gray',
            variantImage: './assets/gray-cat.jpg',
            variantQuantity: 0
          }
        ],
        cart: 0
      }
    },
      methods: {
        addToCart() {
          this.cart += 1
        },
        updateProduct: function (index) {
          this.selectedVariant = index
        }
      },
      computed: {
        title() {
          return this.brand + ' ' + this.product
        },
        image() {
          return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
        return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
          if (this.premium) {
            return "Free"
          }
          return 2.99
        }
      }
  })

const app = new Vue({
  el: '#app',
  data: {
    premium: true
  }
})
