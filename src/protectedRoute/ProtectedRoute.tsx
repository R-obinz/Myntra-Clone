
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Layout from "@/layout/Layout";
import React from "react";


const ProtectedRoute : React.FC = ()=>{

    return (
        <>
        <Layout>
            <Suspense fallback={<div>Loading...</div>}>

                <Outlet/>
            </Suspense>

        </Layout>
        
        </>
    )
}

export default ProtectedRoute; 