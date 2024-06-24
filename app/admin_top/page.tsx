'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Home() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null); // 選択された画像
    const [destination, setDestination] = useState<string | null>(null); // 目的地のURL
    const router = useRouter(); // Next.jsのルーター
    const [barcode,setBarcode] = useState<string>();
    let inputbarcode:string = "";

    // 画像がクリックされたときの処理
    const handleImageClick = (image: string, dest: string) => {
        setSelectedImage(image); // 選択された画像を設定
        setDestination(dest); // 目的地のURLを設定
    };

    // 選択された画像がクリックされたときの処理
    const handleSelectedImageClick = () => {
        setSelectedImage(null); // 選択された画像をリセット
        setDestination(null); // 目的地のURLをリセット
    };
    
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
