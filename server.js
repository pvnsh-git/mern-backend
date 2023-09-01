const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();

const DUMMY_PRODUCTS = [];

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
})

app.get("/products", (req, res, next) => {
    return res.status(200).json({ products: DUMMY_PRODUCTS })
})

app.post("/product", (req, res, next) => {
    const { title, price } = req.body;
    if (!title.trim() || !price || price <= 0) {
        return res.status(422).json({
            message: "Invalid input, please enter a valid input and price"
        })
    }

    const createdProduct = {
        id: uuidv4(),
        title,
        price
    };

    DUMMY_PRODUCTS.push(createdProduct);

    res
        .status(201)
            .json({ message: "Created new product.", product: createdProduct });
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});