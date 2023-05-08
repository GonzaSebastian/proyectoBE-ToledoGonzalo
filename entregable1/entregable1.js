class productManager {
  #products
  constructor() {
    this.#products = []
  }

  getProducts = () => this.#products

  addProduct = (title, description, price, thumbnail, code, stock) => {
    this.#products.push({title, description, price, thumbnail, code, stock})
  }
} 

const product = new productManager()

product.addProduct('PGC 100', 'Perfil estructural C 100mm', 4500, './notImage', 'c100', 98)
// product.addProduct('PGU 100', 'Perfil estructural U 100mm', 3500, './notImage', 'u100', 45)


console.log(product.getProducts());
console.log(product.products);
