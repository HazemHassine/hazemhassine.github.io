// doms
const button = document.getElementById("generate");
const root = document.querySelector(":root");
const hexColor = document.querySelector("#color-hex");
const color = document.getElementById("color");
const gradient = document.getElementById("gradient");
let current = "color";
// event listeners
hexColor.addEventListener("click", function (e) {
  navigator.clipboard.writeText(hexColor.innerText);
});
color.addEventListener("click", function (e) {
  current = "color";
});

gradient.addEventListener("click", function (e) {
    console.log("gradient");
  current = "gradient";
});
// functions
const symbols = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];
function generateColor() {
  let hex = "#";
  for (i = 0; i < 6; i++) {
    hex += symbols[Math.floor(Math.random() * symbols.length)];
  }
  return hex;
}
function generate() {
  if (current == "color") {
    const hex = generateColor();
    root.style.setProperty("--main-bg-color", hex);
    root.style.setProperty("--gradient-two", hex);     
    hexColor.innerText = hex;
}
else if (current== "gradient") {
    const hex1 = generateColor();
    const hex2 = generateColor();
    root.style.setProperty("--main-bg-color", hex1);
    root.style.setProperty("--gradient-two", hex2);
  }
}