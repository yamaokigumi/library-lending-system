'use client'
import icon from "@/app/favicon.ico"
import Image from "next/image";
import { Book } from "@/app/main/page";
import { useEffect , useState} from "react";
import firestore from '@/lib/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { Header } from "@/app/components/Header";
import { Sample } from "@/app/components/Sample";
import {Info} from "@/app/components/Info";
type PageProps = {
    params:{isbn:number}
}
export default function book({params}:PageProps){
    const {isbn} = params;
    const [book, setBook] = useState<Book | null>(null);
    const db = firestore;

    useEffect(() => {
        if (!book) {
            const getData = async () => {
                const querySnapshot = await getDocs(collection(db, 'books'));
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                    if(doc.data().isbnCode == isbn)
                        setBook(doc.data() as Book)
                });
            };
            getData();
            console.log(book);
        }
    }, [book, db]);
    return(
        <main className="min-h-screen">
            <Header/>
            <div className="w-full h-screen justify-center items-center flex flex-row bg-white mt-4">
                <div className="h-full flex-1 w-1/2  flex flex-col justify-center items-center border-r-2 border-gray-200">
                    <Sample isbn={isbn} title={true} />
                </div>
                <div className="flex-1 w-1/2 object-cover flex items-center justify-center bg-white">
                    <Info isbn={isbn} status={0} />
                </div>
            </div>    
        </main>
    )
}