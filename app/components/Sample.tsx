import { getDocs,collection } from "firebase/firestore";
import { useEffect,useState } from "react";
import firestore from "@/lib/firebase/config";
import { Book } from "../main/page";
import Image from "next/image";
import axios from "axios";
type SampleProps = {
    isbn: number;
    title: boolean;
  };

export function Sample({isbn,title}:SampleProps){
    const [book,setBook] = useState<Book>();
    const db = firestore;
    const fetchBook = async (isbn: string) => {
        try {
            const response = await axios.get<Book>(`/api/isbn?isbn=${isbn}`);
            const bookData:Book = {
                title: response.data.title,
                image: response.data.image,
                booksCount: 0,
                isbnCode: 0,
                lentBooksCount: 0,
                tag: [],
                url: ""
            }
            setBook(bookData);
            console.log(bookData);
        } catch (err: any) {
            console.log(err);
        }
    }
    
    useEffect(() => {
        if (!book) {
            const getData = async () => {
                const querySnapshot = await getDocs(collection(db, 'books'));
                querySnapshot.forEach((doc) => {
                    // console.log(doc.data());
                    if(doc.data().isbnCode == isbn)
                        setBook(doc.data() as Book);
                });
            };
            getData();
            if(book == null){
                fetchBook(isbn.toString())
            }
            console.log(book);
        }
    }, [book, db]);
    return(
        <div className="w-1/2 h-3/4 flex flex-col items-center ">
            <Image
                src={book?book.image:""}
                width={800}
                height={800}
                alt="image"
            />
            <label htmlFor="stock" className="pt-5">{book?.title}</label>
        </div>
    )
}