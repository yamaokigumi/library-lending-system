'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

interface Book {
    title: string;
    image: string;
    tag: string[];
    isbnCode: number;
    url: string;
    booksCount: number;
    lentBooksCount: number;
}

export default function Home() {
    const [isbn, setIsbn] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null); // 選択された画像
    const [destination, setDestination] = useState<string | null>(null); // 目的地のURL
    const router = useRouter(); // Next.jsのルーター
    const [barcode,setBarcode] = useState<string>();
    let inputbarcode:string = "";

    // 画像がクリックされたときの処理
    const handleImageClick = (image: string, dest: string) => {
        setSelectedImage(image); // 選択された画像を設定
        setDestination(dest); // 目的地のURLを設定
        //図書追加削除を選択した場合
        if(dest == "/add-remove-books"){

        }
    };

    // 選択された画像がクリックされたときの処理
    const handleSelectedImageClick = () => {
        setSelectedImage(null); // 選択された画像をリセット
        setDestination(null); // 目的地のURLをリセット
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setIsbn(value);
        router.push(`../book/${value}`);
    };

    // 登録用:この関数発火させてください。
    const registerBook = async (book: Book) => {
        const response = await fetch("/api/info", {
            method: "POST",
            body: JSON.stringify(book)
        });

        console.log(response);
    }

    
    useEffect(() => {
        if (selectedImage && destination) {
            const handleKeyPress = (event: KeyboardEvent) => {
                console.log(event);
                if (event.key === "Enter") {
                    setBarcode(inputbarcode);
                    if(selectedImage == "/add-square-svgrepo-com.svg"){
                        const buttons:any = document.querySelector("#newImage")?.querySelectorAll("button");
                        buttons[0].style.display = "block";
                        buttons[1].style.display = "block";
                    }
                    
                }else{
                    inputbarcode += event.key;
                }
            };
            window.addEventListener('keypress', handleKeyPress);
            return () => {
                window.removeEventListener('keypress', handleKeyPress);
            };
        }
    }, [selectedImage, destination, router]);

    useEffect(()=>{
        if(barcode ){
            if(selectedImage != "/add-square-svgrepo-com.svg"){
                const dest = "/rrad/" + barcode + "/1"
                router.push(dest);
            }
        }
    },[barcode])

    useEffect(() => {
        if ((isbn.length === 10 || isbn.length === 13) && /^\d+$/.test(isbn)){
            // const fetchBook = async (isbn: string) => {
            //     try {
            //         const response = await fetch(`/api/isbn?isbn=${isbn}`);
            //         const book: Book = await response.json();
            //         console.log(book);
            //         console.log("isbnCode:", book.isbnCode);
            //         if(book?.isbnCode){
            //             //setBarcode(book.isbnCode.toString());
            //             console.log("発火");
            //             router.push(`../book/${book.isbnCode}`)
            //         }
            //     } catch (err: any) {
            //         console.error(err);
            //     }
            // };

            //fetchBook(isbn);
        }
    }, [isbn]);

    const AddDel = (add:Boolean)=>{
        let dest:string;
        if(add){
            dest = "/rrad/" + barcode + "/2";
        }else{
            dest = "/rrad/" + barcode + "/3";
        }
        router.push(dest);
    }
    return (
        <div className={styles.container} id="container">
            {!selectedImage && (
                <div className={styles.imagesContainer}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/back-return-svgrepo-com.svg"
                            className={styles.image}
                            width={300}
                            height={300}
                            onClick={() => handleImageClick('/back-return-svgrepo-com.svg', '/back-return')}
                            alt="Back Return"
                        />
                        <p className={styles.imageText}>貸出・返却</p>
                    </div>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/add-square-svgrepo-com.svg"
                            className={styles.image}
                            width={300}
                            height={300}
                            onClick={() => handleImageClick('/add-square-svgrepo-com.svg', '/add-remove-books')}
                            alt="Add Square"
                        />
                        <p className={styles.imageText}>書籍追加・削除</p>
                    </div>
                </div>
            )}
            {selectedImage && (
                <div className={styles.selectedContainer}>
                    <Image
                        src={selectedImage}
                        className={`${styles.image} ${styles.selectedImage}`}
                        onClick={handleSelectedImageClick}
                        alt="Selected"
                        width={100}
                        height={100}
                    />
                    
                    <div className={styles.newImage} id="newImage">
                        <Image 
                            src='/barcode-2-svgrepo-com.svg' 
                            alt="New Image" 
                            width={600} 
                            height={600} />
                            <input autoFocus 
                            className='input-field w-3/4' 
                            style={{ color: 'black', backgroundColor: 'white' }}
                            type="number"
                            value={isbn}
                            onChange={handleInputChange}
                            placeholder="バーコードリーダーで読み取ってください"
                            />
                        <div className='flex'>
                            <button onClick={()=>AddDel(true)}>add</button>
                            <button onClick={()=>AddDel(false)}>delete</button>
                        </div>
                    </div>
                    <div id="interactive" className={styles.barcodeScanner}></div> {/* バーコードスキャナーの表示領域 */}
                </div>
            )}
        </div>
    );
}
