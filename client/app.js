// استدعاء زر التحقق من رمز التفعيل وإرساله إلى الخادم للتحقق
document.getElementById("secret-submit").addEventListener("click", function () {
    var code = document.getElementById("secret-code").value.trim();
    
    fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: code })
    })
      .then(response => response.json())
      .then(data => {
        if (data.valid) {
          document.getElementById("secret-overlay").style.display = "none";
        } else {
          document.getElementById("error-message").style.display = "block";
        }
      })
      .catch(err => console.error('Error:', err));
  });
  
// كود لعبة الحروف (HexGame) من ملف index.html
class HexGame {
  constructor() {
    this.hexagons = [];

    // الإحداثيات الأساسية لكل صف
    this.baseCoordinates = [
      [{ x: -48, y: 0 }, { x: 55, y: 0 }, { x: 158, y: 0 }, { x: 261, y: 0 }, { x: 364, y: 0 }],
      [{ x: -21, y: 48 }, { x: 82, y: 48 }, { x: 185, y: 48 }, { x: 288, y: 48 }, { x: 391, y: 48 }],
      [{ x: -48, y: 96 }, { x: 55, y: 96 }, { x: 158, y: 96 }, { x: 261, y: 96 }, { x: 364, y: 96 }],
      [{ x: -21, y: 144 }, { x: 82, y: 144 }, { x: 185, y: 144 }, { x: 288, y: 144 }, { x: 391, y: 144 }],
      [{ x: -48, y: 194 }, { x: 55, y: 194 }, { x: 158, y: 194 }, { x: 261, y: 194 }, { x: 364, y: 194 }]
    ];

    // إزاحات الصفوف
    this.rowOffsets = [
      { x: -98, y: 4 },
      { x: 26, y: 44 },
      { x: 2, y: 84 },
      { x: 26, y: 124 },
      { x: 2, y: 162 }
    ];

    // إزاحة عامة لنقل الشكل كاملًا
    this.globalOffset = { x: 305, y: 300 };

    // إعدادات تغيير حجم الخلايا
    this.cellScales = [
      [2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2]
    ];

    // توليد حروف عربية عشوائية
    this.letters = this.generateBasicArabicLetters(25);

    // إعدادات الخلفية
    this.backgroundImagePath = "IMG_7698.png";
    this.backgroundPosition = { x: 130, y: 280 };
    this.backgroundSize = { width: 815, height: 590 };
    this.backgroundViewSize = { width: 1000, height: 900 };

    // إنشاء الشكل
    this.initGrid();

    // إضافة الصور والنصوص الإضافية
    this.initAdditionalImage2();
    this.initAdditionalImage3();
    this.initAdditionalImage4();
    this.initAdditionalText1();
    this.initAdditionalText2();
    this.initAdditionalText3();

    // ======= إضافة النصوص الجديدة المطلوبة =======
    // ثلاث نصوص عادية يمكن التحكم بموقعها وأبعادها
    this.initAdditionalText4();
    this.initAdditionalText5();
    this.initAdditionalText6();

    // ثلاث نصوص عند الضغط تفتح الرابط المطلوب ويمكن التحكم بموقعها وأبعادها
    this.initAdditionalLinkText1();
    this.initAdditionalLinkText2();
    this.initAdditionalLinkText3();
  }

  moveEntireGrid(x, y) {
    this.globalOffset.x += x;
    this.globalOffset.y += y;
    this.updateAllPositions();
  }

  updateAllPositions() {
    this.hexagons.forEach((row, rowIndex) => {
      this.updateRowPositions(rowIndex);
    });
  }

  updateRowPositions(rowIndex) {
    this.hexagons[rowIndex].forEach((hex, cellIndex) => {
      const base = this.baseCoordinates[rowIndex][cellIndex];
      const rowOffset = this.rowOffsets[rowIndex];
      hex.style.left = `${base.x + rowOffset.x + this.globalOffset.x}px`;
      hex.style.top = `${base.y + rowOffset.y + this.globalOffset.y}px`;
    });
  }

  generateBasicArabicLetters(count) {
    const basicLetters = ["أ", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي"];
    return [...basicLetters].sort(() => Math.random() - 0.5).slice(0, count);
  }

  initGrid() {
    const container = document.getElementById("grid");
    container.style.backgroundImage = `url('${this.backgroundImagePath}')`;
    container.style.backgroundSize = `${this.backgroundSize.width}px ${this.backgroundSize.height}px`;
    container.style.backgroundRepeat = "no-repeat";
    container.style.backgroundPosition = `${this.backgroundPosition.x}px ${this.backgroundPosition.y}px`;
    container.style.width = `${this.backgroundViewSize.width}px`;
    container.style.height = `${this.backgroundViewSize.height}px`;

    this.hexagons = this.baseCoordinates.map((row, rowIndex) => {
      return row.map((cell, cellIndex) => {
        const hex = document.createElement("div");
        hex.className = "hexagon";
        hex.textContent = this.letters[rowIndex * 5 + cellIndex];
        const rowOffset = this.rowOffsets[rowIndex];
        hex.style.left = `${cell.x + rowOffset.x + this.globalOffset.x}px`;
        hex.style.top = `${cell.y + rowOffset.y + this.globalOffset.y}px`;
        const cellScale = this.cellScales[rowIndex][cellIndex];
        hex.style.width = `${50 * cellScale}px`;
        hex.style.height = `${55 * cellScale}px`;
        hex.style.fontSize = `${24 * cellScale}px`;
        hex.dataset.state = "0";
        hex.dataset.char = this.letters[rowIndex * 5 + cellIndex];
        hex.addEventListener("click", (e) => this.handleClick(e.target));
        container.appendChild(hex);
        return hex;
      });
    });
  }

  handleClick(hex) {
    const currentState = parseInt(hex.dataset.state);
    const newState = (currentState + 1) % 4;
    hex.dataset.state = newState.toString();
    switch (newState) {
      case 0:
        hex.style.backgroundColor = "#FFFFFF";
        hex.textContent = hex.dataset.char;
        this.resetRelatedHexes(hex.dataset.char);
        break;
      case 1:
        hex.style.backgroundColor = "#FADB0C";
        break;
      case 2:
        hex.style.backgroundColor = "#FF7835";
        hex.textContent = "";
        this.hideRelatedChars(hex.dataset.char);
        break;
      case 3:
        hex.style.backgroundColor = "#3BB419";
        break;
    }
  }

  hideRelatedChars(char) {
    document.querySelectorAll(".hexagon").forEach((h) => {
      if (h.dataset.char === char && h.dataset.state !== "2") {
        h.textContent = "";
        h.style.backgroundColor = "#FF7835";
        h.dataset.state = "2";
      }
    });
  }

  resetRelatedHexes(char) {
    document.querySelectorAll(".hexagon").forEach((h) => {
      if (h.dataset.char === char) {
        h.textContent = h.dataset.char;
        h.style.backgroundColor = "#FFFFFF";
        h.dataset.state = "0";
      }
    });
  }

  initAdditionalImage2() {
    this.backgroundImagePath2 = "IMG_7904.png";
    this.backgroundPosition2 = { x: -900, y: -250 };
    this.backgroundSize2 = { width: 2700, height: 2000 };
    const container = document.getElementById("grid");
    const imgDiv2 = document.createElement("div");
    imgDiv2.className = "bgImage2";
    imgDiv2.style.position = "absolute";
    imgDiv2.style.left = `${this.backgroundPosition2.x}px`;
    imgDiv2.style.top = `${this.backgroundPosition2.y}px`;
    imgDiv2.style.width = `${this.backgroundSize2.width}px`;
    imgDiv2.style.height = `${this.backgroundSize2.height}px`;
    imgDiv2.style.backgroundImage = `url('${this.backgroundImagePath2}')`;
    imgDiv2.style.backgroundSize = "cover";
    imgDiv2.style.backgroundRepeat = "no-repeat";
    imgDiv2.style.zIndex = "-1";
    container.appendChild(imgDiv2);
  }

  initAdditionalImage3() {
    this.backgroundImagePath3 = "IMG_7750.PNG";
    this.backgroundPosition3 = { x: 380, y: 200 };
    this.backgroundSize3 = { width: 300, height: 120 };
    const container = document.getElementById("grid");
    const imgDiv3 = document.createElement("div");
    imgDiv3.className = "bgImage3";
    imgDiv3.style.position = "absolute";
    imgDiv3.style.left = `${this.backgroundPosition3.x}px`;
    imgDiv3.style.top = `${this.backgroundPosition3.y}px`;
    imgDiv3.style.width = `${this.backgroundSize3.width}px`;
    imgDiv3.style.height = `${this.backgroundSize3.height}px`;
    imgDiv3.style.backgroundImage = `url('${this.backgroundImagePath3}')`;
    imgDiv3.style.backgroundSize = "cover";
    imgDiv3.style.backgroundRepeat = "no-repeat";
    imgDiv3.style.zIndex = "-1";
    container.appendChild(imgDiv3);
  }

  initAdditionalImage4() {
    this.backgroundImagePath4 = "IMAGE4.png";
    this.backgroundPosition4 = { x: 750, y: 150 };
    this.backgroundSize4 = { width: 320, height: 240 };
    const container = document.getElementById("grid");
    const imgDiv4 = document.createElement("div");
    imgDiv4.className = "bgImage4";
    imgDiv4.style.position = "absolute";
    imgDiv4.style.left = `${this.backgroundPosition4.x}px`;
    imgDiv4.style.top = `${this.backgroundPosition4.y}px`;
    imgDiv4.style.width = `${this.backgroundSize4.width}px`;
    imgDiv4.style.height = `${this.backgroundSize4.height}px`;
    imgDiv4.style.backgroundImage = `url('${this.backgroundImagePath4}')`;
    imgDiv4.style.backgroundSize = "cover";
    imgDiv4.style.backgroundRepeat = "no-repeat";
    imgDiv4.style.zIndex = "-1";
    const containerEl = document.getElementById("grid");
    containerEl.appendChild(imgDiv4);
  }

  initAdditionalText1() {
    this.textContent1 = "سباق الحروف";
    this.textPosition1 = { x: 435, y: 250 };
    this.textSize1 = { width: 200, height: 50 };
    this.textFontSize1 = 40;
    const container = document.getElementById("grid");
    const textDiv1 = document.createElement("div");
    textDiv1.className = "additionalText1";
    textDiv1.style.position = "absolute";
    textDiv1.style.left = `${this.textPosition1.x}px`;
    textDiv1.style.top = `${this.textPosition1.y}px`;
    textDiv1.style.width = `${this.textSize1.width}px`;
    textDiv1.style.height = `${this.textSize1.height}px`;
    textDiv1.style.fontSize = `${this.textFontSize1}px`;
    textDiv1.style.color = "#000000";
    textDiv1.style.background = "transparent";
    textDiv1.style.zIndex = "1";
    textDiv1.textContent = this.textContent1;
    container.appendChild(textDiv1);
  }

  initAdditionalText2() {
    this.textContent2 = "النص الثاني";
    this.textPosition2 = { x: 300, y: 600 };
    this.textSize2 = { width: 250, height: 50 };
    this.textFontSize2 = 0;
    const container = document.getElementById("grid");
    const textDiv2 = document.createElement("div");
    textDiv2.className = "additionalText2";
    textDiv2.style.position = "absolute";
    textDiv2.style.left = `${this.textPosition2.x}px`;
    textDiv2.style.top = `${this.textPosition2.y}px`;
    textDiv2.style.width = `${this.textSize2.width}px`;
    textDiv2.style.height = `${this.textSize2.height}px`;
    textDiv2.style.fontSize = `${this.textFontSize2}px`;
    textDiv2.style.color = "#000000";
    textDiv2.style.background = "transparent";
    textDiv2.style.zIndex = "1";
    textDiv2.textContent = this.textContent2;
    container.appendChild(textDiv2);
  }

  initAdditionalText3() {
    this.textContent3 = "النص الثالث";
    this.textPosition3 = { x: 600, y: 600 };
    this.textSize3 = { width: 300, height: 60 };
    this.textFontSize3 = 0;
    const container = document.getElementById("grid");
    const textDiv3 = document.createElement("div");
    textDiv3.className = "additionalText3";
    textDiv3.style.position = "absolute";
    textDiv3.style.left = `${this.textPosition3.x}px`;
    textDiv3.style.top = `${this.textPosition3.y}px`;
    textDiv3.style.width = `${this.textSize3.width}px`;
    textDiv3.style.height = `${this.textSize3.height}px`;
    textDiv3.style.fontSize = `${this.textFontSize3}px`;
    textDiv3.style.color = "#000000";
    textDiv3.style.background = "transparent";
    textDiv3.style.zIndex = "1";
    textDiv3.textContent = this.textContent3;
    container.appendChild(textDiv3);
  }

  // ======== النصوص الإضافية (مجموعة 1: نصوص عادية) ========
  initAdditionalText4() {
    this.textContent4 = "النص الرابع";
    this.textPosition4 = { x: 100, y: 800 }; // يمكنك تعديل الموضع
    this.textSize4 = { width: 200, height: 50 }; // يمكنك تعديل الأبعاد
    this.textFontSize4 = 20; // حجم الخط
    const container = document.getElementById("grid");
    const textDiv4 = document.createElement("div");
    textDiv4.className = "additionalText4";
    textDiv4.style.position = "absolute";
    textDiv4.style.left = `${this.textPosition4.x}px`;
    textDiv4.style.top = `${this.textPosition4.y}px`;
    textDiv4.style.width = `${this.textSize4.width}px`;
    textDiv4.style.height = `${this.textSize4.height}px`;
    textDiv4.style.fontSize = `${this.textFontSize4}px`;
    textDiv4.style.color = "#000000";
    textDiv4.style.background = "transparent";
    textDiv4.style.zIndex = "1";
    textDiv4.textContent = this.textContent4;
    container.appendChild(textDiv4);
  }

  initAdditionalText5() {
    this.textContent5 = "النص الخامس";
    this.textPosition5 = { x: 320, y: 800 };
    this.textSize5 = { width: 200, height: 50 };
    this.textFontSize5 = 20;
    const container = document.getElementById("grid");
    const textDiv5 = document.createElement("div");
    textDiv5.className = "additionalText5";
    textDiv5.style.position = "absolute";
    textDiv5.style.left = `${this.textPosition5.x}px`;
    textDiv5.style.top = `${this.textPosition5.y}px`;
    textDiv5.style.width = `${this.textSize5.width}px`;
    textDiv5.style.height = `${this.textSize5.height}px`;
    textDiv5.style.fontSize = `${this.textFontSize5}px`;
    textDiv5.style.color = "#000000";
    textDiv5.style.background = "transparent";
    textDiv5.style.zIndex = "1";
    textDiv5.textContent = this.textContent5;
    container.appendChild(textDiv5);
  }

  initAdditionalText6() {
    this.textContent6 = "النص السادس";
    this.textPosition6 = { x: 540, y: 800 };
    this.textSize6 = { width: 200, height: 50 };
    this.textFontSize6 = 20;
    const container = document.getElementById("grid");
    const textDiv6 = document.createElement("div");
    textDiv6.className = "additionalText6";
    textDiv6.style.position = "absolute";
    textDiv6.style.left = `${this.textPosition6.x}px`;
    textDiv6.style.top = `${this.textPosition6.y}px`;
    textDiv6.style.width = `${this.textSize6.width}px`;
    textDiv6.style.height = `${this.textSize6.height}px`;
    textDiv6.style.fontSize = `${this.textFontSize6}px`;
    textDiv6.style.color = "#000000";
    textDiv6.style.background = "transparent";
    textDiv6.style.zIndex = "1";
    textDiv6.textContent = this.textContent6;
    container.appendChild(textDiv6);
  }

  // ======== النصوص الإضافية (مجموعة 2: نصوص قابلة للضغط) ========
  initAdditionalLinkText1() {
    this.linkTextContent1 = "اضغط هنا للصفحة";
    this.linkTextPosition1 = { x: 100, y: 860 };
    this.linkTextSize1 = { width: 200, height: 50 };
    this.linkTextFontSize1 = 20;
    const container = document.getElementById("grid");
    const linkDiv1 = document.createElement("div");
    linkDiv1.className = "additionalLinkText1";
    linkDiv1.style.position = "absolute";
    linkDiv1.style.left = `${this.linkTextPosition1.x}px`;
    linkDiv1.style.top = `${this.linkTextPosition1.y}px`;
    linkDiv1.style.width = `${this.linkTextSize1.width}px`;
    linkDiv1.style.height = `${this.linkTextSize1.height}px`;
    linkDiv1.style.fontSize = `${this.linkTextFontSize1}px`;
    linkDiv1.style.color = "#0000EE";
    linkDiv1.style.background = "transparent";
    linkDiv1.style.zIndex = "1";
    linkDiv1.style.cursor = "pointer";
    linkDiv1.textContent = this.linkTextContent1;
    linkDiv1.addEventListener("click", () => {
      window.location.href = "https://7rofy.up.railway.app";
    });
    container.appendChild(linkDiv1);
  }

  initAdditionalLinkText2() {
    this.linkTextContent2 = "اضغط هنا للصفحة";
    this.linkTextPosition2 = { x: 320, y: 860 };
    this.linkTextSize2 = { width: 200, height: 50 };
    this.linkTextFontSize2 = 20;
    const container = document.getElementById("grid");
    const linkDiv2 = document.createElement("div");
    linkDiv2.className = "additionalLinkText2";
    linkDiv2.style.position = "absolute";
    linkDiv2.style.left = `${this.linkTextPosition2.x}px`;
    linkDiv2.style.top = `${this.linkTextPosition2.y}px`;
    linkDiv2.style.width = `${this.linkTextSize2.width}px`;
    linkDiv2.style.height = `${this.linkTextSize2.height}px`;
    linkDiv2.style.fontSize = `${this.linkTextFontSize2}px`;
    linkDiv2.style.color = "#0000EE";
    linkDiv2.style.background = "transparent";
    linkDiv2.style.zIndex = "1";
    linkDiv2.style.cursor = "pointer";
    linkDiv2.textContent = this.linkTextContent2;
    linkDiv2.addEventListener("click", () => {
      window.location.href = "https://7rofy.up.railway.app";
    });
    container.appendChild(linkDiv2);
  }

  initAdditionalLinkText3() {
    this.linkTextContent3 = "اضغط هنا للصفحة";
    this.linkTextPosition3 = { x: 540, y: 860 };
    this.linkTextSize3 = { width: 200, height: 50 };
    this.linkTextFontSize3 = 20;
    const container = document.getElementById("grid");
    const linkDiv3 = document.createElement("div");
    linkDiv3.className = "additionalLinkText3";
    linkDiv3.style.position = "absolute";
    linkDiv3.style.left = `${this.linkTextPosition3.x}px`;
    linkDiv3.style.top = `${this.linkTextPosition3.y}px`;
    linkDiv3.style.width = `${this.linkTextSize3.width}px`;
    linkDiv3.style.height = `${this.linkTextSize3.height}px`;
    linkDiv3.style.fontSize = `${this.linkTextFontSize3}px`;
    linkDiv3.style.color = "#0000EE";
    linkDiv3.style.background = "transparent";
    linkDiv3.style.zIndex = "1";
    linkDiv3.style.cursor = "pointer";
    linkDiv3.textContent = this.linkTextContent3;
    linkDiv3.addEventListener("click", () => {
      window.location.href = "https://7rofy.up.railway.app";
    });
    container.appendChild(linkDiv3);
  }
}

// بدء تشغيل اللعبة عند تحميل الصفحة
window.onload = () => {
  const game = new HexGame();
  // مثال: تحريك الصف الأول 100 بكسل لليمين
  game.moveEntireRowX(0, 100);
  // مثال: تحريك الشكل كاملًا 50 بكسل لأسفل
  game.moveEntireGrid(0, 50);
};
