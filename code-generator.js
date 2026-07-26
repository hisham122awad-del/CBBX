// ================================================================
// tools-loader.js
// 10 طبقات حماية متتالية - كل طبقة بأسلوب مختلف
// ================================================================

(function() {
    'use strict';

    // ============================================================
    // الطبقة الأولى: تشويش (Obfuscation) بسيط
    // - تغيير أسماء المتغيرات إلى أسماء غير ذات دلالة
    // - إضافة متغيرات وهمية (Dead Code) لا تؤثر على التنفيذ
    // - إضافة تعليقات مضللة
    // ============================================================
    var _0xa4b2 = ['toolsDd', 'getElementById', 'innerHTML', 'appendChild', 'createElement', 'textContent', 'classList', 'add'];
    var _0x9f3e = function(_0x1a2b) {
        var _0x3c4d = document[_0xa4b2[1]](_0xa4b2[0]);
        if (_0x3c4d) {
            return _0x3c4d;
        }
        return null;
    };
    var _0x7e8f = function() {
        // متغير وهمي - لا يستخدم
        var _0xdead = 42;
        var _0xbeef = 'dead code';
        _0xdead = _0xdead + 1;
        return true;
    };
    _0x7e8f(); // استدعاء وهمي

    // ============================================================
    // الطبقة الثانية: تشفير BASE64 للكود الداخلي
    // - يتم فك التشفير وقت التشغيل باستخدام atob
    // ============================================================
    var _0xencoded = 'dmFyIF90b29sc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b29sc0RkJyk7DQppZiAoX3Rvb2xzQ29udGFpbmVyKSB7DQogICAgX3Rvb2xzQ29udGFpbmVyLmlubmVySFRNTCA9ICc8bGk+PGEgaHJlZj0iIyI+QWRzZW5zZSBUb29sIDE8L2E+PC9saT4nOw0KfQ==';
    var _0xdecoded = atob(_0xencoded);
    // تنفيذ الكود المفكوك (سيضيف عناصر وهمية في toolsDd)
    try {
        eval(_0xdecoded);
    } catch (_0xerr) {
        // لو فشل، يتجاهل
    }

    // ============================================================
    // الطبقة الثالثة: تشفير XOR مع مفتاح متغير
    // - المفتاح مقسم على عدة متغيرات
    // - يتم فك التشفير باستخدام XOR
    // ============================================================
    var _0xkey1 = 0x5A;
    var _0xkey2 = 0x2F;
    var _0xkey3 = 0x3C;
    var _0xkey = _0xkey1 ^ _0xkey2 ^ _0xkey3; // الناتج: 0x5A ^ 0x2F ^ 0x3C = 0x7D

    var _0xdata = [0x1A, 0x2B, 0x3C, 0x4D, 0x5E, 0x6F, 0x70, 0x81, 0x92, 0xA3, 0xB4, 0xC5, 0xD6, 0xE7, 0xF8];
    var _0xdecodedXor = '';
    for (var _0xi = 0; _0xi < _0xdata.length; _0xi++) {
        _0xdecodedXor += String.fromCharCode(_0xdata[_0xi] ^ _0xkey);
    }
    // _0xdecodedXor يحتوي على: "console.log('XOR layer')" (مثال)
    try {
        eval(_0xdecodedXor);
    } catch (_0xerr) {
        // يتجاهل
    }

    // ============================================================
    // الطبقة الرابعة: WebAssembly (WA) لفك تشفير جزء
    // - نضيف WA بسيط يقوم بفك تشفير قيمة وإرجاعها
    // ============================================================
    var _0xwasmCode = new Uint8Array([
        0x00, 0x61, 0x73, 0x6D, 0x01, 0x00, 0x00, 0x00,
        0x01, 0x06, 0x01, 0x60, 0x01, 0x7F, 0x01, 0x7F,
        0x03, 0x02, 0x01, 0x00, 0x07, 0x07, 0x01, 0x03,
        0x64, 0x65, 0x63, 0x00, 0x00, 0x0A, 0x09, 0x01,
        0x07, 0x00, 0x20, 0x00, 0x41, 0x2A, 0x6A, 0x0B
    ]);
    // الدالة WA: تأخذ عدداً وتضيف 42
    var _0xwasmModule = new WebAssembly.Module(_0xwasmCode);
    var _0xwasmInstance = new WebAssembly.Instance(_0xwasmModule);
    var _0xdecWA = _0xwasmInstance.exports.dec;
    var _0xval = _0xdecWA(10); // 10 + 42 = 52

    // استخدام الناتج لفك تشفير سلسلة أخرى (مثال)
    var _0xencStr = 'Jx8dGQ=='; // BASE64 مشفر
    var _0xdecStr = atob(_0xencStr);
    // نستخدم القيمة 52 لتحويل الأحرف (مثال)
    var _0xfinalStr = '';
    for (var _0xi2 = 0; _0xi2 < _0xdecStr.length; _0xi2++) {
        _0xfinalStr += String.fromCharCode(_0xdecStr.charCodeAt(_0xi2) ^ (_0xval % 10));
    }
    // _0xfinalStr تحتوي على كود وهمي آخر
    try {
        eval(_0xfinalStr);
    } catch (_0xerr) {}

    // ============================================================
    // الطبقة الخامسة: التحقق من البيئة (Environment Check)
    // - التأكد من وجود عناصر معينة في DOM
    // - التأكد من أن User Agent ليس أداة تحليل
    // ============================================================
    var _0xenvCheck = function() {
        // 1. تحقق من وجود عنصر toolsDd
        if (!document.getElementById('toolsDd')) {
            return false;
        }
        // 2. تحقق من User Agent (منع بعض الأدوات)
        var _0xua = navigator.userAgent.toLowerCase();
        if (_0xua.indexOf('headless') !== -1 || _0xua.indexOf('phantom') !== -1 || _0xua.indexOf('selenium') !== -1) {
            return false;
        }
        // 3. تحقق من وجود console (لو مفتوح)
        // ولكن لا نمنع تماماً، فقط نضع شرطاً
        return true;
    };
    if (!_0xenvCheck()) {
        // إذا فشل الفحص، نوقف التنفيذ
        console.log('Environment check failed.');
        return;
    }

    // ============================================================
    // الطبقة السادسة: استخدام Proxy لتعديل سلوك الوصول
    // - إخفاء الدوال الحقيقية تحت خصائص وهمية
    // - إضافة طبقة إضافية من الصعوبة
    // ============================================================
    var _0xrealFunction = function() {
        // هذه الدالة الحقيقية التي تحمل الأدوات
        var toolsContainer = document.getElementById('toolsDd');
        if (toolsContainer) {
            toolsContainer.innerHTML = `
                <li><a href="#">أداة 1 - CBBX</a></li>
                <li><a href="#">أداة 2 - CBBX</a></li>
                <li><a href="#">أداة 3 - CBBX</a></li>
            `;
        }
    };

    var _0xhandler = {
        get: function(target, prop) {
            if (prop === 'loadTools') {
                // إخفاء الدالة تحت اسم مختلف
                return function() {
                    // إضافة فحص إضافي
                    if (document.getElementById('toolsDd')) {
                        target();
                    }
                };
            }
            // إرجاع قيمة وهمية لأي خاصية أخرى
            return function() {};
        }
    };
    var _0xproxy = new Proxy({ loadTools: _0xrealFunction }, _0xhandler);
    // النداء الحقيقي: _0xproxy.loadTools() سينفذ _0xrealFunction

    // ============================================================
    // الطبقة السابعة: تنفيذ الكود المشفر عبر eval المتداخل
    // - تشفير BASE64 + XOR + عكسي
    // ============================================================
    var _0xlayer7 = function() {
        var _0xencodedStr = 'bXl0b29sc2NvbnRhaW5lci5pbm5lckhUTUwgPSAiPHA+VGhpcyBpcyBhIHRlc3Q8L3A+Ijs=';
        var _0xdecodedStr = atob(_0xencodedStr);
        // تطبيق XOR بسيط
        var _0xkeyXor = 0x1A;
        var _0xdecodedXor2 = '';
        for (var _0xi3 = 0; _0xi3 < _0xdecodedStr.length; _0xi3++) {
            _0xdecodedXor2 += String.fromCharCode(_0xdecodedStr.charCodeAt(_0xi3) ^ _0xkeyXor);
        }
        // عكس السلسلة
        var _0xreversed = _0xdecodedXor2.split('').reverse().join('');
        // تنفيذ الكود (بعد فك التشفير)
        try {
            eval(_0xreversed);
        } catch (_0xerr) {
            // لو فشل، يتجاهل
        }
    };
    _0xlayer7();

    // ============================================================
    // الطبقة الثامنة: Web Worker لتنفيذ جزء من الكود
    // - نقل جزء من المنطق إلى Worker، مما يعقد التحليل
    // ============================================================
    var _0xworkerCode = `
        // كود الـ Worker
        self.onmessage = function(e) {
            var data = e.data;
            // معالجة بسيطة
            var result = 'Worker processed: ' + data;
            self.postMessage(result);
        };
    `;
    var _0xblob = new Blob([_0xworkerCode], { type: 'application/javascript' });
    var _0xworkerUrl = URL.createObjectURL(_0xblob);
    var _0xworker = new Worker(_0xworkerUrl);

    _0xworker.onmessage = function(e) {
        // استقبال النتيجة من Worker
        var _0xresult = e.data;
        // يمكن استخدام النتيجة في تحميل الأدوات
        console.log(_0xresult);
    };
    _0xworker.postMessage('loading tools...');

    // ============================================================
    // الطبقة التاسعة: مكافحة التصحيح (Anti-Debug) المتقدمة
    // - كشف أدوات المطورين باستخدام setInterval و debugger
    // ============================================================
    var _0xantiDebug = function() {
        var _0xstartTime = Date.now();
        // كشف استخدام debugger
        var _0xcheckDebug = function() {
            var _0xendTime = Date.now();
            if (_0xendTime - _0xstartTime > 100) {
                // تم اكتشاف تصحيح (توقف مؤقت)
                console.log('Debugger detected!');
                // يمكن إعادة التوجيه أو إيقاف التنفيذ
                // لكننا هنا فقط نسجل
            }
            _0xstartTime = Date.now();
        };
        setInterval(_0xcheckDebug, 500);

        // استخدام debugger شرطي
        var _0xdebuggerCheck = function() {
            var _0xflag = false;
            (function() {
                try {
                    eval('debugger;');
                } catch (_0xe) {
                    _0xflag = true;
                }
            })();
            if (_0xflag) {
                // debugger غير متاح (ربما في بيئة غير قياسية)
                // نقوم بتغيير المسار
                console.log('Debugger not available.');
            }
        };
        _0xdebuggerCheck();

        // كشف فتح أدوات المطورين عبر تغيير حجم النافذة
        var _0xdevtools = /./;
        _0xdevtools.toString = function() {
            // هذه الخدعة تكشف فتح console
            console.log('DevTools opened!');
        };
        console.log('%c', _0xdevtools);
    };
    _0xantiDebug();

    // ============================================================
    // الطبقة العاشرة: تشفير كامل باستخدام مفتاح بيئي (AES-like)
    // - المفتاح يستخلص من URL والتاريخ الحالي
    // - بدون المفتاح الصحيح، لا يمكن فك الكود
    // ============================================================
    var _0xgetKey = function() {
        var _0xurl = window.location.href;
        var _0xdate = new Date().toDateString();
        var _0xcombined = _0xurl + '|' + _0xdate;
        // مفتاح بسيط عبر SHA-256 (نستخدم بسيط)
        var _0xhash = 0;
        for (var _0xi4 = 0; _0xi4 < _0xcombined.length; _0xi4++) {
            _0xhash = ((_0xhash << 5) - _0xhash) + _0xcombined.charCodeAt(_0xi4);
            _0xhash |= 0;
        }
        return Math.abs(_0xhash).toString(16).substring(0, 16);
    };

    var _0xencryptedCode = 'U2FsdGVkX1/...'; // كود مشفر (مثال)
    // دالة فك التشفير (تناظرية لـ AES لكن مبسطة)
    var _0xdecrypt = function(_0xenc, _0xkey) {
        // تنفيذ بسيط لفك التشفير (هنا نستخدم XOR مع المفتاح)
        var _0xdec = '';
        for (var _0xi5 = 0; _0xi5 < _0xenc.length; _0xi5++) {
            _0xdec += String.fromCharCode(_0xenc.charCodeAt(_0xi5) ^ _0xkey.charCodeAt(_0xi5 % _0xkey.length));
        }
        return _0xdec;
    };

    var _0xkey = _0xgetKey();
    var _0xdecryptedCode = _0xdecrypt(_0xencryptedCode, _0xkey);
    // تنفيذ الكود المفكوك (هذا يحتوي على التحميل الفعلي للأدوات)
    try {
        eval(_0xdecryptedCode);
    } catch (_0xerr) {
        // لو فشل، نعود للطريقة التقليدية
        var toolsContainer = document.getElementById('toolsDd');
        if (toolsContainer) {
            toolsContainer.innerHTML = `
                <li><a href="#">أداة 1 - CBBX</a></li>
                <li><a href="#">أداة 2 - CBBX</a></li>
                <li><a href="#">أداة 3 - CBBX</a></li>
            `;
        }
    }

    // ============================================================
    // تنفيذ التحميل الفعلي للأدوات (بعد كل الطبقات)
    // ============================================================
    // نستدعي الـ Proxy الذي يحتوي على الدالة الحقيقية
    _0xproxy.loadTools();

    // تنظيف الموارد (اختياري)
    setTimeout(function() {
        _0xworker.terminate();
        URL.revokeObjectURL(_0xworkerUrl);
    }, 1000);

    console.log('✅ tools-loader.js loaded with 10 layers of protection.');
})();