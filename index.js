class AquveeComponent extends HTMLElement {
    constructor() {
        super();
        this._initialized = false;
        this._css = `
            .loader {
                margin: 0 auto;
                width: 50px;
                aspect-ratio: 1;
                display: grid;
            }
            .loader::before,
            .loader::after {    
                content:"";
                grid-area: 1/1;
                --c:no-repeat radial-gradient(farthest-side,#25b09b 92%,#0000);
                background: 
                    var(--c) 50%  0, 
                    var(--c) 50%  100%, 
                    var(--c) 100% 50%, 
                    var(--c) 0    50%;
                background-size: 12px 12px;
                animation: l12 1s infinite;
            }
            .loader::before {
                margin: 4px;
                filter: hue-rotate(45deg);
                background-size: 8px 8px;
                animation-timing-function: linear
            }
            @keyframes l12 { 
                100%{transform: rotate(.5turn)}
            }
        `;
    }

    initIntersectionObserver() {
        const observer = new IntersectionObserver((entries, observer) => {
            // 要素が画面内に入った場合にのみfetchを実行
            entries.forEach(entry => {
                if (entry.isIntersecting && !this._initialized) {
                    this.render();
                    this._initialized = true;  // 初期化完了
                    observer.unobserve(this); // 以降は観察しない
                }
            });
        }, { threshold: 0.1 }); // 要素が10%画面に入った時に発火

        observer.observe(this); // 要素の観察を開始
    }

    connectedCallback() {
        // Intersection Observerの設定と初期化
        this.initIntersectionObserver();
    }

    static get observedAttributes() {
        return ['format', 'query', 'aquvee_url'];
    }

    attributeChangedCallback(_, oldValue, newValue) {
        // 属性が変更された場合にのみ実行
        if (oldValue !== newValue) {
            if (this._initialized) {  // 初期化後のみ再レンダリング
                this.render();
            }
        }
    }

    async render() {
        const format = this.getAttribute('format') || "div";
        const query = this.getAttribute('query');
        const aquvee_url = this.getAttribute('aquvee_url');
        const inner_class = this.getAttribute('inner_class');
        const url = window.location.href;

        // query または aquvee_url が未設定ならエラー表示
        if (!query || !aquvee_url) {
            this.innerHTML = `<div class="aquvee error">Error you should set query and aquvee_url</div>`;
            return;
        }

        // ローディング状態の表示
        this.innerHTML = `<style>${this._css}</style><div class="aquvee"><div class="loader"></div></div>`;

        try {
            const response = await fetch(aquvee_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ format, query, url })
            });
            const data = await response.json();
            
            // ここで取得したデータを表示
            this.innerHTML = `<div class="aquvee${inner_class !== null ? ' ' + inner_class : ''}">${data.content}</div>`;
        } catch (error) {
            console.error('Data fetch error:', error);
            this.innerHTML = `<div class="aquvee error">Error fetching data</div>`;
        }
    }
}

// カスタムエレメントとして登録
if (!customElements.get("aquvee-component")) {
    customElements.define("aquvee-component", AquveeComponent);
}
