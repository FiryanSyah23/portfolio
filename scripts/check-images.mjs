import fs from "node:fs";
import path from "node:path";

const files = ["src/data/projects.ts", "src/data/techStack.ts"];
const paths = files.flatMap((f) => {
    const src = fs.readFileSync(f, "utf8");
    return [...src.matchAll(/"(\/(?:imgProject|logo)\/[^"]+)"/g)].map(
        (m) => m[1],
    );
});

function existsExact(rel) {
    let dir = "public";
    for (const part of rel.split("/").filter(Boolean)) {
        if (!fs.existsSync(dir) || !fs.readdirSync(dir).includes(part))
            return false;
        dir = path.join(dir, part);
    }
    return true;
}

const missing = [...new Set(paths)].filter((p) => !existsExact(p));
if (missing.length) {
    console.error("Gambar tidak ditemukan:");
    missing.forEach((p) => console.error("  ✗", p));
    process.exit(1);
}
console.log(`OK, ${new Set(paths).size} gambar ditemukan.`);
