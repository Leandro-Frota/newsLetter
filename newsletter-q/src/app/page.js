"use client";

import Image from "next/image";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast'

export default function Home() {
  const [name, setName] = useState("")
  const [email,setEmail] = useState("")

  function onSubmit(){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "name": name,
      "email": email
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:3001/email/register-email", requestOptions)
      .then((response) =>{
        if(response.status !== 200){
          throw new Error("Erro ao realizar inscrição")
        }
         toast.success("Inscrição realizada com sucesso")
        })
        
      .then((result) => console.log(result))
      .catch((error) => toast.error("Erro ao realizar inscrição"));
  }

  return (
   
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="h-[28rem] p-5 w-2/3 bg-cyan-600 rounded-lg flex">
          <div className="relative flex justify-center items-center bg-indigo-500 flex-[2] min-h-full rounded">
            <Image src="https://cdn-icons-png.flaticon.com/512/4939/4939994.png" alt="hero" layout="fill" objectFit="contain" className="rounded max-h-36 flex mt-20" />
          </div>
          <div className="flex-[3] px-16 min-h-full flex flex-col text-white justify-center items-center gap-5">
            <h1 className="text-2xl">Se increva para receber as novidades!</h1>
            <p className="text-lg">Nunca mais se esqueça de comprar seus insumos semanais com qualidade de vida!</p>
            <input value={name} onChange={(e)=> setName(e.target.value)} className="w-full p-2 rounded text-black" type="text" placeholder="Digite seu nome" />
            <input value={email} onChange={(e)=> setEmail(e.target.value)} className="w-full p-2 rounded text-black" type="email" placeholder="Digite seu email" />
            <button onClick={onSubmit} className="bg-indigo-500 p-4 rounded min-w-full">Inscrever-se</button>
          </div>
        </div>
        <Toaster/>
      </main>
    
  );

}
