import { z } from "zod";
import { db } from "@/lib/firebase/serverConfig";

// 取り急ぎcreate部分を作成する
const bookInfoSchema = z.object({
  title: z.string(),
  image: z.string(),
  isbnCode: z.string(),
  lentBooksCount: z.number(),
  tag: z.array(z.string()),
  url: z.string(),
  booksCount: z.number(),
});

type bookInfo = z.infer<typeof bookInfoSchema>;

export async function POST(request: Request) {
  const requestJson: bookInfo = await request.json();

  console.log("requestJson");
  console.log(requestJson);

  const parsedObj = bookInfoSchema.safeParse(requestJson);

  console.log("aaa");

  if(!parsedObj.success) {
    const fieldErrors = parsedObj.error.flatten().fieldErrors;
    const errorsArray = Object.values(fieldErrors).flat() as string[];

    return Response.json({
        message: errorsArray
    });
  }

  // create部分
  try {
    // const docRef = db.collection("books").doc(requestJson.isbnCode.toString());
    // await docRef.set(requestJson);

    const docRef = await db.collection("books").doc(requestJson.isbnCode + "bbbb").set(requestJson);
    console.log(docRef);
  } catch (err) {
    return Response.json({
      message: "アップデート時に何らかのエラーが発生しました。"
   });
  }
    return Response.json({ message: "正常にアップデート処理が終了しました。" });
}