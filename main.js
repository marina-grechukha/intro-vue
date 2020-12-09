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
        <p>Shipping: {{ shipping }}</p>
        
        <product-details :details="details"></product-details>
  
        <h3>Colors:</h3>
        <div v-for="(variant, index) in variants"
             :key="variant.variantId"
             class="color-box"
             :style="{ backgroundColor: variant.variantColor }"
             @click="updateProduct(index)"
        >
        </div>
  
        <button @click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock}"
        >
          Add to cart
        </button>
        
        <button @click="removeFromCart">
          Remove from cart
        </button>
      </div>
      
      <div>
        <h3>Reviews</h3>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul v-else>
          <li v-for="(review, index) in reviews" :key="index">
            <p>{{ review.name }}</p>
            <p>Rating:{{ review.rating }}</p>
            <p>{{ review.review }}</p>
          </li>
        </ul>
      </div>
         
      <product-review @review-submitted="addReview"></product-review>
      
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
            variantQuantity: 10
          }
        ],
        reviews: []
      }
    },
      methods: {
        updateProduct: function (index) {
          this.selectedVariant = index
        },
        addToCart() {
          this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        removeFromCart() {
          this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        },
        addReview(productReview) {
          this.reviews.push(productReview)
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

Vue.component('product-review', {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
    
      <p class="error" v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>Would you recommend this product?</p>
      <label>
        Yes
        <input type="radio" value="Yes" v-model="recommend"/>
      </label>
      <label>
        No
        <input type="radio" value="No" v-model="recommend"/>
      </label>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
  </form>
    `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      this.errors = []
      if(this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        }
        this.$emit('review-submitted', productReview)
        this.name = null
        this.review = null
        this.rating = null
        this.recommend = null
      } else {
        if(!this.name) this.errors.push("Name required.")
        if(!this.review) this.errors.push("Review required.")
        if(!this.rating) this.errors.push("Rating required.")
        if(!this.recommend) this.errors.push("Recommendation required.")
      }
    }
  }
})

const app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: []
  },
  methods: {
    addToCart(id) {
      this.cart.push(id)
    },
    removeFromCart(id) {
      for (let i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
          this.cart.splice(i, 1)
        }
      }
    }
  }
})
