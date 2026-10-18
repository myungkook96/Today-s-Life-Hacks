// 오늘(KST)의 꿀팁을 카카오톡 '나에게 보내기'용 문구(200자 이내)로 출력합니다.
// 사용: node kkultip/today.mjs
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
const html = readFileSync(fileURLToPath(new URL("./index.html", import.meta.url)), "utf8");
const START = Date.UTC(2026, 9, 1);
const TIPS = new Function(html.match(/const TIPS = (\[[\s\S]*?\n\]);/)[1].replace(/^/, "return "))();
const DAY = 864e5;
const n = Math.floor((Date.now() + 9 * 36e5 - START) / DAY);
const t = TIPS[((n % TIPS.length) + TIPS.length) % TIPS.length];
const URL_ = "https://myungkook96.github.io/Today-s-Life-Hacks/kkultip/";
const head = `🍯 꿀팁 한 스푼 No.${n + 1} [${t.c}]\n${t.t}\n\n`;
const tail = `\n\n✔ ${t.k}\n${URL_}`;
let body = t.b.map((x, i) => (t.b.length > 2 ? `${i + 1}. ${x}` : x)).join("\n");
let msg = head + body + tail;
if (msg.length > 200) msg = head + body + `\n\n${URL_}`;
if (msg.length > 200) msg = head + body.slice(0, 200 - head.length - URL_.length - 4) + "…\n\n" + URL_;
console.log(msg);
