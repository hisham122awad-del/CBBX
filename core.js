/* ════════════════════════════════════════════════════════════
   CBBX PRO — CORE ENGINE · Translation · Theme · Countdown · Support
   ════════════════════════════════════════════════════════════ */

/* ── 70+ LANGUAGES (for the globe dropdown) ── */
const LANG_LIST = [
    { code: 'ar', name: 'العربية' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'it', name: 'Italiano' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'id', name: 'Indonesia' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'th', name: 'ไทย' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'pl', name: 'Polski' },
    { code: 'sv', name: 'Svenska' },
    { code: 'el', name: 'Ελληνικά' },
    { code: 'he', name: 'עברית' },
    { code: 'fa', name: 'فارسی' },
    { code: 'ur', name: 'اردو' },
    { code: 'ms', name: 'Bahasa Melayu' },
    { code: 'fil', name: 'Filipino' },
    { code: 'hu', name: 'Magyar' },
    { code: 'cs', name: 'Čeština' },
    { code: 'ro', name: 'Română' },
    { code: 'da', name: 'Dansk' },
    { code: 'fi', name: 'Suomi' },
    { code: 'no', name: 'Norsk' },
    { code: 'sk', name: 'Slovenčina' },
    { code: 'bg', name: 'Български' },
    { code: 'hr', name: 'Hrvatski' },
    { code: 'sr', name: 'Српски' },
    { code: 'lt', name: 'Lietuvių' },
    { code: 'lv', name: 'Latviešu' },
    { code: 'et', name: 'Eesti' },
    { code: 'uk', name: 'Українська' },
    { code: 'ka', name: 'ქართული' },
    { code: 'hy', name: 'Հայերեն' },
    { code: 'az', name: 'Azərbaycanca' },
    { code: 'sq', name: 'Shqip' },
    { code: 'mk', name: 'Македонски' },
    { code: 'bs', name: 'Bosanski' },
    { code: 'sl', name: 'Slovenščina' },
    { code: 'mn', name: 'Монгол' },
    { code: 'ne', name: 'नेपाली' },
    { code: 'si', name: 'සිංහල' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'my', name: 'မြန်မာ' },
    { code: 'km', name: 'ខ្មែរ' },
    { code: 'lo', name: 'ລາວ' },
    { code: 'tl', name: 'Tagalog' },
    { code: 'af', name: 'Afrikaans' },
    { code: 'sw', name: 'Kiswahili' },
    { code: 'ha', name: 'Hausa' },
    { code: 'ig', name: 'Igbo' },
    { code: 'yo', name: 'Yorùbá' },
    { code: 'am', name: 'አማርኛ' },
    { code: 'zu', name: 'Zulu' },
    { code: 'xh', name: 'Xhosa' },
    { code: 'sn', name: 'Shona' },
    { code: 'mg', name: 'Malagasy' },
    { code: 'ny', name: 'Chichewa' }
];

const SUPPORTED_CODES = LANG_LIST.map(l => l.code);

/* ── VIEW ROUTER (للملفات المنفصلة) ── */
function showView(id) {
    if (id === 'home' || id === '') {
        window.location.href = 'index.html';
    } else if (id === 'detail') {
        // صفحة التفاصيل تُبنى ديناميكياً، سيتم التعامل معها في tools-loader.js
        // لكن لو احتجناها، هنفتح detail.html (وهو غير موجود كملف ثابت)
        // سنستخدم window.location.href = 'video-to-scenes.html'; مثلاً
        // لكن الأفضل نمررها للـ loader.
        console.warn('Detail view is handled by tools-loader.js');
    } else {
        window.location.href = id + '.html';
    }
}

/* ── THEME ── */
const htmlEl = document.documentElement;
const themeBtn = document.getElementById('themeBtn');

function applyTheme(light) {
    light ? htmlEl.classList.add('light') : htmlEl.classList.remove('light');
    const sunIc = document.querySelector('.sun-ic');
    const moonIc = document.querySelector('.moon-ic');
    if (sunIc && moonIc) {
        sunIc.style.display = light ? 'block' : 'none';
        moonIc.style.display = light ? 'none' : 'block';
    }
    localStorage.setItem('CBBX-theme', light ? 'light' : 'dark');
}

// تطبيق الثيم عند تحميل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        applyTheme(localStorage.getItem('CBBX-theme') === 'light');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => applyTheme(!htmlEl.classList.contains('light')));
        }
    });
} else {
    applyTheme(localStorage.getItem('CBBX-theme') === 'light');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => applyTheme(!htmlEl.classList.contains('light')));
    }
}

/* ── TRANSLATION ENGINE (API-based · 70+ languages) ── */
const translateEngine = {
    currentLang: 'ar',
    cache: {},

    detectLanguage() {
        const saved = localStorage.getItem('CBBX-lang');
        if (saved && SUPPORTED_CODES.includes(saved)) return saved;
        const browser = (navigator.language || 'ar').slice(0, 2).toLowerCase();
        if (SUPPORTED_CODES.includes(browser)) return browser;
        for (const code of SUPPORTED_CODES) {
            if (code.startsWith(browser)) return code;
        }
        const full = navigator.language || 'ar';
        if (SUPPORTED_CODES.includes(full)) return full;
        return 'ar';
    },

    populateDropdown() {
        const menu = document.getElementById('langMenu');
        if (!menu) return;
        menu.innerHTML = '';
        const sorted = [...LANG_LIST].sort((a, b) => {
            if (a.code === 'ar') return -1;
            if (b.code === 'ar') return 1;
            return a.name.localeCompare(b.name);
        });
        sorted.forEach(l => {
            const li = document.createElement('li');
            li.className = 'lo' + (l.code === this.currentLang ? ' sel' : '');
            li.dataset.lang = l.code;
            li.textContent = l.name;
            li.addEventListener('click', () => {
                this.setLanguage(l.code);
                document.getElementById('langMenu')?.classList.remove('open');
            });
            menu.appendChild(li);
        });
    },

    setLanguage(code) {
        if (!SUPPORTED_CODES.includes(code)) code = 'ar';
        this.currentLang = code;
        localStorage.setItem('CBBX-lang', code);
        const found = LANG_LIST.find(l => l.code === code);
        const label = document.getElementById('langLabel');
        if (label) label.textContent = found ? found.name.slice(0, 2).toUpperCase() : code.toUpperCase();
        document.querySelectorAll('.lo').forEach(el => {
            el.classList.toggle('sel', el.dataset.lang === code);
        });
        this.applyTranslation();
        const isRTL = (code === 'ar' || code === 'he' || code === 'fa' || code === 'ur');
        htmlEl.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
        document.body.classList.toggle('rtl', isRTL);
    },

    collectTranslatable() {
        const items = [];
        // 1. Elements with data-tr
        document.querySelectorAll('[data-tr]').forEach(el => {
            let original = el.dataset.original;
            if (!original) {
                original = el.textContent.trim();
                el.dataset.original = original;
            }
            if (original && original.length > 0) {
                items.push({ el, original, key: el.dataset.tr || original.slice(0, 20) });
            }
        });

        // 2. Static containers (legal, support, etc.)
        const containers = document.querySelectorAll(
            '.legal-box .legal-section p, .legal-box .legal-section li, .legal-box .legal-section h2, .support-form label, .support-form input, .support-form textarea, .support-form .checkbox-group label span, .thankyou-msg h2, .thankyou-msg p, .cd-box-compact .cd-label, .cd-box-compact .cd-sub'
        );
        containers.forEach(el => {
            if (el.closest('[data-tr]')) return;
            let txt = el.textContent.trim();
            if (txt && txt.length > 1 && !el.querySelector('svg')) {
                let original = el.dataset.original;
                if (!original) {
                    original = txt;
                    el.dataset.original = original;
                }
                const exists = items.some(it => it.el === el);
                if (!exists) {
                    items.push({ el, original, key: 'static-' + original.slice(0, 20) });
                }
            }
        });

        // 3. Placeholders
        document.querySelectorAll('[data-tr-placeholder]').forEach(el => {
            let original = el.dataset.originalPlaceholder;
            if (!original) {
                original = el.placeholder || '';
                el.dataset.originalPlaceholder = original;
            }
            if (original && original.length > 0) {
                items.push({ el, original, key: 'placeholder-' + (el.id || 'unknown'), isPlaceholder: true });
            }
        });

        return items;
    },

    async translateText(text, targetLang) {
        if (!text || text.trim().length === 0) return text;
        if (targetLang === 'ar') return text;
        const cacheKey = 'tr_' + targetLang + '_' + text.slice(0, 80);
        if (this.cache[cacheKey]) return this.cache[cacheKey];

        try {
            const url =
                `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
            const resp = await fetch(url);
            if (!resp.ok) throw new Error('API error');
            const data = await resp.json();
            let result = '';
            if (data && data[0]) {
                for (const part of data[0]) {
                    if (part && part[0]) result += part[0];
                }
            }
            if (result) {
                this.cache[cacheKey] = result;
                return result;
            }
            return text;
        } catch (e) {
            console.warn('Translation failed:', text, e);
            return text;
        }
    },

    async applyTranslation() {
        const target = this.currentLang;
        if (target === 'ar') {
            document.querySelectorAll('[data-original]').forEach(el => {
                const orig = el.dataset.original;
                if (orig !== undefined) el.textContent = orig;
            });
            document.querySelectorAll('[data-original-placeholder]').forEach(el => {
                const orig = el.dataset.originalPlaceholder;
                if (orig !== undefined) el.placeholder = orig;
            });
            const label = document.getElementById('langLabel');
            if (label) label.textContent = 'AR';
            return;
        }

        const items = this.collectTranslatable();
        const filtered = items.filter(it => it.original && it.original.trim().length > 1);

        const batchSize = 6;
        for (let i = 0; i < filtered.length; i += batchSize) {
            const batch = filtered.slice(i, i + batchSize);
            await Promise.all(batch.map(async (item) => {
                try {
                    const translated = await this.translateText(item.original, target);
                    if (translated && translated !== item.original) {
                        const el = item.el;
                        if (item.isPlaceholder) {
                            el.placeholder = translated;
                        } else {
                            el.textContent = translated;
                        }
                    }
                } catch (e) { /* ignore */ }
            }));
            if (i + batchSize < filtered.length) {
                await new Promise(r => setTimeout(r, 100));
            }
        }

        const found = LANG_LIST.find(l => l.code === target);
        const label = document.getElementById('langLabel');
        if (label) label.textContent = found ? found.name.slice(0, 2).toUpperCase() : target.toUpperCase();
    },

    init() {
        const detected = this.detectLanguage();
        this.currentLang = detected;
        this.populateDropdown();
        this.setLanguage(detected);
    }
};

window.translateEngine = translateEngine;

/* ── LANGUAGE DROPDOWN TOGGLE ── */
const langBtn = document.getElementById('langBtn');
const langMenu = document.getElementById('langMenu');
if (langBtn && langMenu) {
    langBtn.addEventListener('click', e => { e.stopPropagation();
        langMenu.classList.toggle('open'); });
    document.addEventListener('click', () => langMenu.classList.remove('open'));
}

/* ── RADIANT GLOW ── */
function radiate(card) {
    if (!card) return;
    card.classList.remove('radiant');
    void card.offsetWidth;
    card.classList.add('radiant');
    setTimeout(() => card.classList.remove('radiant'), 1600);
}
window.radiate = radiate;

/* ── NAV BUTTONS ── */
document.addEventListener('DOMContentLoaded', function() {
    const logoBtn = document.getElementById('logoBtn');
    const homeBtn = document.getElementById('homeBtn');
    const slBackBtn = document.getElementById('slBackBtn');

    if (logoBtn) logoBtn.addEventListener('click', () => showView('home'));
    if (homeBtn) homeBtn.addEventListener('click', () => showView('home'));
    if (slBackBtn) {
        slBackBtn.addEventListener('click', () => {
            stopCountdown();
            showView('home');
        });
    }
});

/* ── SAFELINK COUNTDOWN (compact) ── */
let cdInterval = null;
let clickCount = 0;
const CIRCUMFERENCE_COMPACT = 220;

function startCountdown() {
    stopCountdown();
    clickCount = 0;
    const numEl = document.getElementById('cdNum');
    const ringEl = document.getElementById('ringProg');
    const unlockBtn = document.getElementById('unlockBtn');
    const popNotice = document.getElementById('popNotice');

    if (!numEl || !ringEl || !unlockBtn) return;

    numEl.textContent = '10';
    numEl.style.color = 'var(--txt)';
    ringEl.style.strokeDashoffset = '0';
    ringEl.style.stroke = 'var(--accent)';
    unlockBtn.classList.remove('ready');
    unlockBtn.style.background = 'linear-gradient(135deg, var(--accent), var(--accent2))';
    const downloadSpan = unlockBtn.querySelector('span');
    if (downloadSpan) downloadSpan.textContent = document.querySelector('[data-tr="download"]')?.textContent || 'تنزيل';
    if (popNotice) popNotice.classList.remove('visible');

    let remaining = 10;
    cdInterval = setInterval(() => {
        remaining--;
        numEl.textContent = remaining;
        const elapsed = 10 - remaining;
        const progress = elapsed / 10;
        ringEl.style.strokeDashoffset = String(CIRCUMFERENCE_COMPACT * (1 - progress));
        if (remaining <= 3 && remaining > 0) numEl.style.color = 'var(--accent)';
        if (remaining <= 0) {
            clearInterval(cdInterval);
            cdInterval = null;
            numEl.textContent = '✓';
            numEl.style.color = '#22c55e';
            ringEl.style.stroke = '#22c55e';
            unlockBtn.classList.add('ready');
        }
    }, 1000);
}

function stopCountdown() {
    if (cdInterval) { clearInterval(cdInterval);
        cdInterval = null; }
}

/* ── UNLOCK BUTTON: TWO-STAGE ── */
function handleUnlockClick() {
    clickCount++;
    if (clickCount === 1) {
        const popWin = window.open('about:blank', '_blank');
        if (popWin) {
            popWin.document.write(`
            <!DOCTYPE html><html><head><title>CBBX Ad</title>
            <style>body{margin:0;background:#000;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:system-ui}
            .box{text-align:center;color:#fff;padding:40px}
            h2{font-size:22px;margin-bottom:8px}p{color:#888;font-size:14px}
            </style></head><body><div class='box'>
            <h2 style='color:#dc143c'>CBBX</h2>
            <p>محاكاة إعلان منبثق · أعد النقر على زر التحميل</p>
            </div></body></html>`);
            popWin.document.close();
        }
        const popNotice = document.getElementById('popNotice');
        if (popNotice) popNotice.classList.add('visible');
        const btn = document.getElementById('unlockBtn');
        if (btn) {
            btn.style.background = 'linear-gradient(135deg, #1a7a3c, #22c55e)';
            const span = btn.querySelector('span');
            if (span) span.textContent = '▶ اضغط مرة أخرى للتحميل';
        }
    } else {
        const url = window._dynamicDownloadUrl || '#';
        if (url && url !== '#') {
            window.open(url, '_blank');
            alert('✅ بدء تحميل الملف!\n' + url);
        } else {
            alert('✅ تم التحضير للتحميل!');
        }
    }
}

/* ── SUPPORT FORM HANDLER (with Gmail compose link) ── */
function submitSupport(e) {
    e.preventDefault();

    const name = document.getElementById('supportName')?.value.trim();
    const message = document.getElementById('supportMessage')?.value.trim();
    const contactWhatsApp = document.getElementById('contactWhatsApp')?.checked;
    const contactEmail = document.getElementById('contactEmail')?.checked;
    const errorEl = document.getElementById('contactError');

    if (!name || !message) {
        alert('يرجى ملء جميع الحقول المطلوبة.');
        return false;
    }

    if (!contactWhatsApp && !contactEmail) {
        if (errorEl) errorEl.classList.add('visible');
        return false;
    }
    if (errorEl) errorEl.classList.remove('visible');

    const fullMsg = `الاسم: ${name}\nالرسالة: ${message}\n---\n${contactWhatsApp ? 'سيتم التواصل عبر واتساب (رقم: 01501168668)' : ''}${contactWhatsApp && contactEmail ? ' و ' : ''}${contactEmail ? 'البريد الإلكتروني (hisham123awad@gmail.com)' : ''}`;

    if (contactWhatsApp) {
        const waUrl = `https://wa.me/201501168668?text=${encodeURIComponent(fullMsg)}`;
        window.open(waUrl, '_blank');
    }

    if (contactEmail) {
        const subject = 'رسالة دعم فني من ' + name;
        const body = fullMsg;
        const gmailUrl =
            `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=hisham123awad@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(gmailUrl, '_blank');
    }

    const form = document.getElementById('supportForm');
    const thank = document.getElementById('thankYouMsg');
    if (form) form.style.display = 'none';
    if (thank) thank.classList.add('visible');

    return false;
}

/* ── CONTACT SUPPORT (footer link) ── */
function contactSupport() {
    showView('support');
}
window.contactSupport = contactSupport;

/* ── BACK TO TOP BUTTON ── */
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', function() {
    translateEngine.init();
    setTimeout(() => translateEngine.applyTranslation(), 500);
});

console.log('🚀 CBBX PRO · Core Engine loaded.');
console.log('🌍 Translation Engine · ' + LANG_LIST.length + ' languages supported.');
console.log('📧 Support: hisham123awad@gmail.com');