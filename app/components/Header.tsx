import Image from "next/image"
import Link from "next/link"
export function Header() {
    return (
        <div className="fixed top-0 left-0 w-full z-10">
            <div className="bg-[#3BDEFF] w-full h-10 flex items-center">
                <Link href={"/main"}><p className='px-10'>ECC Library</p></Link>
                <button className="ml-[1000px] mr-3"><Image src={"https://www.svgrepo.com/show/486229/magnifying-glass-backup.svg"} width={30} height={30} alt="search"></Image></button>
                <Image src={"https://www.svgrepo.com/show/521518/book-open.svg"} width={30} height={30} alt="admin"></Image>
            </div>
        </div>
        )
}