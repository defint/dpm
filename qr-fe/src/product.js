class ProductServiceMock {
  async getProducts() {
    const response = await fetch('http://localhost:3000/');
    return response.json();
  }

  async getProduct(id) {
    const response = await fetch(`http://localhost:3000/${id}`);
    return response.json();
  }

  async removeProduct(id) {
    const response = await fetch(`http://localhost:3000/${id}`,{method:"DELETE" });
    return response.json();
  }

  async createProduct(product) {
    const response = await fetch(`http://localhost:3000/`,{method:"POST", body: JSON.stringify(product) ,     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },});
    return response.json();
  }

  async editProduct(product) {
    const response = await fetch(`http://localhost:3000/${product.id}`,{method:"PUT", body: JSON.stringify(product),     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, });
    return response.json();
  }
}

export default new ProductServiceMock();
