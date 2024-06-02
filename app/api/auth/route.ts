import { NextResponse } from 'next/server';
import { admin } from '@/lib/firebase/serverConfig';

export async function POST(request: Request) {
    const { idToken } = await request.json();

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        // 認証成功時の処理 (セッションの作成、クッキーの設定など)
        return NextResponse.json({ message: 'Login successful' });
    } catch (error) {
        return NextResponse.json({ message: 'Login failed' }, { status: 401 });
    }
}

