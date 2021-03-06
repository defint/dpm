import React from "react";
import { withRouter } from "react-router-dom";
import productService from "../product";
import QRCode from "qrcode.react";
import ReactToPrint from "react-to-print";

class ProductPrint extends React.Component {
  render() {
    const {product} = this.props;

    return <div className="container">
      <div style={{ fontSize: 32, marginBottom: 14 }}>
        {product.title}
      </div>

      <div className="tag">
        <QRCode value={product.url} />
        <div className="right-side">
          <div className="price">{product.price}</div>
          <div style={{ textAlign: "center", fontWeight: 700 }}>
            ШхДхВ: {product.width}x{product.length}x
            {product.height}
          </div>
          <div className="producer">
            <div>{product.producer}</div>
            <div>{product.country}</div>
          </div>
        </div>
      </div>
    </div>;
  }
}

class ProductCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      price: 0.0,
      height: 0.0,
      width: 0.0,
      length: 0.0,
      producer: "",
      country: "",
      url: "",
    };

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeProducer = this.handleChangeProducer.bind(this);
    this.handleChangeCountry = this.handleChangeCountry.bind(this);
    this.handleChangeURL = this.handleChangeURL.bind(this);
    this.handleChangeHeight = this.handleChangeHeight.bind(this);
    this.handleChangeLength = this.handleChangeLength.bind(this);
    this.handleChangeWidth = this.handleChangeWidth.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      productService.getProduct(id).then((product) => {
        this.setState(product);
      });
    }
  }

  handleChangeTitle(event) {
    this.setState({ title: event.target.value });
  }

  handleChangeProducer(event) {
    this.setState({ producer: event.target.value });
  }

  handleChangeCountry(event) {
    this.setState({ country: event.target.value });
  }

  handleChangeURL(event) {
    this.setState({ url: event.target.value });
  }

  handleChangePrice(event) {
    this.setState({ price: parseFloat(event.target.value) });
  }

  handleChangeHeight(event) {
    this.setState({ height: parseFloat(event.target.value) });
  }

  handleChangeLength(event) {
    this.setState({ length: parseFloat(event.target.value) });
  }

  handleChangeWidth(event) {
    this.setState({ width: parseFloat(event.target.value) });
  }

  async handleSubmit() {
    const { id } = this.props.match.params;

    if (id) {
      await productService.editProduct({
        id: id,
        title: this.state.title,
        price: this.state.price,
        height: this.state.height,
        width: this.state.width,
        length: this.state.length,
        producer: this.state.producer,
        country: this.state.country,
        url: this.state.url,
      });
    } else {
      await productService.createProduct({
        id: Date.now(),
        title: this.state.title,
        price: this.state.price,
        height: this.state.height,
        width: this.state.width,
        length: this.state.length,
        producer: this.state.producer,
        country: this.state.country,
        url: this.state.url,
      });
    }

    this.props.history.goBack();
  }

  render() {
    const { id } = this.props.match.params;

    return (
      <div className="main">
        {id && (
            <div>

              <ReactToPrint
                  trigger={() => {
                    return <button>Надрукувати</button>;
                  }}
                  content={() => this.componentRef}
              />
              <ProductPrint product={this.state} ref={el => (this.componentRef = el)} />
            </div>
        )}
        <div className="form-row">
          <div>Назва</div>
          <input
            type="text"
            style={{ width: 414 }}
            value={this.state.title}
            onChange={this.handleChangeTitle}
          />
        </div>
        <div className="form-row">
          <div>Ціна</div>
          <input
            type="number"
            min="0"
            value={this.state.price}
            step=".01"
            onChange={this.handleChangePrice}
            style={{ width: 414 }}
          />
        </div>
        <div className="form-row">
          <div>Розмір (ШхДхВ)</div>
          <div className="size-row">
            <input
              type="number"
              min="0"
              value={this.state.width}
              step=".01"
              onChange={this.handleChangeWidth}
            />
            <span>x</span>
            <input
              type="number"
              min="0"
              value={this.state.length}
              step=".01"
              onChange={this.handleChangeLength}
            />
            <span>x</span>
            <input
              type="number"
              min="0"
              value={this.state.height}
              step=".01"
              onChange={this.handleChangeHeight}
            />
          </div>
        </div>
        <div className="form-row">
          <div>Виробник</div>
          <input
            type="text"
            value={this.state.producer}
            onChange={this.handleChangeProducer}
            style={{ width: 414 }}
          />
        </div>
        <div className="form-row">
          <div>Країна</div>
          <input
            type="text"
            value={this.state.country}
            onChange={this.handleChangeCountry}
            style={{ width: 414 }}
          />
        </div>
        <div className="form-row">
          <div>URL</div>
          <input
              type="text"
              value={this.state.url}
              onChange={this.handleChangeURL}
              style={{ width: 414 }}
          />
        </div>
        <div className="form-row producer">
          <button onClick={() => this.props.history.goBack()}>Назад</button>
          <button onClick={this.handleSubmit}>Зберегти</button>
        </div>
      </div>
    );
  }
}

export default withRouter(ProductCreate);
