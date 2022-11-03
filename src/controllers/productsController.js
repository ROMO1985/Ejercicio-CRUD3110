const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    res.render("products", { products: products });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    let idProducto = products.filter(
      (producto) => producto.id == req.params.id
    );
    res.render("detail", { idProducto: idProducto[0] });
  },

  // Create - Form to create
  create: (req, res) => {
    res.render("product-create-form");
  },

  // Create -  Method to store
  store: (req, res) => {
    let nuevoProducto = req.body;
    res.send(nuevoProducto);
  },

  // Update - Form to edit
  edit: (req, res) => {
    const id = req.params.id;
    let idProducto = products.find((producto) => producto.id == id);

    res.render("product-edit-form", { idProducto: idProducto });
  },
  // Update - Method to update
  update: (req, res) => {
    const id = req.params.id;
    const update = products.filter((item) => {
      if (item.id == id) {
        item.name = req.body.name;
        item.price = req.body.price;
        item.discount = req.body.discount;
        item.description = req.body.description;
      }
      return item;
    });
    fs.writeFileSync(productsFilePath, JSON.stringify(update));
    res.redirect("/");
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    // Do the magic
    const id = req.params.id;
    const product = products.find((item) => item.id == id);
    res.send(product);
  },
};

module.exports = controller;
