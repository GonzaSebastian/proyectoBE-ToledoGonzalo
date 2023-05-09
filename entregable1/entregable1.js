class productManager {
  #products
  #error
  constructor() {
    this.#products = []
    this.#error = undefined
  }

  getProducts = () => this.#products

  getProductsById = (id) => {
    const product = this.#products.find(i => i.id === id)
    if (product) return product 
    return `ID: ${id} Not Found`
  }

  #generateId = () => (this.#products.length === 0) ? 1 : this.#products[this.#products.length-1].id + 1

  #validateProduct = (title, description, price, thumbnail, code, stock) => {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      this.#error = `${title} contiene campos incompletos`
    } else {
      const found = this.#products.find(i => i.code === code)
      if (found) this.#error =  `${title} contiene un code repetido`
      else this.#error = undefined
    }
  }

  addProduct = (title, description, price, thumbnail, code, stock) => {
    this.#validateProduct(title, description, price, thumbnail, code, stock)
    if (this.#error === undefined)
      this.#products.push({id: this.#generateId(), title, description, price, thumbnail, code, stock})
    else 
      console.log(this.#error);
  }
} 

const product = new productManager()

product.addProduct('producto prubea', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)



console.log(product.getProducts());
console.log(product.getProductsById(3));
