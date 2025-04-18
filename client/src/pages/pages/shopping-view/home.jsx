import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, ShirtIcon, UmbrellaIcon, WatchIcon } from "lucide-react"
import banner1 from "../../../assets/banner1.avif.jpg"
import banner2 from "../../../assets/banner2.avif.jpg"
import banner3 from "../../../assets/banner3.avif.jpg"
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "@/store/admin/products-slice";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import ShoppingProductTile from "./product-tile";
import LevisLogo from '@/assets/icons/levis.svg';
import ZaraLogo from '@/assets/icons/zara.svg';
import AdidasLogo from '@/assets/icons/adidas.svg';
import HandmLogo from '@/assets/icons/handm.svg';
import NikeLogo from '@/assets/icons/nike.svg';
import PumaLogo from '@/assets/icons/puma.svg';
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import ProductDetailsDialog from "@/components/shopping-view/product-details";




const categoriesWithIcon= [
  {id:"men",label:"Men",icon:ShirtIcon},
  {id:"women",label:"Women",icon:CloudLightning},
  {id:"kids",label:"Kids",icon:BabyIcon},
  {id:"accessories",label:"Accessories",icon:WatchIcon},
  {id:"footwear",label:"Footwear",icon:UmbrellaIcon},
]

const brandsWithIcon = [
  {id:"nike",label:"Nike",icon:<img src={NikeLogo}  alt="Adidas" className="w-8 h-8" />},
  {id:"adidas",label:"Adidas",icon:<img src={AdidasLogo} alt="Adidas" className="w-8 h-8" />},
  {id:"puma",label:"Puma",icon:<img src={PumaLogo} alt="Adidas" className="w-8 h-8" />},
  {id:"levi",label:"Levis",icon:<img src={LevisLogo} alt="Adidas" className="w-8 h-8" />},
  {id:"zara",label:"Zara",icon:<img src={ZaraLogo} alt="Adidas" className="w-8 h-8" />},
  {id:"h&m",label:"H&M",icon:<img src={HandmLogo} alt="Adidas" className="w-8 h-8" />},
]


function ShoppingHome(){

  const [currentSlide,setCurrentSlide] =useState(0)
  const {productList,productDetails}=useSelector(state=>state.shopProducts)
  const [openDetailsDialog,setOpenDetailsDialog]=useState(false)
  const {user}=useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate();



  const slides=[banner1,banner2,banner3]

  function handleNavigateToListingPage(getCurrentItem,section){
    sessionStorage.removeItem('filters')
    const currentFilter = {
      [section] : [getCurrentItem.id]
    }
    sessionStorage.setItem('filters',JSON.stringify(currentFilter))
    navigate(`/shop/listing`)
  }

  function handleGetProductDetails(getCurrentProductId){
      console.log(getCurrentProductId);
      dispatch(fetchProductDetails(getCurrentProductId))
      
    }

    function handleAddtoCart(getCurrentProductId){
      console.log(getCurrentProductId);
      dispatch(addToCart({userId : user?.id,productId : getCurrentProductId,quantity : 1})
      ).then((data)=>{
        if (data?.payload?.success){
          dispatch(fetchCartItems(user?.id))
          toast.success("Product is added to cart");
        }
      }
      )
      
    }

    useEffect(()=>{
      if(productDetails !== null) setOpenDetailsDialog(true)
    
    },[productDetails])
    

  useEffect(()=>{
    const timer = setInterval(() => {
      setCurrentSlide(prevSlide=>(prevSlide + 1)% slides.length)
    }, 3000);

    return ()=>clearInterval(timer)
  },[])

  useEffect(()=>{
    dispatch(fetchAllFilteredProducts({filterParams : {} , sortParams : 'Price: Low to High'}))
  },[dispatch])

  console.log(productList,'productList');
  

  return (  
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {
          slides.map((slide,index)=>(
          <img
          src={slide}
          key={index}
          className={`${index===currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}

    <button variant="outline" size="icon" onClick={()=>setCurrentSlide(prevSlide=>(prevSlide -1 + slides.length) % slides.length)}
    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
    >
      <ChevronLeftIcon className="w-4 h-4"/>
    </button>

        <button variant="outline" size="icon" onClick={()=>setCurrentSlide(prevSlide=>(prevSlide +1) % slides.length)}
     className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
    >
      <ChevronRightIcon className="w-4 h-4"/>
    </button>

     </div> 
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {
                brandsWithIcon.map((brandItem)=><Card onClick={()=>handleNavigateToListingPage(brandItem,'brand')} className="cursor-pointer hover:shadow-lg transition-shadow">
                 <CardContent className="flex flex-col items-center justify-center p-6">
                  {brandItem.icon}
                  <span className="font-bold">{brandItem.label}</span>
                 </CardContent>
                </Card>)
              }
            </div>
          </div>
        </section>
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Shop by category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {
                categoriesWithIcon.map(categoryItem=><Card onClick={()=>handleNavigateToListingPage(categoryItem,'category')} className="cursor-pointer hover:shadow-lg transition-shadow">
                 <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary"/>
                  <span className="font-bold">{categoryItem.label}</span>
                 </CardContent>
                </Card>)
              }
            </div>
          </div>
        </section>
        <section className="py-12">
        <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Feature Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {
            productList && productList.length > 0 ?
            productList.map(productItem=> <ShoppingProductTile 
              handleGetProductDetails={handleGetProductDetails}
              product={productItem}
              handleAddtoCart={handleAddtoCart}
              />
            ) 
            :null } 
          
        </div>
        </div>
        </section>
        <ProductDetailsDialog
     open={openDetailsDialog}
     setOpen={setOpenDetailsDialog}
     productDetails={productDetails}
     />
    </div>
  )
}

export default ShoppingHome