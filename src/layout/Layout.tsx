import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import logo from '../assets/logo-myntra-41466.png';
import { Link, useNavigate } from "react-router-dom";
import React from "react";



interface LayoutProps {
    children : React.ReactNode;
}

const Layout : React.FC <LayoutProps> = (props:LayoutProps)=> {
  
  const navigate = useNavigate();
  const user = localStorage?.getItem('token');


  const handleLogin = ()=>{
      navigate('/login');
  }

  const handleCartPage = ()=>{

    if(user){
      navigate('/cart');
    }else{
      navigate('/login');
    }
  }

  const handleLogOut = ()=>{

    localStorage.removeItem('token');
    navigate('/');
  }


 

    return (
        <>
         <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            
        
          <Link
            
            to={"/"}
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <img src={logo} alt=""  className=""/>
        
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            to={"/products"}
            className=" text-muted-foreground transition-colors hover:text-foreground"
          >
            MEN 
          </Link>
          <Link
            to={"/products"}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            WOMEN
          </Link>
          <Link
          to={'/products'}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            KIDS 
          </Link>
          <Link
          to={'/products'}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            HOMELIVING
          </Link>
          <Link
          to={'/products'}
            className=" text-muted-foreground transition-colors hover:text-foreground-"
          >
            STUDIO
          </Link>
        
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              {/* <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link href="#" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Analytics
              </Link> */}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel >Welcome</DropdownMenuLabel>
             {user?null:<DropdownMenuItem><Button onClick={()=>handleLogin()}>LOGIN/SIGNUP</Button></DropdownMenuItem>} 

              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
             {user? <DropdownMenuItem onClick={()=>handleLogOut()}>Logout</DropdownMenuItem>:null}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Heart/>
          <ShoppingBag  cursor={'pointer'} onClick={()=>handleCartPage()}/>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-2 md:gap-4 md:p-8">
        <div className="grid gap-0 md:grid-cols-1 md:gap-8 lg:grid-cols-1">
            
          {props.children}
        </div>
      </main>
    </div>
        
        </>
    )
}

export default Layout; 