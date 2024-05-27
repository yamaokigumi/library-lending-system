'use client';
import icon from "@/app/favicon.ico"; // デフォルトのアイコン画像をインポート
import Image from "next/image"; // Next.jsのImageコンポーネントをインポート
import type { Book } from "@/app/main/page"; // Bookの型定義をインポート
import { useEffect, useState } from "react"; // Reactのフックをインポート
import firestore from '@/lib/firebase/config'; // Firestoreの設定をインポート
import { collection, getDocs } from 'firebase/firestore'; // Firestoreからコレクションとデータを取得するための関数をインポート
import { Header } from "@/app/components/Header"; // ヘッダーコンポーネントをインポート

// ページのプロパティの型定義
type PageProps = {
    params: { book_id: number }
}

// Bookコンポーネントの定義
export default function Book({ params }: PageProps) {
    const { book_id } = params; // パラメータからbook_idを取得
    const [book, setBook] = useState<Book | null>(null); // bookの状態を管理
    const db = firestore; // Firestoreデータベースの参照を取得

    // データの取得を行うuseEffectフック
    useEffect(() => {
        if (!book) {
            const getData = async () => {
                // Firestoreからデータを取得
                const querySnapshot = await getDocs(collection(db, 'books'));
                querySnapshot.forEach((doc) => {
                    // 取得したデータの中から対象のbook_idのデータを設定
                    if (doc.data().isbnCode === book_id)
                        setBook(doc.data() as Book);
                });
            };
            getData(); // データ取得関数を実行
        }
    }, [book, db]); // bookとdbの変更を監視

    return (
        <main className="min-h-screen">
            <Header /> {/* ヘッダーコンポーネントを表示 */}
            <div className="w-full h-screen justify-center items-center flex flex-row bg-[#FFFAEB] mt-12">
                <div className="flex-1 w-1/2 flex flex-col justify-center items-center ">
                    <Image
                        src={book ? book.image : icon} // 書籍の画像がある場合はそれを表示し、ない場合はデフォルトのアイコンを表示
                        alt={"book image"}
                        width={167}
                        height={249}
                        objectFit="cover"
                        className="w-1/2 h-full"
                    />
                    <p className="text-xl">{book?.title}</p> {/* 書籍のタイトルを表示 */}
                </div>
                <div className="flex-1 w-1/2 object-cover flex items-center justify-center bg-white">
                    <div className="rounded-[100px] bg-[#D9D9D9] object-cover w-[90%] h-screen flex justify-center items-center">
                        <div className="rounded-[100px] bg-white object-cover w-[90%] h-[90%] flex flex-col ">
                            <label htmlFor="url" className="px-10 pt-10" >URL</label>
                            <input type="text" id="url" className="mx-10 border border-gray-400 rounded-sm" placeholder="URL" value={book?.url} readOnly /> {/* 書籍のURLを表示 */}
                            <label htmlFor="stock" className="px-10 pt-10">在庫数</label>
                            <input type="text" id="stock" className="mx-10 border border-gray-400 rounded-sm" placeholder="在庫数" value={book?.booksCount} readOnly /> {/* 書籍の在庫数を表示 */}
                            <label htmlFor="tag" className="px-10 pt-10">ジャンルタグ</label>
                            <textarea name="tag" id="tag" className="border border-gray-400 rounded-sm mx-10 h-28" value={book?.tag ? book.tag.join(", ") : ""} readOnly /> {/* 書籍のジャンルタグを表示 */}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
