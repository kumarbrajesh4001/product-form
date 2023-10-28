import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditProduct,
  setProductList,
} from "./redux/sessionReducer";
import { useNavigate } from "react-router-dom";

const ProductForm = (props) => {
  const { productData, setProductData, editId, setEditId } = props;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { productList } = useSelector((cv) => cv.product);

  // console.log(productList, "productList");

  const category = [
    "Please Choose...",
    "Mobile phones",
    "Clothing",
    "Household furniture",
  ];

  const currentDate = new Date().toJSON().slice(0, 10);

  //   const [productData, setProductData] = useState({
  //     product_name: "",
  //     category_name: "",
  //     description: "",
  //     exp_date: "",
  //     cost_price: "",
  //     sell_price: "",
  //     discount: "",
  //     dis_sell_price: 0,
  //   });

  //   const [editId, setEditId] = useState();

  //   const editable = (param, ind) => () => {
  //     setProductData(param);
  //     setEditId(ind);
  //   };

  const getSellPriceWithDis = (saleRate, disc) =>
    saleRate - (saleRate * disc) / 100;

  const handleClick = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setProductData({
      ...productData,
      [name]: value,
      ...((name === "discount" || name === "sell_price") && {
        dis_sell_price: getSellPriceWithDis(
          name === "sell_price" ? +value : +productData.sell_price,
          name === "discount" ? +value : +productData.discount || 0
        ),
      }),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      dispatch(setEditProduct([editId - 1, productData]));

      setEditId();

      navigate("/product-list");
    } else {
      dispatch(setProductList([...productList, productData]));
    }

    setProductData({
      product_name: "",
      category_name: "",
      description: "",
      exp_date: "",
      cost_price: "",
      sell_price: "",
      discount: "",
      dis_sell_price: 0,
    });
  };

  return (
    <div className="container mt-3">
      <h1>Product Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6">
            <label htmlFor="name" className="d-block label-text">
              Product Name<span className="color-RED">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="product_name"
              className="input-section ps-2 pe-1"
              placeholder="Enter name"
              value={productData.product_name}
              onChange={handleClick}
              required
            />
          </div>

          <div className="col-6">
            <label htmlFor="cate" className="d-block label-text">
              Category<span className="color-RED">*</span>
            </label>
            <select
              id="cate"
              className="input-section ps-1"
              name="category_name"
              onChange={handleClick}
              value={productData.category_name}
              required
            >
              {category.map((cate, ind) => (
                <option
                  key={ind}
                  value={ind === 0 ? "" : cate}
                  disabled={ind === 0 && true}
                  selected={ind === 0 && true}
                  hidden={ind === 0 && true}
                >
                  {cate}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mt-3 mb-4">
          <div className="col-6">
            <label htmlFor="desc" className="d-block label-text">
              Description<span className="color-RED">*</span>
            </label>
            <input
              type="text"
              id="desc"
              name="description"
              className="input-section ps-2"
              placeholder="Enter description"
              value={productData.description}
              onChange={handleClick}
              //   value={!!notEmpty.trim() ? notEmpty : ""}
              required
            />
          </div>

          <div className="col-6">
            <label htmlFor="exDate" className="d-block label-text">
              Expire Date<span className="color-RED">*</span>
            </label>
            <input
              type="date"
              id="exDate"
              name="exp_date"
              className="input-section ps-2 pe-1 pointer-cur"
              onChange={handleClick}
              onClick={(e) => {
                e.target.showPicker();
              }}
              value={productData.exp_date}
              min={currentDate} //bcz expiry date is comming further not before
              required
            />
          </div>
        </div>

        <div className="row mt-3 mb-4">
          <div className="col-6">
            <label htmlFor="cost" className="d-block label-text">
              Cost Price<span className="color-RED">*</span>
            </label>
            <input
              type="number"
              id="cost"
              name="cost_price"
              className="input-section ps-2 pe-1"
              placeholder="Enter cost price"
              value={productData.cost_price}
              onChange={handleClick}
              min={0}
              required
            />
          </div>

          <div className="col-6">
            <label htmlFor="sell" className="d-block label-text">
              Sell Price<span className="color-RED">*</span>
            </label>
            <input
              type="number"
              id="sell"
              name="sell_price"
              className="input-section ps-2 pe-1"
              value={productData.sell_price}
              onChange={handleClick}
              placeholder="Enter sell price"
              min={0}
              required
            />
          </div>
        </div>

        <div className="row mt-3 mb-4">
          <div className="col-6">
            <label htmlFor="desc" className="d-block label-text">
              Discount(%)<span className="color-RED">*</span>
            </label>
            <input
              type="number"
              id="desc"
              name="discount"
              value={productData.discount}
              className="input-section ps-2 pe-1"
              placeholder="Enter discount"
              onChange={handleClick}
              min={0}
              required
            />
          </div>

          <div className="col-6">
            <label htmlFor="dissell" className="d-block label-text">
              Discount Sell Price
            </label>
            <input
              type="number"
              id="dissell"
              className="input-section ps-2 pe-1"
              value={productData.dis_sell_price}
              disabled
              required
            />
          </div>

          <div className="col-6 mt-4">
            <label htmlFor="final" className="d-block label-text">
              Final Price
            </label>
            <input
              type="number"
              id="final"
              className="input-section ps-2 pe-1"
              value={productData.dis_sell_price}
              disabled
              required
            />
          </div>
        </div>

        <div className="text-center mt-4 mb-2">
          <button className="col-4 py-2">
            {editId ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
