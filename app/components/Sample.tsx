import { getDocs,collection } from "firebase/firestore";
import { useEffect,useState } from "react";
import firestore from "@/lib/firebase/config";
import { Book } from "../main/page";
import Image from "next/image";
type SampleProps = {
    isbn: number;
    title: boolean;
  };

export function Sample({isbn,title}:SampleProps){
    const [book,setBook] = useState<Book>();
    const db = firestore;
    useEffect(() => {
        if (!book) {
            const getData = async () => {
                const querySnapshot = await getDocs(collection(db, 'books'));
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                    if(doc.data().isbnCode == isbn)
                        setBook(doc.data() as Book);
                });
            };
            getData();
            console.log(book);
        }
    }, [book, db]);
    return(
        <div className="w-1/2 h-3/4 flex flex-col items-center">
            <Image
                src={book?book.image:""}
                width={300}
                height={300}
                alt="image"
            />
            {title?book?.title:book?book.tag[0]:""}
        </div>
    )
}