import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Products: React.FC = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8); // Change the number of items per page as needed
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, [currentPage]); // Fetch data whenever the currentPage state changes

    const getData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        axios.get('https://fakestoreapi.com/products')
            .then((res) => {
                console.log('the response is', res?.data);
                const slicedProducts = res?.data.slice(startIndex, endIndex);
                setProducts(slicedProducts);
                const totalItems = res?.data.length;
                setTotalPages(Math.ceil(totalItems / itemsPerPage));
            })
            .catch((err: unknown) => {
                console.log('the error is ', err);
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: '',
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                });
            });
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleNav = (id:number)=>{
    
        navigate(`/details/${id}`)
    }


    const handleCart =(id:number)=>{
    
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

    return (
        <>
            <h2 className="flex justify-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                PRODUCTS
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-4">
                {products.map((item: any, index) => (
                    <Card key={index} className="w-[250px] h-[400px] flex flex-col cursor-pointer" >
                        <CardContent className="p-5 flex-grow">
                            <img src={item?.image} alt="" className="w-full h-48 object-cover" onClick={() => handleNav(item?.id)} />
                        </CardContent>
                        <CardFooter className="flex flex-col justify-end">
                            <div className='flex items-center mb-2'>
                                <h1 className='ml-4 font-bold text-sm'>{item.title}</h1>
                            </div>
                            <div className='flex items-center mb-2'>
                                <h1 className='ml-4 font-bold text-sm'>Rs. {item.price}</h1>
                                <h1 className='text-xs text-gray-400 line-through ml-1'>Rs. {item.price + 500}</h1>
                                <h1 className='text-xs text-orange-400 ml-1'>(Rs.500 OFF)</h1>
                            </div>
                            <Button variant="outline"  onClick={() => handleCart(item?.id)} >Add to Cart</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Pagination>
                <PaginationContent>
                    {currentPage > 1 && (
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={handlePreviousPage}
                            />
                        </PaginationItem>
                    )}
                    {[...Array(totalPages)].map((_, page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                onClick={() => handlePageChange(page + 1)}
                            >
                                {page + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    {currentPage < totalPages && (
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={handleNextPage}
                            />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </>
    );
};

export default Products;
