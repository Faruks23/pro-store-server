const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://assignment8:0jzIpMiBYD5Vh9Gc@cluster0.mafpasm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db("assignment8");
    const ProductCollection =db.collection("Products");
    const BrandsCollection =db.collection("brands");

    
   app.get("/brands", async (req, res) => {
     try {
       const brands = await BrandsCollection.find().toArray();
       res.send({
         status: 200,
         data: brands,
       });
     } catch (error) {
       res.status(500).send({
         status: 500,
         message: "Internal Server Error",
         error: error.message,
       });
     }
   });

    
    
   app.get("/products", async (req, res) => {
     try {
       const products = await ProductCollection.find().toArray();

       res.send(
        
          products,
       );
     } catch (error) {
       res.status(500).send({
         status: 500,
         message: "Internal Server Error",
         error: error.message,
       });
     }
   });



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
