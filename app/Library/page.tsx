'use client';
import Image from 'next/image';
import firestore from '../../lib/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

export type Book = {
    jancode: number;
    title: string;
    image: string;
    tag: string;
    url: string;
    count: number;
};

export default function Library() {
    const [books, setBooks] = useState<Book[] | null>(null);
    const db = firestore;

    useEffect(() => {
        if (!books) {
            const getData = async () => {
                const querySnapshot = await getDocs(collection(db, 'books'));
                const booksData: Book[] = [];
                querySnapshot.forEach((doc) => {
                    booksData.push(doc.data() as Book);
                });
                setBooks(booksData);
            };
            getData();
        }
    }, [books, db]);

    return (
        <main className="min-h-screen">
            <div className="fixed top-0 left-0 w-full z-10">
                <div className="bg-[#3BDEFF] w-full h-10 flex items-center justify-center">
                    <p className='pr-10'>ECC図書館</p>
                    <input type="text" placeholder="本のタイトル" className="p-2 rounded" />
                </div>
            </div>
            <div className="flex flex-row mt-20">
                <div className="w-1/2 bg-[#FFFAEB] h-screen fixed top-10 text-justify p-4">
                    #JAVA
                </div>
                <div className="w-1/2 bg-white grid grid-cols-2 relative left-1/2 ">
                    {books?.map((book,i) => (
                        <div key={book.jancode} className={`relative flex flex-col items-center justify-center  ${(Math.floor(i / 2) + (i % 2)) % 2 === 0?"bg-white":"bg-[#FFFAEB]"}`}>
                            <div className="w-full h-64 relative">
                                <Image
                                    src={book.image}
                                    alt={book.title}
                                    layout="fill"
                                    objectFit="contain"
                                    className="rounded"
                                />
                            </div>
                            <p className="mt-2 text-center">{book.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
