// استدعاء زر التحقق من رمز التفعيل وإرساله إلى الخادم للتحقق
document.getElementById("secret-submit").addEventListener("click", function () {
  var code = document.getElementById("secret-code").value.trim();

  // هنا قمنا بتعديل المسار ليكون:
  // /.netlify/functions/verify
  fetch('/.netlify/functions/verify', {
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
      [{ x: -48, y: 0 },   { x: 55,  y: 0 },   { x: 158, y: 0 },   { x: 261, y: 0 },   { x: 364, y: 0 }],
      [{ x: -21, y: 48 },  { x: 82,  y: 48 },  { x: 185, y: 48 },  { x: 288, y: 48 },  { x: 391, y: 48 }],
      [{ x: -48, y: 96 },  { x: 55,  y: 96 },  { x: 158, y: 96 },  { x: 261, y: 96 },  { x: 364, y: 96 }],
      [{ x: -21, y: 144 }, { x: 82,  y: 144 }, { x: 185, y: 144 }, { x: 288, y: 144 }, { x: 391, y: 144 }],
      [{ x: -48, y: 194 }, { x: 55,  y: 194 }, { x: 158, y: 194 }, { x: 261, y: 194 }, { x: 364, y: 194 }]
    ];

    // إزاحات الصفوف
    this.rowOffsets = [
      { x: -98, y: 4 },
      { x: 26,  y: 44 },
      { x: 2,   y: 84 },
      { x: 26,  y: 124 },
      { x: 2,   y: 162 }
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
    this.backgroundImagePath = "IMG_7698.png";    // تعديل المسار واسم الصورة كما هو مرفوع
    this.backgroundPosition  = { x: 130, y: 280 };
    this.backgroundSize      = { width: 815, height: 590 };
    this.backgroundViewSize  = { width: 1000, height: 900 };

    // إنشاء الشكل
    this.initGrid();

    // إضافة الصور والنصوص الإضافية
    this.initAdditionalImage2();
    this.initAdditionalImage3();
    this.initAdditionalImage4();
    this.initAdditionalText1();
    this.initAdditionalText2();
    this.initAdditionalText3();
  }

  // ========== الإضافات الجديدة: التحكم في الشكل ككل ==========
  moveEntireGrid(x, y) {
    this.globalOffset.x += x;
    this.globalOffset.y += y;
    this.updateAllPositions();
  }

  resetEntireGrid() {
    this.globalOffset = { x: 305, y: 300 };
    this.updateAllPositions();
  }

  updateAllPositions() {
    this.hexagons.forEach((row, rowIndex) => {
      this.updateRowPositions(rowIndex);
    });
  }

  updateRowPositions(rowIndex) {
    this.hexagons[rowIndex].forEach((hex, cellIndex) => {
      const base      = this.baseCoordinates[rowIndex][cellIndex];
      const rowOffset = this.rowOffsets[rowIndex];
      hex.style.left = `${base.x + rowOffset.x + this.globalOffset.x}px`;
      hex.style.top  = `${base.y + rowOffset.y + this.globalOffset.y}px`;
    });
  }

  // ========== دوال التحكم في الأسطر ==========
  moveEntireRowX(rowIndex, offsetX) {
    if (rowIndex < 0 || rowIndex > 4) return;
    this.rowOffsets[rowIndex].x += offsetX;
    this.updateRowPositions(rowIndex);
  }

  moveEntireRowY(rowIndex, offsetY) {
    if (rowIndex < 0 || rowIndex > 4) return;
    this.rowOffsets[rowIndex].y += offsetY;
    this.updateRowPositions(rowIndex);
  }

  resetEntireRow(rowIndex) {
    if (rowIndex < 0 || rowIndex > 4) return;
    this.rowOffsets[rowIndex] = { x: 0, y: 0 };
    this.updateRowPositions(rowIndex);
  }

  // ========== توليد الحروف الأساسية ==========
  generateBasicArabicLetters(count) {
    const basicLetters = [
      "أ","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","ه","و","ي"
    ];
    return [...basicLetters]
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  }

  // ========== إنشاء الشبكة (الخلايا والخلفية الأساسية) ==========
  initGrid() {
    const container = document.getElementById("grid");

    // الخلفية الأساسية
    container.style.backgroundImage    = `url('${this.backgroundImagePath}')`;
    container.style.backgroundSize     = `${this.backgroundSize.width}px ${this.backgroundSize.height}px`;
    container.style.backgroundRepeat   = "no-repeat";
    container.style.backgroundPosition = `${this.backgroundPosition.x}px ${this.backgroundPosition.y}px`;
    container.style.width              = `${this.backgroundViewSize.width}px`;
    container.style.height             = `${this.backgroundViewSize.height}px`;

    // إنشاء الخلايا
    this.hexagons = this.baseCoordinates.map((row, rowIndex) => {
      return row.map((cell, cellIndex) => {
        const hex = document.createElement("div");
        hex.className = "hexagon";
        hex.textContent = this.letters[rowIndex * 5 + cellIndex];

        // وضع الخلية
        const rowOffset = this.rowOffsets[rowIndex];
        hex.style.left = `${cell.x + rowOffset.x + this.globalOffset.x}px`;
        hex.style.top  = `${cell.y + rowOffset.y + this.globalOffset.y}px`;

        // تغيير الحجم
        const cellScale = this.cellScales[rowIndex][cellIndex];
        hex.style.width    = `${50 * cellScale}px`;
        hex.style.height   = `${55 * cellScale}px`;
        hex.style.fontSize = `${24 * cellScale}px`;

        // الحالة والحدث
        hex.dataset.state = "0";
        hex.dataset.char  = this.letters[rowIndex * 5 + cellIndex];
        hex.addEventListener("click", (e) => this.handleClick(e.target));

        container.appendChild(hex);
        return hex;
      });
    });
  }

  // ========== دالة التعامل مع النقر على الخلية ==========
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

  // ========== إخفاء الحروف المرتبطة ==========
  hideRelatedChars(char) {
    document.querySelectorAll(".hexagon").forEach((h) => {
      if (h.dataset.char === char && h.dataset.state !== "2") {
        h.textContent = "";
        h.style.backgroundColor = "#FF7835";
        h.dataset.state = "2";
      }
    });
  }

  // ========== إعادة تعيين الخلايا المرتبطة ==========
  resetRelatedHexes(char) {
    document.querySelectorAll(".hexagon").forEach((h) => {
      if (h.dataset.char === char) {
        h.textContent = h.dataset.char;
        h.style.backgroundColor = "#FFFFFF";
        h.dataset.state = "0";
      }
    });
  }

  // ========== إضافة الصورة الثانية ==========
  initAdditionalImage2() {
    this.backgroundImagePath2 = "IMG_7904.png";
    this.backgroundPosition2 = { x: -900, y: -250 };
    this.backgroundSize2     = { width: 2700, height: 2000 };
    const container = document.getElementById("grid");
    const imgDiv2   = document.createElement("div");
    imgDiv2.className = "bgImage2";
    imgDiv2.style.position = "absolute";
    imgDiv2.style.left     = `${this.backgroundPosition2.x}px`;
    imgDiv2.style.top      = `${this.backgroundPosition2.y}px`;
    imgDiv2.style.width    = `${this.backgroundSize2.width}px`;
    imgDiv2.style.height   = `${this.backgroundSize2.height}px`;
    imgDiv2.style.backgroundImage = `url('${this.backgroundImagePath2}')`;
    imgDiv2.style.backgroundSize  = "cover";
    imgDiv2.style.backgroundRepeat = "no-repeat";
    imgDiv2.style.zIndex = "-1";
    container.appendChild(imgDiv2);
  }

  // ========== إضافة الصورة الثالثة ==========
  initAdditionalImage3() {
    this.backgroundImagePath3 = "IMG_7750.PNG";
    this.backgroundPosition3  = { x: 380, y: 200 };
    this.backgroundSize3      = { width: 300, height: 120 };
    const container = document.getElementById("grid");
    const imgDiv3   = document.createElement("div");
    imgDiv3.className = "bgImage3";
    imgDiv3.style.position = "absolute";
    imgDiv3.style.left     = `${this.backgroundPosition3.x}px`;
    imgDiv3.style.top      = `${this.backgroundPosition3.y}px`;
    imgDiv3.style.width    = `${this.backgroundSize3.width}px`;
    imgDiv3.style.height   = `${this.backgroundSize3.height}px`;
    imgDiv3.style.backgroundImage = `url('${this.backgroundImagePath3}')`;
    imgDiv3.style.backgroundSize  = "cover";
    imgDiv3.style.backgroundRepeat = "no-repeat";
    imgDiv3.style.zIndex = "-1";
    container.appendChild(imgDiv3);
  }

  // ========== إضافة الصورة الرابعة ==========
  initAdditionalImage4() {
    this.backgroundImagePath4 = "IMAGE4.png";
    this.backgroundPosition4  = { x: 750, y: 150 };
    this.backgroundSize4      = { width: 320, height: 240 };
    const container = document.getElementById("grid");
    const imgDiv4   = document.createElement("div");
    imgDiv4.className = "bgImage4";
    imgDiv4.style.position = "absolute";
    imgDiv4.style.left     = `${this.backgroundPosition4.x}px`;
    imgDiv4.style.top      = `${this.backgroundPosition4.y}px`;
    imgDiv4.style.width    = `${this.backgroundSize4.width}px`;
    imgDiv4.style.height   = `${this.backgroundSize4.height}px`;
    imgDiv4.style.backgroundImage = `url('${this.backgroundImagePath4}')`;
    imgDiv4.style.backgroundSize  = "cover";
    imgDiv4.style.backgroundRepeat = "no-repeat";
    imgDiv4.style.zIndex = "-1";
    container.appendChild(imgDiv4);
  }

  // ========== إضافة النص الإضافي الأول ==========
  initAdditionalText1() {
    this.textContent1  = "سباق الحروف";
    this.textPosition1 = { x: 435, y: 250 };
    this.textSize1     = { width: 200, height: 50 };
    this.textFontSize1 = 40;
    const container = document.getElementById("grid");
    const textDiv1   = document.createElement("div");
    textDiv1.className = "additionalText1";
    textDiv1.style.position   = "absolute";
    textDiv1.style.left       = `${this.textPosition1.x}px`;
    textDiv1.style.top        = `${this.textPosition1.y}px`;
    textDiv1.style.width      = `${this.textSize1.width}px`;
    textDiv1.style.height     = `${this.textSize1.height}px`;
    textDiv1.style.fontSize   = `${this.textFontSize1}px`;
    textDiv1.style.color      = "#000000";
    textDiv1.style.background = "transparent";
    textDiv1.style.zIndex     = "1";
    textDiv1.textContent      = this.textContent1;
    container.appendChild(textDiv1);
  }

  // ========== إضافة النص الإضافي الثاني ==========
  initAdditionalText2() {
    this.textContent2  = "النص الثاني";
    this.textPosition2 = { x: 300, y: 600 };
    this.textSize2     = { width: 250, height: 50 };
    this.textFontSize2 = 0;
    const container = document.getElementById("grid");
    const textDiv2   = document.createElement("div");
    textDiv2.className = "additionalText2";
    textDiv2.style.position   = "absolute";
    textDiv2.style.left       = `${this.textPosition2.x}px`;
    textDiv2.style.top        = `${this.textPosition2.y}px`;
    textDiv2.style.width      = `${this.textSize2.width}px`;
    textDiv2.style.height     = `${this.textSize2.height}px`;
    textDiv2.style.fontSize   = `${this.textFontSize2}px`;
    textDiv2.style.color      = "#000000";
    textDiv2.style.background = "transparent";
    textDiv2.style.zIndex     = "1";
    textDiv2.textContent      = this.textContent2;
    container.appendChild(textDiv2);
  }

  // ========== إضافة النص الإضافي الثالث ==========
  initAdditionalText3() {
    this.textContent3  = "النص الثالث";
    this.textPosition3 = { x: 600, y: 600 };
    this.textSize3     = { width: 300, height: 60 };
    this.textFontSize3 = 0;
    const container = document.getElementById("grid");
    const textDiv3   = document.createElement("div");
    textDiv3.className = "additionalText3";
    textDiv3.style.position   = "absolute";
    textDiv3.style.left       = `${this.textPosition3.x}px`;
    textDiv3.style.top        = `${this.textPosition3.y}px`;
    textDiv3.style.width      = `${this.textSize3.width}px`;
    textDiv3.style.height     = `${this.textSize3.height}px`;
    textDiv3.style.fontSize   = `${this.textFontSize3}px`;
    textDiv3.style.color      = "#000000";
    textDiv3.style.background = "transparent";
    textDiv3.style.zIndex     = "1";
    textDiv3.textContent      = this.textContent3;
    container.appendChild(textDiv3);
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
