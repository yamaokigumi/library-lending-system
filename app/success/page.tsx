import { headers } from 'next/headers';
import { admin } from '@/lib/firebase/serverConfig'; // Firebase Admin SDKの初期化
import { redirect } from 'next/navigation';

async function Page() {
    const headersList = headers();
    const token = headersList.get('authorization')?.split('Bearer ')[1];

    try {
        await admin.auth().verifyIdToken(token ?? '');
        return (
            // ログイン済みの場合のページ内容
            <div>
                <h1 >ログイン成功</h1>
                <p>ログインが成功して管理者ページのトップ画面が表示されてるはずだよ</p>
            </div>
        );
    } catch (error) {
        // 未ログインの場合のリダイレクト
        redirect('/test-auth');
    }
}

export default Page;

// export default function success () {
//     return (
//         <div>
//             <h1 >ログイン成功</h1>
//             <p>ログインが成功して管理者ページのトップ画面が表示されてるはずだよ</p>
//         </div>
//     );
// }