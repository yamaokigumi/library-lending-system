import { db } from "@/lib/firebase/serverConfig";
import { z } from "zod";

const bookInfoSchema = z.object({
  title: z.string(),
  image: z.string(),
  tag: z.array(z.string()),
  isbnCode: z.number(),
  url: z.string(),
  booksCount: z.number(),
  lentBooksCount: z.number()
});

type bookInfo = z.infer<typeof bookInfoSchema>

export async function PUT(request: Request) {
  const requestJson: bookInfo = await request.json();

  console.log(requestJson);

  const parsedObj = bookInfoSchema.safeParse(requestJson);

  if(!parsedObj.success) {
    const fieldErrors = parsedObj.error.flatten().fieldErrors;
    const errorsArray = Object.values(fieldErrors).flat() as string[];

    return Response.json({
        message: errorsArray
    });
  }

  try {
    // ドキュメントIDで検索してる
    db.collection("books").doc(requestJson.isbnCode.toString()).update(requestJson);
  } catch(e) {
    return Response.json({
       message: "アップデート時に何らかのエラーが発生しました。"
    });
  }
  return Response.json({ message: "正常にアップデート処理が終了しました。" });
}