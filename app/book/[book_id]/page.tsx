'use client'
import icon from "@/app/favicon.ico"
import Image from "next/image";
import { Book } from "@/app/main/page";
import { useEffect , useState} from "react";
import firestore from '@/lib/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { Header } from "@/app/components/Header";
type PageProps = {
    params:{book_id:number}
}
export default function book({params}:PageProps){
    const {book_id} = params;
    const [book, setBook] = useState<Book | null>(null);
    const db = firestore;

    useEffect(() => {
        if (!book) {
            const getData = async () => {
                const querySnapshot = await getDocs(collection(db, 'books'));
                const booksData: Book[] = [];
                querySnapshot.forEach((doc) => {
                    booksData.push(doc.data() as Book);
                });
                booksData.forEach(element => {
                    if(element.jancode == book_id){
                        setBook(element as Book)
                    }
                });
            };
            getData();
        }
    }, [book, db]);
    return(
        <main className="min-h-screen">
            <Header/>
            <div className="w-full h-screen justify-center items-center flex flex-row bg-[#FFFAEB] mt-12">
                <div className="flex-1 w-1/2  flex flex-col justify-center items-center ">
                    <Image
                        src={book?book.image:icon}
                        alt={"book image"}
                        width={167}
                        height={249}
                        objectFit="cover"
                        className="w-1/2 h-full"
                    />
                    <p className="text-xl">{book?.title}</p>
                </div>
                <div className="flex-1 w-1/2 object-cover flex items-center justify-center bg-white">
                    <div className="rounded-[100px] bg-[#D9D9D9] object-cover w-[90%] h-screen flex justify-center items-center">
                        <div className="rounded-[100px] bg-white object-cover w-[90%] h-[90%] flex flex-col ">
                            <label htmlFor="url" className="px-10 pt-10" >URL</label>
                            <input type="text" id="url" className="mx-10 border border-gray-400 rounded-sm" placeholder="URL" value={book?.url} readOnly/>
                            <label htmlFor="stock" className="px-10 pt-10">在庫数</label>
                            <input type="text" id="stock" className="mx-10 border border-gray-400 rounded-sm" placeholder="在庫数" value={book?.count}readOnly/>
                            <label htmlFor="tag" className="px-10 pt-10">ジャンルタグ</label>
                            <textarea name="tag" id="tag" className="border border-gray-400 rounded-sm mx-10 h-28" value={book?.tag} readOnly/>                        
                        </div>
                    </div>
                </div>
            </div>    
        </main>
    )
}