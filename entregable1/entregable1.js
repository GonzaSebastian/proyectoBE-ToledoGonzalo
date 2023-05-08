class productManager {
  #products
  constructor() {
    this.#products = []
  }

  getProducts = () => this.#products

  #generateId = () => (this.#products.length === 0) ? 1 : this.#products[this.#products.length-1].id + 1

  #validate = (title, description, price, thumbnail, code, stock) => {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return `${title} contiene campos incompletos`
    } else {
      const found = this.#products.find(i => i.code === code)
      if (!found) return undefined
      return `${title} contiene un code repetido`
    }
  }

  addProduct = (title, description, price, thumbnail, code, stock) => {
    if (this.#validate(title, description, price, thumbnail, code, stock) === undefined)
    this.#products.push({id: this.#generateId(), title, description, price, thumbnail, code, stock})
    else console.log(this.#validate(title, description, price, thumbnail, code, stock));
  }
} 

const product = new productManager()

product.addProduct('PGC 100', 'Perfil estructural C 100mm', 4500, './notImage', 'c100')
product.addProduct('PGU 100', 'Perfil estructural U 100mm', 3500, './notImage', 'u100', 45)
product.addProduct('PGU 200', 'Perfil estructural U 200mm', 8500, './notImage', 'u100', 125)


console.log(product.getProducts());
// console.log(product.products);
