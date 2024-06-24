import Image from "next/image"; // Next.jsのImageコンポーネントをインポート
import Link from "next/link"; // Next.jsのLinkコンポーネントをインポート
import { useState, useEffect } from "react"; // Reactのフックをインポーネート
import "@/app/components/Header.css";
// カタカナをひらがなに変換する関数
const toHiragana = (str: string) => {
    return str.replace(/[\u30a1-\u30f6]/g, function (match) {
        return String.fromCharCode(match.charCodeAt(0) - 0x60);
    });
};

// ヘッダーコンポーネントのプロパティの型定義
interface HeaderProps {
    searchKeyword?: string; // オプショナルな検索キーワード
    setSearchKeyword?: (keyword: string) => void; // オプショナルな検索キーワードを設定する関数
    handleLogout?: () => void;
}

// ヘッダーコンポーネントの定義
export function Header({ searchKeyword = "", setSearchKeyword, handleLogout }: HeaderProps) {
    const [Searching, setSearch] = useState(false); // 検索モーダルの表示状態を管理するステート
    const [value, setValue] = useState(searchKeyword); // 入力された検索キーワードを管理するステート

    useEffect(() => {
        setValue(searchKeyword); // 外部からの検索キーワードの変更を反映
    }, [searchKeyword]);

    // モーダルを閉じる関数
    const closeModal = () => {
        setSearch(false); // モーダルを非表示にする
    };

    // 検索を処理する関数
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') { // エンターキーが押されたとき
            if (setSearchKeyword) setSearchKeyword(value); // 親コンポーネントの検索キーワードを更新
            setSearch(false); // モーダルを閉じる
        }
    };

    // タグがクリックされたときの処理
    const handleTagClick = (tag: string) => {
        if (setSearchKeyword) setSearchKeyword(tag); // 親コンポーネントの検索キーワードを更新
        setSearch(false); // モーダルを閉じる
    };

    // モーダルの外側をクリックしたときに閉じる関数
    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) { // モーダルの外側がクリックされたかどうかをチェック
            closeModal(); // モーダルを閉じる
        }
    };

    // 検索タグのリスト
    const tags = ["Android",
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
        "ゲーム"];

    return (
        <div className="fixed top-0 left-0 w-full z-10 border-b-2 border-gray-400">
            <div className="bg-[#F8F8FF] w-full h-10 flex items-center">
                {/* メインページへのリンク */}
                <Link href={"/main"} className="flex items-center ml-3 ">
                    <p className='w-7 h-7 flex items-center text-center justify-center bg-[#3BDEFF] text-white mx-1'>C</p>
                    <p className='w-7 h-7 flex items-center text-center justify-center bg-[#3BDEFF] text-white mx-1'>B</p>
                    <p className='w-7 h-7 flex items-center text-center justify-center bg-[#3BDEFF] text-white mx-1'>I</p>
                    <p className='w-7 h-7 flex items-center text-center justify-center bg-[#3BDEFF] text-white mx-1'>S</p>
                </Link>
                <button className="ml-auto mr-3" onClick={() => setSearch(true)}> {/* 検索モーダルを表示するボタン */}
                    <Image src={"https://www.svgrepo.com/show/486229/magnifying-glass-backup.svg"} width={30} height={30} alt="search" />
                </button>
                <Image src={"https://www.svgrepo.com/show/521518/book-open.svg"} width={30} height={30} alt="admin" className="mr-3" /> {/* 管理者アイコン */}
                <button className="" onClick={handleLogout}>
                    <Image src={"https://www.svgrepo.com/show/502760/logout.svg"} width={30} height={30} alt="admin" className="mr-3" /> {/* ログアウトアイコン */}
                </button>
            </div>
            {/* 検索モーダル */}
            <div
                className={`${Searching ? "block" : "hidden"} shadow-sm backdrop-blur bg-gray-500 bg-opacity-50 absolute top-0 left-0 w-full h-screen`}
                onClick={handleOutsideClick} // モーダルの外側をクリックしたときのイベントハンドラ
            >
                <div className="bg-white flex flex-col items-center">
                    <div className="flex object-cover w-full h-32 items-center justify-center">
                        <div className="relative search">
                            <input
                                type="text"
                                placeholder="title"
                                value={value} // 入力フィールドの値を設定
                                onChange={(e) => setValue(e.target.value)} // 入力フィールドの値が変更されたときの処理
                                onKeyDown={handleSearch} // エンターキーが押されたときの処理
                                className="ml-1 focus:outline-none border-2 border-gray-400 border-solid pl-7"
                            />
                            <Image src={"https://www.svgrepo.com/show/486229/magnifying-glass-backup.svg"} width={25} height={25} alt="search" className="customImage absolute top-[0.7px] left-2" />
                        </div>
                        <button className="w-[30px] h-[30px] text-center flex items-center justify-center" onClick={closeModal}> {/* モーダルを閉じるボタン */}
                            <Image src={"https://www.svgrepo.com/show/520676/cross.svg"} width={30} height={30} alt="close" />
                        </button>
                    </div>
                    <div className="grid grid-cols-5 gap-3 w-4/5 text-center justify-center items-center mb-3">
                        {tags.map((tag, index) => (
                            <button key={index} className="bg-[#D9D9D9] w-[120px] hover:bg-blue-400 hover:text-white border-2 rounded-lg" onClick={() => handleTagClick(tag)}>{tag}</button>
                        ))}{/* タグボタン */}
                    </div>
                </div>
            </div>
        </div>
    );
}
