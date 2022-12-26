const { application } = require("express");
var express = require("express");
const produit = require("../model/produit");
var router = express.Router();

router.get("/",async function(req, res,next){
    
     const produits= await produit.find();
    res.render("produits",{ produits });
});

router.post("/",async function(req,res){

const {label,desc,stock}=req.body;
try {
const addedProduit = new produit({label,desc,stock});
await addedProduit.save();
res.redirect('/produits')
}
catch(err){
    res.json(err.message)
}

})

router.get("/deleteProduit/:id", async function (req, res, next) {
    const { id } = req.params;
    try {
      // method to delete user by id
      // const user = await User.findByIdAndDelete(id);
      // other method to delete user by id
      await produit.findOneAndDelete({ _id: id });
      res.redirect("http://localhost:3000/produits");
    } catch (error) {
      res.json(error.message);
    }
  });
/*
router.get("/deleteUser/:id", async function (req, res, next) {
  const { id } = req.params;
  console.log(id);
  try {
    // method to delete user by id
    // const user = await User.findByIdAndDelete(id);
    // other method to delete user by id
    await User.findOneAndDelete({ _id: id });
    res.redirect("http://localhost:3000/users");
  } catch (error) {
    res.json(error.message);
  }
});
*/
  router.put("/",async function(req,res){
    const {id} = req.params;
    const {label,desc,stock}=req.body;
    try {
    const updatedProduit = new Produit({label,desc,stock});
    addedProduit.findOneAndUpdate(id);
    res.redirect('/produits')
    }
    catch(err){
        res.json(err.message)
    }
    
    })

    module.exports = router;
