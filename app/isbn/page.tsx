'use client';

import { useState, useEffect } from 'react';
import firestore from '@/lib/firebase/config';
import { doc, addDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import axios from 'axios';
import { title } from 'process';
import { tags } from '@/app/components/Info';
interface Book {
    id: string;
    title: string;
    authors: string[];
    image: string;
    description: string;
    isbn: number;
}

export default function Home() {
    const [isbn, setIsbn] = useState('');
    const [book, setBook] = useState<Book | null>(null);
    const [error, setError] = useState('');
    const db = firestore;
    const fetchBook = async (isbn: string) => {
        try {
            const response = await axios.get<Book>(`/api/isbn?isbn=${isbn}`);
            setBook(response.data);
            setError('');
            console.log(response.data);
        } catch (err: any) {
            setError(err.response.data.error);
            setBook(null);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setIsbn(value);
    };

    const AddBook = async () => {
        if (book?.isbn) {
            const querySnapshot = await setDoc(doc(db, "books", book.isbn.toString()), {
                booksCount: 1,
                image: book.image,
                isbnCode: book.isbn,
                lentBooksCount: 1,
                tag: [selectedTag],
                title: book.title,
                //url: amazon?
            })
            console.log(querySnapshot);
        } else {
            console.error("isbnがありません");
        }
    }
    const [selectedTag, setSelectedTag] = useState('');
    const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTag(e.target.value);
    
    }
    useEffect(() => {
        if ((isbn.length === 10 || isbn.length === 13) && /^\d+$/.test(isbn)) {
            fetchBook(isbn);
        }
    }, [isbn]);



    return (
        <div>
            <title>ISBN検索テスト</title>
            <h1 className="text-6xl font-bold text-blue-600">ISBN検索</h1>
            <input
                autoFocus
                className='input-field'
                style={{ color: 'black', backgroundColor: 'white' }}
                type="number"
                value={isbn}
                onChange={handleInputChange}
                placeholder="Enter ISBN"
            />
            <button
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800" onClick={() => fetchBook(isbn)}>検索</button> {/* isbnを渡す */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {book && (
                <div>
                    <h2>{book.id}</h2>
                    <h2>{book.title}</h2>
                    <h3>{book.authors.join(', ')}</h3>
                    <img src={book.image} alt={book.title} />
                    <p>{book.description}</p>
                    <p>isbn:{book.isbn}</p>
                    <select
                        className="border border-gray-400 rounded-sm"
                        value={selectedTag}
                        onChange={handleTagChange}>
                        {tags.map((tag) => (
                            <option key={tag} value={tag}>
                                {tag}
                            </option>
                        ))}
                        </select>
                    <button
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-3xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                        onClick={AddBook}>登録</button>
                </div>
            )}
        </div>
    );
}
