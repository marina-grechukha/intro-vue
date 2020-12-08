const app = new Vue({
    el: '#app',
    data: {
        product: 'Cat',
        image: './assets/red-cat.jpg',
        link: 'https://unsplash.com/collections/33304287/the-cats-',
        inStock: false,
        onSale: true,
        details: ['99% fur', '1% claws', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'red',
                variantImage: './assets/red-cat.jpg'
            },
            {
                variantId: 2235,
                variantColor: 'gray',
                variantImage: './assets/gray-cat.jpg'
            }
        ],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(variantImage) {
            this.image = variantImage
        },
    }
})
