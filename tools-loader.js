/* ════════════════════════════════════════════════════════════
   CBBX PRO — TOOLS LOADER · نظيف · خفيف · سريع
   ════════════════════════════════════════════════════════════ */

// =============================================================
// مصفوفة الأدوات — أضف أدواتك الجديدة هنا فقط!
// =============================================================
// ⚠️ طريقة الإضافة: انسخ القوسين { ... } للأداة الأخيرة، والصقها بعدها،
//    ثم ضع فاصلة ( , ) بينهما، وغيّر البيانات (id, title, thumb, detailPage, installPage).
// مثال:
//   }, {
//     id: "tool-new",
//     title: "اسم الأداة الجديدة",
//     thumb: "images/new.jpg",
//     detailPage: "new.html",
//     installPage: "new-install.html"
//   }
// =============================================================

const toolsData = [{
    id: "tool-silence",
    title: "إزالة الصمت من الفيديو",
    thumb: "images/1.jpg",
    detailPage: "1.html",
    installPage: "1..html"
}];

// ===== التنقل للصفحات =====
window.goDetail = function(index) {
    const tool = toolsData[index];
    if (tool && tool.detailPage) {
        window.location.href = tool.detailPage;
    }
};

window.goInstall = function(index) {
    const tool = toolsData[index];
    if (tool && tool.installPage) {
        window.location.href = tool.installPage;
    }
};

// =============================================================
// تشغيل الكود عند تحميل الصفحة
// =============================================================
document.addEventListener('DOMContentLoaded', function() {

    // ------------------------------------------------
    // 1. إضافة البطاقات إلى شبكة الأدوات (فقط في الصفحة الرئيسية)
    // ------------------------------------------------
    const grid = document.getElementById('toolsGrid');
    if (grid) {
        grid.innerHTML = '';
        toolsData.forEach((tool, index) => {
            const card = document.createElement('div');
            card.className = 'tool-card';
            card.id = 'card-' + (index + 1);
            card.addEventListener('click', function(e) {
                e.preventDefault();
                window.goDetail(index);
            });

            card.innerHTML = `
                <div class="card-thumb-box">
                    <img class="card-thumb" src="${tool.thumb}" alt="${tool.title}" loading="lazy">
                    <div class="card-hint">
                        <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
                    </div>
                </div>
                <div class="card-body">
                    <span class="card-title" data-tr="toolName">${tool.title}</span>
                    <span class="card-arrow">
                        <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </span>
                </div>
            `;
            grid.appendChild(card);
        });
        console.log('✅ Cards rendered in toolsGrid.');
    } else {
        // مش موجود في الصفحة (زي صفحات السياسة والدعم) - مش مشكلة
        console.log('ℹ️ toolsGrid not found (normal for non-home pages).');
    }

    // ------------------------------------------------
    // 2. ملء القائمة المنسدلة (Dropdown) — تعمل في كل الصفحات
    // ------------------------------------------------
    const dd = document.getElementById('toolsDd');
    if (dd) {
        dd.innerHTML = '';
        toolsData.forEach((tool, index) => {
            const li = document.createElement('li');
            const btn = document.createElement('button');
            btn.className = 'dd-item';
            btn.setAttribute('data-tr', 'toolName');
            btn.textContent = tool.title;
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                const isHome = window.location.pathname.endsWith('index.html') || 
                               window.location.pathname === '/' || 
                               window.location.pathname === '';
                
                if (!isHome) {
                    // نستخدم query parameter بدلاً من الهاش
                    window.location.href = 'index.html?scroll=card-' + (index + 1);
                } else {
                    const card = document.getElementById('card-' + (index + 1));
                    if (card) {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        setTimeout(() => {
                            if (typeof radiate === 'function') radiate(card);
                        }, 500);
                    }
                }
            });
            li.appendChild(btn);
            dd.appendChild(li);
        });
        console.log('✅ Dropdown populated with ' + toolsData.length + ' tool(s).');
    } else {
        console.warn('⚠️ toolsDd element not found — dropdown will not be populated.');
    }

    console.log('✅ CBBX · Tools loaded successfully. (' + toolsData.length + ' tools)');
});