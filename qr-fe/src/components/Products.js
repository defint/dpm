import React from "react";
import productService from "../product";
import { Link, withRouter } from "react-router-dom";

class Products extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.updateProduct();
  }

  async updateProduct() {
    const products = await productService.getProducts();
    this.setState({ products: products });
  }

  async onRemove(id) {
    await productService.removeProduct(id);
    await this.updateProduct();
  }

  async onEdit(id) {
    this.props.history.push(`/edit/${id}`);
  }

  render() {
    return (
      <div>
        <Link className="new" to="/create">
          Створити новий
        </Link>
        <table>
          <thead>
            <tr>
              <th>Код</th>
              <th>Назва</th>
              <th>Ціна</th>
              <th>Розмір (ШхДхВ)</th>
              <th>Виробник</th>
              <th>Країна</th>
              <th>&nbsp;</th>
            </tr>
          </thead>

          <tbody>
            {this.state.products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                  {product.width}x{product.length}x{product.height}
                </td>
                <td>{product.producer}</td>
                <td>{product.country}</td>
                <td className="action-row">
                  <button onClick={() => this.onEdit(product.id)}>
                    Редагувати
                  </button>
                  <button onClick={() => this.onRemove(product.id)}>
                    Видалити
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(Products);
