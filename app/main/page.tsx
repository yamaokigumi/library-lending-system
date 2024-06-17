'use client';
import Image from 'next/image'; // Next.jsのImageコンポーネントをインポート
import firestore from '@/lib/firebase/config'; // Firestoreの設定をインポート
import { collection, getDocs } from 'firebase/firestore'; // Firestoreからコレクションとドキュメントを取得するための関数をインポート
import React, { useEffect, useState } from 'react'; // Reactのフックをインポート
import Link from 'next/link'; // Next.jsのLinkコンポーネントをインポート
import { Header } from '../components/Header'; // ヘッダーコンポーネントをインポート
import { Sample } from '../components/Sample'; // Sampleコンポーネントをインポート

// カタカナをひらがなに変換する関数
const toHiragana = (str: string) => {
    return str.replace(/[\u30a1-\u30f6]/g, function(match) {
        return String.fromCharCode(match.charCodeAt(0) - 0x60);
    });
};

// Book型の定義
export type Book = {
    booksCount: number; // 在庫数
    image: string; // 書籍の画像URL
    isbnCode: number; // ISBNコード
    lentBooksCount: number; // 貸出済み書籍数
    tag: string[]; // 書籍のタグ（オプショナル）
    title: string; // 書籍のタイトル
    url: string; // 書籍のURL
};

// Mainコンポーネントの定義
export default function Main() {
    const [books, setBooks] = useState<Book[] | null>(null); // 書籍のリストを管理する状態
    const [searchKeyword, setSearchKeyword] = useState<string>(""); // 検索キーワードを管理する状態
    const db = firestore; // Firestoreのインスタンス

    // useEffectフックを使用してFirestoreからデータを取得
    useEffect(() => {
        if (!books) { // 書籍データがまだ取得されていない場合
            const getData = async () => {
                const querySnapshot = await getDocs(collection(db, 'books')); // Firestoreからbooksコレクションのドキュメントを取得
                const booksData: Book[] = [];
                querySnapshot.forEach((doc) => {
                    booksData.push(doc.data() as Book); // 取得したドキュメントをBook型にキャストして配列に追加
                });
                setBooks(booksData); // 書籍データを状態に設定
            };
            getData(); // データ取得関数を実行
        }
    }, [books, db]); // booksとdbが変更されたときに再実行

    const normalizedSearchKeyword = toHiragana(searchKeyword.toLowerCase());

    // フィルタリングされた書籍データを取得
    const filteredBooks = books?.filter(book => {
        const normalizedTitle = toHiragana(book.title.toLowerCase());
        const normalizedTags = book.tag?.map(tag => toHiragana(tag.toLowerCase())) || [];
        return normalizedTitle.includes(normalizedSearchKeyword) || normalizedTags.some(tag => tag.includes(normalizedSearchKeyword));
    });

    return (
        <main className="min-h-screen">
            <Header searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} /> {/* ヘッダーコンポーネント */}
            <div className="flex flex-row mt-20">
                <div className="w-1/2 bg-[#FFFAEB] h-screen fixed top-10 text-center p-4 flex items-center justify-center">
                    <Sample isbn={9784297124533} title={false} /> {/* Sampleコンポーネント */}
                </div>
                <div className="w-1/2 bg-white grid grid-cols-2 relative left-1/2 ">
                    {filteredBooks?.map((book, i) => (
                        <div key={book.isbnCode} className={`relative flex flex-col items-center justify-center ${(Math.floor(i / 2) + (i % 2)) % 2 === 0 ? "bg-white" : "bg-[#FFFAEB]"}`}>
                            <div className="w-full h-64 relative">
                                <Link href={`../book/${book.isbnCode}`}> {/* 書籍詳細ページへのリンク */}
                                    <Image
                                        src={book.image} // 書籍の画像URL
                                        alt={book.title} // 代替テキストとして書籍のタイトル
                                        layout="fill"
                                        objectFit="contain"
                                        className="rounded" // 角を丸くするクラス
                                    />
                                </Link>
                            </div>
                            <p className="mt-2 text-center">{book.title}</p> {/* 書籍のタイトル */}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
