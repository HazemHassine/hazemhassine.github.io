// doms
const button = document.getElementById("generate");
const root = document.querySelector(":root");
const hexColor = document.querySelector("#color-hex");
const color = document.getElementById("color");
const gradient = document.getElementById("gradient");
const spanHex1 = document.getElementById("hex1");
const spanHex2 = document.getElementById("hex2");
const saved = document.getElementById("saved");
let current = "color";
// event listeners
color.style.textDecoration = "underline";
hexColor.addEventListener("click", function (e) {
  navigator.clipboard.writeText(hexColor.innerText);
  hexColor.style.textDecoration ="underline";
});
color.addEventListener("click", function (e) {
  color.style.textDecoration = "underline";
  gradient.style.textDecoration = "none";
  current = "color";
});

gradient.addEventListener("click", function (e) {
  color.style.textDecoration = "none";
  gradient.style.textDecoration = "underline";
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
let savable = true;
function generate() {
  if (current == "color") {
    const hex = generateColor();
    root.style.setProperty("--main-bg-color", hex);
    root.style.setProperty("--gradient-two", hex);
    hex1.innerText = hex;
    hex2.innerText = "";
  } else if (current == "gradient") {
    const hex1 = generateColor();
    const hex2 = generateColor();
    root.style.setProperty("--main-bg-color", hex1);
    root.style.setProperty("--gradient-two", hex2);
    spanHex1.innerText = hex1;
    spanHex2.innerText = hex2;
  }
  savable = true;
  hexColor.style.textDecoration ="none";
}
function save() {
  if (saved.childElementCount > 12) {
    alert("max exceeded");
    return;
  }
  if (savable) {
    const colorDiv = document.createElement("div");
    colorDiv.classList.add("saved-color");
    const currentColor1 =
      getComputedStyle(root).getPropertyValue("--main-bg-color");
    const currentColor2 =
      getComputedStyle(root).getPropertyValue("--gradient-two");
    colorDiv.style.background =
      "linear-gradient(" + currentColor1 + "," + currentColor2 + ")";
    colorDiv.classList.add(currentColor1.slice(1));
    if (currentColor1 != currentColor2) {
      colorDiv.classList.add(currentColor2.slice(1));
    }
    colorDiv.addEventListener("click", function (e) {
      const Classes = e.target.classList;
      let toCopy = "";
      if (Classes.length == 3) {
        toCopy += Classes[1] + "_" + Classes[2];
      } else if (Classes.length == 2) {
        toCopy = Classes[1];
      }
      navigator.clipboard.writeText("#" + toCopy.replace("_", " #"));
    });
    colorDiv.addEventListener("dblclick", function (e) {
      colorDiv.classList.add("deleted");
      colorDiv.ontransitionend = () => {
        colorDiv.remove();
      };
    });
    saved.appendChild(colorDiv);
  }
  savable = false;
}
