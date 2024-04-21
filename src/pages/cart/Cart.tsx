import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import React, { useEffect, useState } from "react";



const Cart : React.FC = ()=>{

    const [product ,setProduct] = useState([]);


    useEffect(() => {
        axios.get('https://fakestoreapi.com/carts/user/2')
            .then((res) => {
                const cartData = res?.data;
                const productIds = cartData.map((item) => item.products.map((product) => product.productId));
                const uniqueProductIds = Array.from(new Set(productIds.flat()));
    
                const getProductDetails = async () => {
                    const products = await Promise.all(
                        uniqueProductIds.map((id) => axios.get(`https://fakestoreapi.com/products/${id}`))
                    );
    
                    const productDetails = products.map((response) => response.data);
                    setProduct(productDetails);
                };
    
                getProductDetails();
            })
            .catch((err) => {
                toast({
                    title: "Uh oh! Something went wrong.",
                    description: err,
                });
            });
    }, []);
    
    return(
        <>
    <h1 className='text-lg font-bold p-10'>My Cart</h1>
    <div className='grid grid-cols-4'>
    {product.map((item:any)=>{
        return<>
 <div className='grid grid-cols-4 pl-10'>
        <div className='w-60 h-96 border border-spacing-1 shadow-lg'>
        <img src={item?.image} className='w-60 h-72 object-cover p-5' />
        <div className='flex flex-col justify-center items-center'>
        <h1>{item?.title}</h1>
        <div className='flex items-center gap-3'>
            <h1 className='2xl font-bold'>Rs. {item?.price}</h1>
            <h1 className='ml-3 line-through text-gray-500 text-sm'>Rs.{item?.price + 500}</h1>
            <h1 className='ml-3 font-bold text-orange-500'>(Rs. 500 OFF)</h1>
        </div>
        </div>
        </div>
    </div>
        </>
    })}
    </div>
        </>
    )

}


export default Cart;