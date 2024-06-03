'use client'
import { Header } from "@/app/components/Header"
import { Sample } from "@/app/components/Sample"
import { Info } from "@/app/components/Info"
type PageProps = {
    params: { isbn: number; status: number }
}
export default function rrad({params}:PageProps){
    const {isbn} = params;
    const {status} = params;
    return(
        <main className="min-h-screen">
            <Header/>
            <div className="w-full h-screen justify-center items-center flex flex-row bg-[#FFFAEB] mt-12">
                <div className="flex-1 w-1/2  flex flex-col justify-center items-center ">
                    <Sample isbn={isbn} title={true} />
                </div>
                <div className="flex-1 w-1/2 object-cover flex items-center justify-center bg-white">
                    <Info isbn={isbn} status={status} />
                </div>
            </div>    
        </main>
    )
}