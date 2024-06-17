'use client'
import signIn from "@/lib/firebase/signIn";
import { set } from "firebase/database";
import { useRouter } from 'next/navigation';
import { useState } from "react";

function Page(): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [showEmailError, setShowEmailError] = useState(false);
    // const [showPasswordError, setShowPasswordError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const router = useRouter();

    const handleForm = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        // サインインチェック
        const { result, error } = await signIn(email, password);

        if (error) {
           //エラー処理
            console.log(error);
            setLoginError(true);
            return;
        }

        // ログイン成功
        console.log(result);

        //ログイン成功して遷移させるページの指定(自由に変えていい)
        //
        router.push("/main");
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full max-w-xs">
                <form onSubmit={handleForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-3xl font-bold mb-6 text-black">Sign In</h1>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder="example@mail.com"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {/* {showEmailError && <p className="text-red-500 text-xs italic">メールアドレスは必須です</p>} */}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                            name="password"
                            id="password"
                            placeholder="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {/* {showPasswordError && <p className="text-red-500 text-xs italic">パスワードは必須です</p>} */}
                    </div>
                    {loginError && <p className="text-red-500 text-xs italic">ログインに失敗しました</p>}
                    <div className="flex items-center justify-between">
                        
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-semibold py-2 rounded"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Page;