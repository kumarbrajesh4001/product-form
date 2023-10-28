import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDeleteProduct } from "./redux/sessionReducer";

const ProductList = (props) => {
  const { editable } = props;

  const dispatch = useDispatch();
  const { productList: lists } = useSelector((cv) => cv.product);

  console.log(lists,"lists");

  const productInfo = [
    "Product Name",
    "Category",
    "Description",
    "Expire Date",
    "Cost Price",
    "Sell Price",
    "Discount(%)",
    "Discount Sell Price",
    "Final Price",
    "Actions",
  ];

  return (
    <div className="ms-3">
      <h1>Product List</h1>
      <table className="mt-4 mb-5 text-center">
        <tr>
          {productInfo.map((product, ind) => (
            <th className={`border p-2 `} colSpan={ind === 9 && 2} key={ind}>
              {product}
            </th>
          ))}
        </tr>

        {lists.map((list, ind) => (
          <tr>
            <td className="border p-2" key={ind}>
              {list.product_name}
            </td>
            <td className="border p-2" key={ind}>
              {list.category_name}
            </td>
            <td className="border p-2" key={ind}>
              {list.description}
            </td>
            <td className="border p-2" key={ind}>
              {list.exp_date}
            </td>
            <td className="border p-2" key={ind}>
              {list.cost_price}
            </td>
            <td className="border p-2" key={ind}>
              {list.sell_price}
            </td>
            <td className="border p-2" key={ind}>
              {list.discount}
            </td>
            <td className="border p-2" key={ind}>
              {list.dis_sell_price}
            </td>
            <td className="border p-2" key={ind}>
              {list.dis_sell_price}
            </td>
            <td
              className="border p-2 text-primary pointer-cur"
              onClick={editable(list, ind + 1)}
              key={ind}
            >
              Edit
            </td>
            <td
              className="border p-2 text-primary pointer-cur"
              onClick={() => {
                dispatch(setDeleteProduct(ind));
              }}
              key={ind}
            >
              Delete
            </td>
          </tr>
        ))}
        <tr>
          <td className="border p-2 " colSpan={8}>
            Total Amounts
          </td>
          <td className="border p-2 text-start ms-5" colSpan={3}>
            {lists.reduce((ac, cv) => ac + +cv.dis_sell_price,0)}
          </td>
        </tr>
      </table>
    </div>
  );
};

export default ProductList;
