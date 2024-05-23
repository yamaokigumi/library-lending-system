
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
export function Header() {
    const [Searching,setSearch] = useState(false);
    const [value,setValue] = useState("");
    const closeModal = () =>{
        setSearch(false);
        setValue("");
    }
    //テスト
    const tags = ["参考書","java","php","html","css","python","aws","firebase","c#","ruby","javascript","typescript","spring","laravel"]
    return (
        <div className="fixed top-0 left-0 w-full z-10">
            <div className="bg-[#3BDEFF] w-full h-10 flex items-center">
                <Link href={"/main"}><p className='px-10'>ECC Library</p></Link>
                <button className="ml-[1000px] mr-3" onClick={()=>setSearch(true)}>
                    <Image src={"https://www.svgrepo.com/show/486229/magnifying-glass-backup.svg"} width={30} height={30} alt="search"/>
                </button>
                <Image src={"https://www.svgrepo.com/show/521518/book-open.svg"} width={30} height={30} alt="admin" />
                
            </div>
            {/* 検索 */}
            <div className={`${Searching?"block":"hidden"} shadow-sm backdrop-blur bg-gray-500 bg-opacity-50 absolute top-0 left-0 w-full h-screen `}>
                <div className="bg-white flex flex-col items-center">
                    <div className="flex object-cover w-full h-32  items-center justify-center">
                        <div className="flex border border-solid border-black">
                            <input type="text" placeholder="title" value={value} onChange={(e)=>setValue(e.target.value)} className="ml-1 focus:outline-none"/>
                            <Image src={"https://www.svgrepo.com/show/486229/magnifying-glass-backup.svg"} width={30} height={30} alt="search"/>
                        </div>
                        <button className="w-[30px] h-[30px] text-center flex ce" onClick={()=>closeModal()}>
                            <Image 
                                src={"https://www.svgrepo.com/show/520676/cross.svg"} 
                                width={30} height={30} 
                                alt={"corss"} 
                            />
                        </button>
                    </div>
                    <div className="grid grid-cols-5 gap-3 w-4/5 text-center justify-center items-center mb-3"> 
                        {tags.map((tag)=>(
                            <button className="bg-[#D9D9D9] w-[100px]">{tag}</button>
                        ))}

                        
                    </div>
                </div>
            </div>
        </div>
        )
}