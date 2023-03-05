const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const files = [
  "about.html",
  "gradable.html",
  "index.html",
  "label.html",
  "series.html",
];

const basePath = path.resolve(__dirname, "src");

const toLimitBase64 = (imgPath, sizeLimit) => {
  const filePath = path.resolve(basePath, imgPath);
  const stat = fs.statSync(filePath);
  if (stat.size < 8 * 1024) {
    const data = fs.readFileSync(filePath);
    return "data:image/png;base64," + Buffer.from(data).toString("base64");
  }
  return false;
};

// 处理单个的html
const getFixedFileContent = (fileStr) => {
  const $ = cheerio.load(fileStr);
  [...$("img")].forEach((ele) => {
    const baseSrc = $(ele).attr("data-src");
    const base64 = toLimitBase64(baseSrc);
    if (base64) {
      $(ele).attr("src", base64);
      $(ele).removeAttr("data-src");
    } else {
      $(ele).addClass("lazy");
    }
  });
  return $.html();
};

// 处理html中的图片资源
const fix = (files) => {
  const htmlFilesContent = files.map((p) =>
    fs.readFileSync(`${basePath}/${p}`, "utf8")
  );
  const fixedHtmlFilesContent = htmlFilesContent.map((i) =>
    getFixedFileContent(i)
  );
  files.forEach((p, i) => {
    fs.writeFileSync(`${basePath}/${p}-template`, fixedHtmlFilesContent[i]);
  });
};

fix(files);
