import { parse, stringify } from 'query-string';

export default class ToSearchService {
    constructor(router, langService) {
        this.router = router;
        this.langService = langService;
        this.rect = null;

        router.afterEach((to) => {
            const { lang, tosearch } = parse(to.hash);
    
            if(lang) langService.setLocale(lang);
            if(tosearch) setTimeout(() => window.find(tosearch), 500);
        })
        document.addEventListener('mouseup', () => this.saveText());
        document.addEventListener('touchend', () => this.saveText());
        document.addEventListener('touchcancel', () => this.saveText());
    }

    saveText() {
        const selection = window.getSelection();
        const text = selection.toString();

        this.rect = text ? selection.getRangeAt(0).getBoundingClientRect() : null;

        if(!text) return;

        this.router.push({ hash: stringify({
            tosearch: text,
            lang: this.langService.lang
        })})
    }
    
    getHash(text) {
        return `#${stringify({ tosearch: text, lang: this.langService.lang })}`;
    }
}