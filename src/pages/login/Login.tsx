
import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const Login : React.FC = ()=>{

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void; })=>{
    e.preventDefault();
  

    axios.post('https://fakestoreapi.com/auth/login',{
       
          username: username,
          password: password
      
    }).then((res)=>{

      localStorage.setItem('token',res?.data);

      navigate('/');
      

    }).catch((err)=>{
        console.log('the error is',err);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          // action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
        
        
    })
    
  }


    return(
        <>
     <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">username</Label>
            <Input
              id="email"
              type="text"
              placeholder=""
              required
              value={username}
              onChange={(e)=>setUsername(e?.target?.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            
            </div>
            <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        
        </div>
        </form>
        
      </CardContent>
    </Card>

    <Toaster/>
        </>
    )
}

export default Login;