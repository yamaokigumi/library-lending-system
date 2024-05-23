import { db } from "@/lib/firebase/serverConfig";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bookId = searchParams.get("book_id");

  let booksRecordsData;
  try {
    const booksRecords = await db.collection("books").where("id", "==", bookId).get();
    booksRecordsData = booksRecords.docs.map((booksRecord => booksRecord.data()));
    // console.log(booksRecordsData);
  } catch (e) {
      return Response.json({ errorMessage: "book_idに紐づくレコードが存在しません。" });
  }

  return Response.json({ booksRecordsData });
} 