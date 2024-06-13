import { Book } from "../main/page";
import firestore from "@/lib/firebase/config";
import { useState,useEffect } from "react";
import { getDocs,collection } from "firebase/firestore";
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
            setTag(book.tag);
            setURL(book.url);
            setBooksCount(book.booksCount);
        }
    }, [book, db]);
    return(
        <div className="rounded-[100px] bg-[#D9D9D9] object-cover w-[90%] h-screen flex justify-center items-center">
            <div className="rounded-[100px] bg-white object-cover w-[90%] h-[90%] flex flex-col ">
                <label htmlFor="url" className="px-10 pt-10" >URL</label>
                <input type="text" id="url" className="mx-10 border border-gray-400 rounded-sm" placeholder="URL" value={url} onChange={status==2?(e)=>setURL(e.target.value):()=>{}}/>
                <label htmlFor="stock" className="px-10 pt-10">在庫数</label>
                <input type="number" id="stock" className="mx-10 border border-gray-400 rounded-sm" placeholder="在庫数" value={booksCount} onChange={status==2?(e)=>setBooksCount((Number)(e.target.value)):()=>{}} />
                <label htmlFor="tag" className="px-10 pt-10">ジャンルタグ</label>
                {status!=2?
                    <div className="w-full">
                        <textarea name="tag" id="tag" className="border border-gray-400 rounded-sm mx-10 h-28 w-5/6" value={tag} />
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
                        <div className="grid gap-3 grid-cols-5 items-center">
                            {tags.map((e)=>(
                                <div><input type="checkbox" name="java" value={e} />{e}</div>
                            ))}
                            
                        </div>
                        <button className="mt-3  bg-[#3BDEFF] object-cover w-4/5 hover:bg-blue-500 text-white">送信</button>
                    </div>

                }
                                        
            </div>
        </div>
    )
}