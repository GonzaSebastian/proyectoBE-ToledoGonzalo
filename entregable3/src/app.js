import express from 'express'
import productManager from './components/ProductManager.js'

const app = express()

const product = new productManager("./products.json")

const getProducts = await product.getProducts()

app.get('/products', (request, response) => {
  let limit = parseInt(request.query.limit)

  if (!limit) {
    response.send({getProducts})
  } else {
    const productsLimit = getProducts.slice(0, limit)
    response.send(productsLimit)
  }
})

app.listen(8080, () => console.log('Server Up...'))

