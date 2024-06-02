"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Content } from "next/font/google";
import { useState } from "react";
import { auth } from "@/lib/firebase/config"
import { useRouter } from "next/navigation";
import success from "../success/page"

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, postMessage] = useState("");


    const handleLogin = async () => {
        try {
            const userToken = await signInWithEmailAndPassword(auth, email, password); // Pass the auth object as an argument to signInWithEmailAndPassword
            const idToken = await userToken.user.getIdToken();
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idToken }),
            });
            if (response.ok) {
                const data = await response.json(); // レスポンスデータを取得
                console.log('Login successful:', data); // ログイン成功メッセージとデータを表示
                postMessage("ログイン成功！");
                router.push("/success");
            } else {
                postMessage("ログイン失敗");
            }
        } catch (error) {
            console.error(error);
            postMessage("ログイン失敗");
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            {message && <p>{message}</p>}
        </div>
    );
}

