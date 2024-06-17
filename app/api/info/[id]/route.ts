import { boolean, z } from "zod";
import { db } from "@/lib/firebase/serverConfig";
import { DocumentSnapshot } from "firebase-admin/firestore";

export async function DELETE(request: Request, { params }: { params: { id: string }}) {
 const id = params.id;

 try {
  db.collection("books").doc(id).delete();
 } catch(e) {
  return Response.json({ message: "削除時に何らかのエラーが発生しました。" });
 }
  return Response.json({ message: "正常に削除処理が完了しました。" });
}

const lendReturnSchema = z.object({
  lend: z.boolean()
});


export async function PUT(request: Request, { params }: { params: { id: string }}) {
  const id = params.id;
  let requestJson;

  try {
    requestJson = await request.json();
  } catch {
    return Response.json({ message: "リクエストボディにJSONをセットして送信してください。" });
  }

  const parsedObj = lendReturnSchema.safeParse(requestJson);
  
  if(!parsedObj.success) {
    return Response.json({ message: "貸し出しか返却か選択されていません。" });
  }

  try {
    const bookData: DocumentSnapshot = await db.collection("books").doc(id).get();
    const data = bookData.data();
    
    let updateData;
    if(data) {
      if (requestJson.lend) {
        updateData = { ...data, lentBooksCount: data.lentBooksCount - 1 };
      } else {
        updateData = { ...data, lentBooksCount: data.lentBooksCount + 1 };
      }

      db.collection("books").doc(id).update(updateData);
    }
  } catch (e) {
    return Response.json({ message: "貸し出し・返却処理で何らかのエラーが発生しました。" })
  }

  return Response.json({ message: "貸し出し・返却処理が正常に終了しました。" });
}