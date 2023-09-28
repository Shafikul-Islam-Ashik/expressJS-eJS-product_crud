import fs from "fs";
import { getProductSlug, getRandomUserID } from "../helpers/helpers.js";

// show all product page
export const showProductPage = (req, res) => {
  // get data from db
  const productData = JSON.parse(
    fs.readFileSync("db/products.json").toString()
  );
  res.render("product", {
    products: productData,
  });
};

// show create product page
export const showCreateProductPage = (req, res) => {
  res.render("create");
};

// show edit product page
export const showEditProductPage = (req, res) => {
  const { id } = req.params;

  // get data from db
  const productData = JSON.parse(
    fs.readFileSync("db/products.json").toString()
  );

  // find data
  const singleProduct = productData.find((data) => data.id === id);

  res.render("edit", {
    singleProduct,
  });
};

// show single product page
export const showSingleProductPage = (req, res) => {
  const { slug } = req.params;

  // get data from db
  const productData = JSON.parse(
    fs.readFileSync("db/products.json").toString()
  );

  // find data
  const singleProduct = productData.find((data) => data.slug === slug);

  res.render("singleProduct", {
    singleProduct,
  });
};

// create product
export const createProduct = (req, res) => {
  // destructure
  const { product_name, regular_price, sale_price, stock } = req.body;

  // get data from db
  const productData = JSON.parse(
    fs.readFileSync("db/products.json").toString()
  );

  // product data
  const product = {
    id: getRandomUserID(),
    product_name: product_name.trim(),
    slug: getProductSlug(product_name),
    regular_price,
    sale_price,
    stock,
    photo: req.file.filename,
  };

  // data push
  productData.push(product);

  // save data to LS
  fs.writeFileSync("db/products.json", JSON.stringify(productData));

  res.redirect("/");
};

// update product
export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { product_name, regular_price, sale_price, stock } = req.body;

  // get data from db
  const productData = JSON.parse(
    fs.readFileSync("db/products.json").toString()
  );

  // photo manage
  let photo_name =
    productData[productData.findIndex((data) => data.id === id)].photo;

  if (req?.file?.filename) {
    photo_name = req.file.filename;
  }

  productData[productData.findIndex((data) => data.id === id)] = {
    id: id,
    product_name: product_name.trim(),
    slug: getProductSlug(product_name),
    regular_price,
    sale_price,
    stock,
    photo: photo_name,
  };

  // save data to LS
  fs.writeFileSync("db/products.json", JSON.stringify(productData));

  res.redirect("/");
};

// delete product
export const deleteProduct = (req, res) => {
  const { id } = req.params;

  // get data from db
  const productData = JSON.parse(
    fs.readFileSync("db/products.json").toString()
  );

  //   update data after delete
  const updatedData = productData.filter((data) => data.id !== id);

  // save data to LS
  fs.writeFileSync("db/products.json", JSON.stringify(updatedData));

  res.redirect("/");
};
