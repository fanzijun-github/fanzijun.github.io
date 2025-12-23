// 渲染 [!NOTE]/[!WARN]/[!WARNING]/[!ERROR] 等块，并适配 Obsidian 风格的 !note / !tip(s) / !important 等标记
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('blockquote p').forEach(function (p) {
        const text = (p.textContent || '').trim();
        const lower = text.toLowerCase();

        const mapping = {
            'note': 'note',
            'tip': 'tip',
            'tips': 'tip',
            'important': 'important',
            'info': 'info',
            'warning': 'warn',
            'warn': 'warn',
            'error': 'error',
            'danger': 'error',
            'success': 'success'
        };

        let cls = null;

        for (const key in mapping) {
            if (!Object.prototype.hasOwnProperty.call(mapping, key)) continue;
            if (lower.startsWith('[!' + key + ']') || lower.startsWith('!' + key)) {
                cls = mapping[key];

                // 从 HTML 中移除标记（同时支持 [!key] 和 !key 开头）
                try {
                    const reBracket = new RegExp('\\[!' + key + '\\]', 'i');
                    const reBang = new RegExp('^!'+key+'\\s*', 'i');
                    p.innerHTML = p.innerHTML.replace(reBracket, '').replace(reBang, '');
                } catch (e) {
                    // 如果正则构造失败，忽略删除（极少发生）
                }
                break;
            }
        }

        if (cls) {
            const blockquote = p.parentNode;
            if (blockquote && blockquote.classList) blockquote.classList.add(cls);

            // 额外清理可能残留的常见标记（保险处理）
            p.innerHTML = p.innerHTML
                .replace(/\[!(note|tip|tips|important|info|warning|warn|error|danger|success)\]/i, '')
                .replace(/^(?:!)(note|tip|tips|important|info|warning|warn|error|danger|success)\s*/i, '');
        }
    });
});

// KaTeX 自动渲染
document.addEventListener("DOMContentLoaded", function () {
    if (window.renderMathInElement) {
        renderMathInElement(document.body, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ],
            throwOnError: false
        });
    }
});