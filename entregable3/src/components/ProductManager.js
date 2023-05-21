import fs from 'fs'

class productManager {
  #products
  #error

  constructor(path){
    this.path = path
    this.#products = []
    this.#error = undefined
  }

  static id = 0
  #generateId = () => (this.#products.length === 0) ? 1 : this.#products[this.#products.length-1].id + 1

  addProduct = async(title, description, price, thumbnail, code, stock) => {

    this.#validateProduct(title, description, price, thumbnail, code, stock)
    if (this.#error === undefined){
      this.#products.push({id: this.#generateId(), title, description, price, thumbnail, code, stock})
      await fs.promises.writeFile(this.path, JSON.stringify(this.#products, null, '\t'))
    }  
    else 
      console.log(this.#error);
  }

  readProducts = async() => {
    return JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
  }

  getProducts = async() => {
    let resp = await this.readProducts()

    return resp;
  }

  getProductsById = async(id) => {
    let content = await this.readProducts()
    let productFilter = await content.find(p => p.id === id)
    if (productFilter) {
      return productFilter
    } else {
      return `ID: ${id} Not Found`
    } 
  }

  deleteProductById = async(id) => {
    let response = await this.readProducts()
    
    let productsFilter = response.filter(p => p.id != id)

    await fs.promises.writeFile(this.path, JSON.stringify(productsFilter, null, '\t'))

    console.log(`Producto eliminado.`);
  }

  updateProduct = async(id, prop, value) => {
    let contenido = await this.readProducts()
    let prod = await contenido.find(p => p.id === id)
    if (!prod || !prod[prop]) {
      console.log('No se encontro el id o no existe la propiedad a modificar');
    } else {
      prod[prop] = value
      await fs.promises.writeFile(this.path, JSON.stringify(contenido, null, '\t'))
      console.log(`El producto ${prod.title} se modifico correctamente`);
    }
  }

  #validateProduct = (title, description, price, thumbnail, code, stock) => {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      this.#error = `${title} contiene campos incompletos`
    } else {
    const found = this.#products.find(i => i.code === code)
    if (found) this.#error =  `${title} contiene un code repetido`
    else this.#error = undefined
    }
  }
}

const product = new productManager("./products.json")

// product.addProduct('product1', 'Este es un producto prueba 1', 200, 'Sin imagen', 'abc123', 25)
// product.addProduct('product2', 'Este es un producto prueba 2', 200, 'Sin imagen', 'abc123', 52)
// product.addProduct('product3', 'Este es un producto prueba 3', 200, 'Sin imagen', 'abc333', 33)
// product.addProduct('product4', 'Este es un producto prueba 4', 200, 'Sin imagen', 'abc444', 44)

// console.log(await product.getProducts()); 
// console.log(await product.getProductsById(4))
// product.deleteProductById(3)
// product.updateProduct(2, 'code', 'abc111') 

