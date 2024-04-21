import React from "react";
import Banner from "./Banner";
import LimitedProducts from "./LimitedProducts";
import OfferTime from "./OfferTime";




const Home : React.FC = ()=>{

    return (
        <>
        <OfferTime/>
        <Banner/>
        <LimitedProducts/>
        </>
    )
}

export default Home ; 