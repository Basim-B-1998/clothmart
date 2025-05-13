
const express=require("express")
const { addProductReview,getProductreviews }=require("../../controllers/shop/product-review-controller")

const router=express.Router()

router.post('/add',addProductReview)
router.get('/:productId',getProductreviews)  

module.exports=router
