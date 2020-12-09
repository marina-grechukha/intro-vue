var eventBus = new Vue()

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
        <p v-if="inStock">In Stock</p>
        <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
        
        <info-tabs :shipping="shipping" :details="details"></info-tabs>
  
        <h3>Colors:</h3>
        <div v-for="(variant, index) in variants"
             :key="variant.variantId"
             class="color-box"
             :style="{ backgroundColor: variant.variantColor }"
             @mouseover="updateProduct(index)"
        >
        </div>
        <div>
          <a :href="link" target="_blank">More cats like this</a>
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
      
      <product-tabs :reviews="reviews"></product-tabs>

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
      },
      mounted() {
        eventBus.$on('review-submitted', productReview => {
        this.reviews.push(productReview)
        })
      }
  })

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
        eventBus.$emit('review-submitted', productReview)
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

Vue.component('product-tabs', {
  props: {
    reviews: {
      type: Array,
      required: false
    }
  },
  template: `
    <div>
    
      <ul>
        <span class="tabs" 
              :class="{ activeTab: selectedTab === tab }"
              v-for="(tab, index) in tabs"
              @click="selectedTab = tab"
              :key="tab"
        >
        {{ tab }}
        </span>
      </ul>

      <div v-show="selectedTab === 'Reviews'">
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul v-else>
          <li v-for="(review, index) in reviews" :key="index">
            <p>{{ review.name }}</p>
            <p>Rating:{{ review.rating }}</p>
            <p>{{ review.review }}</p>
          </li>
        </ul>
      </div>

      <div v-show="selectedTab === 'Make a Review'">
        <product-review></product-review>
      </div>
  
    </div>
    `,
  data() {
    return {
      tabs: ['Reviews', 'Make a Review'],
      selectedTab: 'Reviews'
    }
  }
})

Vue.component('info-tabs', {
  props: {
    shipping: {
      required: true
    },
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <div>
    
      <ul>
        <span class="tabs" 
              :class="{ activeTab: selectedTab === tab }"
              v-for="(tab, index) in tabs"
              @click="selectedTab = tab"
              :key="tab"
        >
        {{ tab }}
        </span>
      </ul>

      <div v-show="selectedTab === 'Details'">
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
      </div>
      
      <div v-show="selectedTab === 'Shipping'">
        <p>{{ shipping }}</p>
      </div>
  
    </div>
    `,
  data() {
    return {
      tabs: ['Details', 'Shipping'],
      selectedTab: 'Details'
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
