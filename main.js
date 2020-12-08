const app = new Vue({
  el: '#app',
  data: {
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
    image(){
      return this.variants[this.selectedVariant].variantImage
    },
    inStock(){
      return this.variants[this.selectedVariant].variantQuantity
    },
    sale() {
      if (this.onSale) {
        return this.brand + ' ' + this.product + ' is on sale!'
      }
      return  this.brand + ' ' + this.product + ' is not on sale'
    }
  }
})
