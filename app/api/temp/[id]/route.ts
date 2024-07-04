import { db } from "@/lib/firebase/serverConfig";
import { chromium } from "@playwright/test";

// ハイドレーション待つためにchromium中で建ててます。
// xpathで取ってるので他のサイトでも必要項目の取得が可能です。
export async function POST(request: Request, { params }: { params: { id: string }}) {
  const id = params.id;

  console.log("id:", id);

  const browser = await chromium.launch({
    headless: false
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.kinokuniya.co.jp/disp/CKnDetailSearchForm.jsp?ptk=01");

  // isbn入力
  const inputElement = await page.waitForSelector('//*[@id="form-contents"]/form/dl/dd[1]/input');
  await inputElement.fill(id);

  console.log(page.url());

  // 検索をクリックする
  const submitButton = await page.waitForSelector('//*[@id="SEARCH"]');
  await submitButton.click();

  console.log("url");

  await page.waitForTimeout(5000);
  
  console.log(page.url());

  // おかしな実装
  // // 画像のURLを取得する
  const imageElement = await page.waitForSelector('//*[@id="form-contents"]/form/div[2]/div[1]/a[1]/img');
  const imageSrc = await imageElement.getAttribute("src");

  console.log("imageSrc:", imageSrc);

  // // タイトルを取得する
  const titleElement = await page.waitForSelector('//*[@id="form-contents"]/form/div[2]/div[2]/h3/a');
  const titleStr = await titleElement.textContent();
  const titleHref = await titleElement.getAttribute("href");

  console.log("tilteStr:", titleStr);
  console.log("titleHref:", titleHref);

  // 5秒待つ
  await page.waitForTimeout(5000);
  
  await page.close(); // ページを閉じる
  await browser.close(); // ブラウザを閉じる

  return Response.json({
    a: "b"
  })
  //   try {
  //   db.collection("books").doc(id).create({
  //     booksCount: 50000,
      
  //   })
  // }
}