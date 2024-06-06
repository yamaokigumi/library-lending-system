'use client'
import { useAuthContext } from "@/context/AuthContext";
import { signOutUser } from "@/lib/firebase/signIn";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page(): JSX.Element {
    const { user } = useAuthContext() as { user: any }; // Use 'as' to assert the type as { user: any }
    const router = useRouter();

    useEffect(() => {
        //ログインしてない場合はログインページに遷移させるif文(改変可)
        //おそらく全ページにこのコードを書く必要がある？
        if (user == null) {
            router.push("/test-auth");
        }
    }, [user, router]); 
    //ログアウト処理
    const handleLogout = async () => {
        await signOutUser();
        router.push("/test-auth");
    }
    return (
        <div>
        <h1>ログイン成功</h1>
        <button onClick={handleLogout} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            ログアウト
        </button>
        </div>
    );
}

export default Page;