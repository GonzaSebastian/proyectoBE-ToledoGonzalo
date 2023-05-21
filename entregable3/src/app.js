import express from 'express'
import productManager from './components/ProductManager.js'

const app = express()

const product = new productManager("./products.json")

const getProducts = await product.getProducts()

app.get('/products', (req, res) => {
  let limit = parseInt(req.query.limit)

  if (!limit) {
    res.send(getProducts)
  } else {
    const productsLimit = getProducts.slice(0, limit)
    res.send(productsLimit)
  }

})

app.get('/products/:pid', (req, res) => {
  const id = parseInt(req.params.pid)
  const product = getProducts.find(i => i.id === id)


  if (!product) return res.send({ error: 'El producto no existe' })
    res.send(product)
  
})

app.listen(8080, () => console.log('Server Up...'))

