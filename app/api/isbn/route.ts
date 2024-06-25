// app/api/books/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

interface BookInfo {
    id: string;
    title: string;
    authors: string[];
    image?: string;
    description?: string; 
    isbn: number;
}

export async function GET(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const isbn = searchParams.get('isbn');

    if (!isbn) {
        return NextResponse.json({ error: 'ISBN is required' }, { status: 400 });
    }

    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const data = response.data;

        if (data.totalItems === 0) {
            return NextResponse.json({ error: 'Book not found' }, { status: 404 });
        }

        const book = data.items[0].volumeInfo;
        const bookId = data.items[0].id;

        const bookInfo: BookInfo = {
            id: bookId,
            title: book.title,
            authors: book.authors || [], 
            image: book.imageLinks?.thumbnail,
            description: book.description,
            isbn: book.industryIdentifiers[0].identifier,
        };

        return NextResponse.json(bookInfo);
    } catch (error) {
        console.error(error); // エラーログを出力
        return NextResponse.json({ error: 'Failed to fetch data from Google Books API' }, { status: 500 });
    }
}
