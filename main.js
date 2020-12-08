const app = new Vue({
    el: '#app',
    data: {
        product: 'Cat',
        image: './assets/red-cat.jpg',
        link: 'https://unsplash.com/collections/33304287/the-cats-',
        inStock: true,
        onSale: true,
        details: ['99% fur', '1% claws', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'red'
            },
            {
                variantId: 2235,
                variantColor: 'gray'
            }
        ],
        sizes: ['small', 'big', 'king-size']
    }
})
