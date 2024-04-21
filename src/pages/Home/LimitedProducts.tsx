import {  ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const LimitedProducts : React.FC = ()=>{

    const [data, setData] = useState([]);
    const { toast } = useToast();

    const getData = ()=>{
        
        axios.get('https://fakestoreapi.com/products?limit=5').then((res)=>{
       
            setData(res?.data);
            
        }).catch((err:unknown)=>{

                console.log('the error is ',err);
                
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: '',
                action: <ToastAction altText="Try again">Try again</ToastAction>,
              })
        })
    }


    useEffect(()=>{
        getData();
    },[])

    return (
        <>

<div className='p-10 flex justify-between lg:gap-10 md:p-2'>
    {data?.map((item:any,index)=>{ return(
         <Link to="/products" key={index} state={{category:"Clothes",product:item?.title}}><div style={{backgroundImage:`url(${item?.image})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}
         className='h-72 w-48 p-2 pt-48'>
          <div className='bg-pink-700 text-orange-100 flex flex-col items-center justify-center'>
            <h1 className='text-lg'>{item?.category}</h1>
            <h1 className='text-xl font-bold'>40-50% OFF</h1>
            <h1 className='text-lg'>Shop Now</h1>
          </div>
         </div>
         </Link>
    )})}
    
     
    </div>

        
        </>
    )
}


export default LimitedProducts;