class productManager {
  #products
  #error
  constructor() {
    this.#products = []
    this.#error = undefined
  }

  getProducts = () => this.#products

  getProductsById = (id) => this.#products.find(i => i.id === id) ? i : `ID: ${id} Not Found`

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

product.addProduct('PGC 100', 'Perfil estructural C 100mm', 4500, './notImage', 'c100', 122)
product.addProduct('PGU 100', 'Perfil estructural U 100mm', 3500, './notImage', 'u100')
product.addProduct('PGU 200', 'Perfil estructural U 200mm', 8500, './notImage', 'u200', 125)
product.addProduct('PGU 300', 'Perfil estructural U 200mm', 8500, './notImage', 'u200', 125)


console.log(product.getProducts());
console.log(product.getProductsById(3));
// console.log(product.products);
