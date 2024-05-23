import { db } from "@/lib/firebase/serverConfig";

export async function DELETE(request: Request, { params }: { params: { id: string }}) {
 const id = params.id;

 try {
  db.collection("books").doc(id).delete();
 } catch(e) {
  return Response.json({ message: "削除時に何らかのエラーが発生しました。" });
 }

  return Response.json({ message: "正常に削除処理が完了しました。" });
}