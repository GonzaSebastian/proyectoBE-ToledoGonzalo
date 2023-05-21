import fs from 'fs'

export default class productManager {
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

  // readProducts = async() => {
  //   return JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
  // }

  getProducts = async() => {
    // let resp = await this.readProducts()
    return JSON.parse(await fs.promises.readFile(this.path, "utf-8"))

    // return resp;
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

// const product = new productManager("./products.json")

// product.addProduct('product1', 'Este es un producto prueba 1', 1200, 'Sin imagen', 'abc111', 25)
// product.addProduct('product2', 'Este es un producto prueba 2', 4200, 'Sin imagen', 'abc222', 52)
// product.addProduct('product3', 'Este es un producto prueba 3', 2200, 'Sin imagen', 'abc333', 33)
// product.addProduct('product4', 'Este es un producto prueba 4', 6200, 'Sin imagen', 'abc444', 44)
// product.addProduct('product5', 'Este es un producto prueba 5', 7200, 'Sin imagen', 'abc555', 44)
// product.addProduct('product6', 'Este es un producto prueba 6', 9200, 'Sin imagen', 'abc666', 44)
// product.addProduct('product7', 'Este es un producto prueba 7', 6200, 'Sin imagen', 'abc777', 44)
// product.addProduct('product8', 'Este es un producto prueba 8', 56200, 'Sin imagen', 'abc888', 44)
// product.addProduct('product9', 'Este es un producto prueba 9', 4200, 'Sin imagen', 'abc999', 44)
// product.addProduct('product10', 'Este es un producto prueba 10', 45200, 'Sin imagen', 'abc1010', 44)


// console.log(await product.getProducts()); 
// console.log(await product.getProductsById(4))
// product.deleteProductById(3)
// product.updateProduct(2, 'code', 'abc111') 

