import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

const Details: React.FC = () => {
  const [data, setData] = useState<Product | null>(null);
  const params = useParams();
 
    const navigate = useNavigate();

  const id = parseInt(params?.id); 

  const getData = () => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setData(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleCart =()=>{
    
    const user =  localStorage.getItem('token');
    const currentDate = new Date();

    // Get various date components
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month}-${day}`;

    if(user){
        axios.post('https://fakestoreapi.com/carts',{
          userId:5,
          date:formattedDate,
          products:[{productId:id,quantity:1}]
        }) 

        toast({
          title: "Success.",
          description: "Product added to cart",
          
        })
    }else{
      toast({
        variant: "destructive",
        title: "Please Login",
        
      
      })

      navigate('/login');
      
    }

  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className='grid grid-cols-2 p-4'>
        <div className='grid grid-rows-2'>
          <img src={data?.image}   className='p-5' alt="Product" />
        </div>
        <div className='p-5'>
          <h1 className='text-2xl font-bold'>{data?.title}</h1>
          <h1 className='text-gray-500 text-xl mt-3'>{data?.description}</h1>
          <hr className='mt-4' />
          <div className='flex items-center mt-4'>
            <h1 className='text-2xl font-bold'>Rs. {data?.price}</h1>
            <h1 className='text-xl text-gray-500 ml-2'>MRP</h1>
            <h1 className='line-through text-xl text-gray-500 ml-1'>{data?.price + 500}</h1>
            <h1 className='text-orange-500 ml-2 font-bold text-lg'>(Rs. 500 OFF)</h1>
          </div>
          <h1 className='text-green-800 font-semibold mt-3'>inclusive of all taxes</h1>
          <button  className="mt-4 h-14 bg-rose-500  text-white w-80 font-bold py-2 px-4  text-lg rounded-sm" onClick={()=>handleCart()}>
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Details;
