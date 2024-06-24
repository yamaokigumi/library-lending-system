import { Book } from "../main/page";
import firestore from "@/lib/firebase/config";
import { useState,useEffect } from "react";
import { getDocs,collection } from "firebase/firestore";
import { title } from "process";
type InfoProps = {
    isbn:number;
    //0:なにもなし,1:貸出返却,2:追加,3:削除
    status:number;
}
export function Info({isbn,status}:InfoProps){
    const tags = [
        "Android",
        "iOS",
        "Web",
        "プログラミング",
        "コンテナ",
        "OS",
        "クラウド",
        "ネットワーク",
        "データベース",
        "資格",
        "セキュリティ",
        "IoT",
        "ノーコード",
        "デザイン",
        "ゲーム"]
    const [book,setBook] = useState<Book>();
    const db = firestore;

    //それぞれの項目を変更する可能性があるので変数として置いておく
    const [title,setTitle] = useState<string>();
    const [tag ,setTag] = useState<string[]>();
    const [url,setURL] = useState<string>();
    const [booksCount,setBooksCount] = useState<number>();

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
        }else{
            setTitle(book.title);
            setTag(book.tag);
            setURL(book.url);
            setBooksCount(book.booksCount);
        }
    }, [book, db]);
    return(
        <div className="rounded-[100px] bg-[#D9D9D9] object-cover w-[75%] h-[90vh] flex justify-center items-center">
            <div className="rounded-[100px] bg-white object-cover w-[95%] h-[95%] flex flex-col p-5">
                <h1 className="pt-7 text-center ">{title}</h1>
                <label htmlFor="url" className="pt-5" >公式サイト</label>
                <a href={url} className="object-cover w-full text-blue-300 text-nowrap">{url}</a>
                <label htmlFor="stock" className="pt-5">在庫数</label>
                <input type="number" id="stock" className="border border-gray-400 rounded-sm" placeholder="在庫数" value={booksCount} onChange={status==2?(e)=>setBooksCount((Number)(e.target.value)):()=>{}} />
                <label htmlFor="tag" className="pt-5">ジャンルタグ</label>
                {status!=2?
                    <div className="w-full">
                        <textarea name="tag" id="tag" className="border border-gray-400 rounded-sm h-28 w-5/6 resize-none" value={tag} />
                        {status==1?
                            <div className="flex flex-col items-center justify-center">
                                <button className="mt-3  bg-[#3BDEFF] object-cover w-4/5 hover:bg-blue-500 text-white">貸出</button>
                                <button className="mt-3  bg-[#3BDEFF] object-cover w-4/5 hover:bg-blue-500 text-white">返却</button>
                            </div>:
                            <div>
                                {status==0?"":
                                    <div className="flex items-center justify-center">
                                        <button className="mt-3  bg-[#3BDEFF] object-cover w-4/5 hover:bg-blue-500 text-white">削除</button>
                                    </div>
                                }
                            </div>
                            
                        }
                    </div>
                    :
                    <div className="flex flex-col justify-center items-center">
                        <div className="grid gap-3 grid-cols-3 items-center">
                            {tags.map((e)=>(
                                <div ><input type="checkbox" name="java" value={e} />{e}</div>
                            ))}
                            
                        </div>
                        <button className="mt-3  bg-[#3BDEFF] object-cover w-4/5 hover:bg-blue-500 text-white">送信</button>
                    </div>

                }
                                        
            </div>
        </div>
    )
}