const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		
		
		res.render('products',{products:products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let idProducto = products.filter (producto => producto.id == req.params.id)
		res.render('detail', {idProducto:idProducto[0]})
		
	},

	// Create - Form to create
	create: (req, res) => {
		
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let nuevoProducto= req.body
		res.send (nuevoProducto)
	},

	// Update - Form to edit
	edit: (req, res) => {

		let idProducto = products.filter (producto => producto.id == req.params.id);
		res.render('product-edit-form',{ idProducto: idProducto[0]});
	},
	// Update - Method to update
	update: (req, res) => {
		res.send(req.body)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		
		let elementoEliminado = products.find(pt => pt.id == req.params.id)
		res.send ('PRODUCTO ELIMINADO: ID-'+ elementoEliminado.id+' - nombre: '+ elementoEliminado.name)
	}
};

module.exports = controller;