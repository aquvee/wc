/**
 * デフォルトのスタイルをシャドウDOMに追加する。
 * @param {ShadowRoot} shadowRoot - このコンポーネントのシャドウルート。
 */
function addDefaultStyle(shadowRoot) {
    const style = document.createElement('style');
    style.textContent = `
        /* ローディングインジケーターのスタイル */
        .loader {
            width: 32px;
            height: 32px;
            background-image:url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzJweCcgaGVpZ2h0PSczMnB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIgY2xhc3M9InVpbC1zcGluIj4KICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0ibm9uZSIgY2xhc3M9ImJrIj48L3JlY3Q+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTAgNTApIj4KICAgIDxnIHRyYW5zZm9ybT0icm90YXRlKDApIHRyYW5zbGF0ZSgzNCAwKSI+CiAgICAgIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSI4IiBmaWxsPSIjOGY4ZDhkIj4KICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBmcm9tPSIxIiB0bz0iMC4xIiBiZWdpbj0iMHMiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+CiAgICAgICAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJzY2FsZSIgZnJvbT0iMS41IiB0bz0iMSIgYmVnaW49IjBzIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlVHJhbnNmb3JtPgogICAgICA8L2NpcmNsZT4KICAgIDwvZz4KICAgIDxnIHRyYW5zZm9ybT0icm90YXRlKDQ1KSB0cmFuc2xhdGUoMzQgMCkiPgogICAgICA8Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iOCIgZmlsbD0iIzhmOGQ4ZCI+CiAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgZnJvbT0iMSIgdG89IjAuMSIgYmVnaW49IjAuMTJzIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogICAgICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0ic2NhbGUiIGZyb209IjEuNSIgdG89IjEiIGJlZ2luPSIwLjEycyIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KICAgICAgPC9jaXJjbGU+CiAgICA8L2c+CiAgICA8ZyB0cmFuc2Zvcm09InJvdGF0ZSg5MCkgdHJhbnNsYXRlKDM0IDApIj4KICAgICAgPGNpcmNsZSBjeD0iMCIgY3k9IjAiIHI9IjgiIGZpbGw9IiM4ZjhkOGQiPgogICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGZyb209IjEiIHRvPSIwLjEiIGJlZ2luPSIwLjI1cyIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4KICAgICAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InNjYWxlIiBmcm9tPSIxLjUiIHRvPSIxIiBiZWdpbj0iMC4yNXMiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGVUcmFuc2Zvcm0+CiAgICAgIDwvY2lyY2xlPgogICAgPC9nPgogICAgPGcgdHJhbnNmb3JtPSJyb3RhdGUoMTM1KSB0cmFuc2xhdGUoMzQgMCkiPgogICAgICA8Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iOCIgZmlsbD0iIzhmOGQ4ZCI+CiAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgZnJvbT0iMSIgdG89IjAuMSIgYmVnaW49IjAuMzdzIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogICAgICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0ic2NhbGUiIGZyb209IjEuNSIgdG89IjEiIGJlZ2luPSIwLjM3cyIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KICAgICAgPC9jaXJjbGU+CiAgICA8L2c+CiAgICA8ZyB0cmFuc2Zvcm09InJvdGF0ZSgxODApIHRyYW5zbGF0ZSgzNCAwKSI+CiAgICAgIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSI4IiBmaWxsPSIjOGY4ZDhkIj4KICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBmcm9tPSIxIiB0bz0iMC4xIiBiZWdpbj0iMC41cyIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4KICAgICAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InNjYWxlIiBmcm9tPSIxLjUiIHRvPSIxIiBiZWdpbj0iMC41cyIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KICAgICAgPC9jaXJjbGU+CiAgICA8L2c+CiAgICA8ZyB0cmFuc2Zvcm09InJvdGF0ZSgyMjUpIHRyYW5zbGF0ZSgzNCAwKSI+CiAgICAgIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSI4IiBmaWxsPSIjOGY4ZDhkIj4KICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBmcm9tPSIxIiB0bz0iMC4xIiBiZWdpbj0iMC42MnMiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+CiAgICAgICAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJzY2FsZSIgZnJvbT0iMS41IiB0bz0iMSIgYmVnaW49IjAuNjJzIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlVHJhbnNmb3JtPgogICAgICA8L2NpcmNsZT4KICAgIDwvZz4KICAgIDxnIHRyYW5zZm9ybT0icm90YXRlKDI3MCkgdHJhbnNsYXRlKDM0IDApIj4KICAgICAgPGNpcmNsZSBjeD0iMCIgY3k9IjAiIHI9IjgiIGZpbGw9IiM4ZjhkOGQiPgogICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGZyb209IjEiIHRvPSIwLjEiIGJlZ2luPSIwLjc1cyIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4KICAgICAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InNjYWxlIiBmcm9tPSIxLjUiIHRvPSIxIiBiZWdpbj0iMC43NXMiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGVUcmFuc2Zvcm0+CiAgICAgIDwvY2lyY2xlPgogICAgPC9nPgogICAgPGcgdHJhbnNmb3JtPSJyb3RhdGUoMzE1KSB0cmFuc2xhdGUoMzQgMCkiPgogICAgICA8Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iOCIgZmlsbD0iIzhmOGQ4ZCI+CiAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgZnJvbT0iMSIgdG89IjAuMSIgYmVnaW49IjAuODdzIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogICAgICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0ic2NhbGUiIGZyb209IjEuNSIgdG89IjEiIGJlZ2luPSIwLjg3cyIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KICAgICAgPC9jaXJjbGU+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4=');
            background-repeat: no-repeat;
            background-position: center;
            margin: 0 auto;
        }
    `;
    shadowRoot.appendChild(style);
}

const templateStyle = `
    /* テーブル用スタイル */
    table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        margin: 0 auto;
    }
    table th, table td {
        padding: 10px 15px;
        border: 1px solid #8b9ba9;
        text-align: center;
        background-color: #f2f2f2;
    }
    table th {
        background: #225588;
        color: white;
        font-weight: bold;
    }
    table th:first-child {
        border-top-left-radius: 5px;
    }
    table th:last-child {
        border-top-right-radius: 5px;
    }
    table tr:last-child td:first-child {
        border-bottom-left-radius: 5px;
    }
    table tr:last-child td:last-child {
        border-bottom-right-radius: 5px;
    }
    table tr:nth-child(odd) td {
        background-color: #f9f9f9;
    }
    table tr:nth-child(even) td {
        background-color: #ffffff;
    }
    /* リスト用スタイル */
    ul, ol {
        list-style: none;
        padding-left: 0;
    }
    li {
        padding: 8px 16px;
        border-bottom: 1px solid #8b9ba9;
        background-color: #f9f9f9;
    }
    li:nth-child(even) {
        background-color: #e9e9e9;
    }
    ul li:before {
        content: "•";
        color: #225588;
        padding-right: 5px;
    }
    ol li:before {
        content: counter(item) ".";
        color: #225588;
        padding-right: 5px;
    }
`;

/**
 * カスタムスタイルタグをシャドウDOMに追加し、将来の更新のために参照を保持する。
 * @param {ShadowRoot} shadowRoot - このコンポーネントのシャドウルート。
 * @returns {HTMLStyleElement} - 追加されたカスタムスタイルタグ。
 */
function addStyleTag(shadowRoot) {
    const customStyleTag = document.createElement('style');
    shadowRoot.appendChild(customStyleTag);
    return customStyleTag;
}

class AquveeComponent extends HTMLElement {
    /**
     * AquveeComponent のコンストラクタ。
     * シャドウルートの設定とスタイルの初期化を行う。
     */
    constructor() {
        super();
        this._initialized = false;
        this._observer = null;
        this._format = null;
        // シャドウルートを作成
        const shadowRoot = this.attachShadow({mode: 'open'});
        // スタイルの設定
        addDefaultStyle(shadowRoot);
        this.templateStyleTag = addStyleTag(shadowRoot);
        this.customStyleTag = addStyleTag(shadowRoot);
        // コンテンツ用のコンテナを作成
        this.contentContainer = document.createElement('div');
        shadowRoot.appendChild(this.contentContainer);
        this.style.display = 'none';
    }

    /**
     * Intersection Observer を初期化し、要素がビューポートに入るのを監視する。
     */
    initIntersectionObserver() {
        if(this._observer) return;
        // Intersection Observerの設定
        this._observer = new IntersectionObserver((entries, observer) => {
            // 要素が画面内に入った場合にのみfetchを実行
            entries.forEach(entry => {
                if (entry.isIntersecting && !this._initialized) {
                    this.render();
                    this._initialized = true;  // 初期化完了
                    observer.unobserve(this); // 以降は観察しない
                }
            });
        }, { threshold: 0.1 }); // 要素が10%画面に入った時に発火
        // 要素の観察を開始
        this._observer.observe(this);
    }

    /**
     * カスタムエレメントがDOMに接続された際に呼ばれるコールバック。
     * 必要な設定の初期化を行う。
     */
    connectedCallback() {
        // formatの設定
        this._format = this.innerHTML.trim() || "div";
        this.innerHTML = "";
        // style-cssの設定
        const styleCss = this.getAttribute('style-css');
        if (styleCss) {
            this.customStyleTag.textContent = styleCss;
        }
        const resetCss = this.hasAttribute('reset-css');
        if(!resetCss) {
            this.templateStyleTag.textContent = templateStyle;
        }
        // 初期化完了後に表示
        this.style.display = 'block';
        // Intersection Observerの設定と初期化
        this.initIntersectionObserver();
    }

    /**
     * 監視する属性のリストを返す。
     * @returns {string[]} - 監視する属性名の配列。
     */
    static get observedAttributes() {
        return ['style-css', 'query', 'is-dev', 'project-id', 'custom-url'];
    }

    /**
     * 属性が変更された際に呼ばれるコールバック。
     * @param {string} name - 変更された属性の名前。
     * @param {string} oldValue - 古い属性値。
     * @param {string} newValue - 新しい属性値。
     */
    attributeChangedCallback(name, _, newValue) {
        if (name === 'style-css') {
            this.customStyleTag.textContent = newValue;
        } else if (name === 'rest-css') {
            if (newValue === null) {
                // 属性が削除されたときの処理
                this.customStyleTag.textContent = templateStyle;
            } else {
                // 属性が追加または変更されたときの処理
                this.customStyleTag.textContent = "";
            }
        } else if (this._initialized) {
            // style-css以外の属性が変更された場合にのみ再レンダリング
            this.render();
        }
    }

    /**
     * コンポーネントの主要なレンダリングロジック。
     * サーバーからデータを取得し、DOMに内容を表示する。
     */
    async render() {
        const format = this._format;
        const query = this.getAttribute('query');
        const url = window.location.href;

        // 'is-dev' 属性の存在に基づいて URL を決定
        const aquveeUrl = (()=>{
            const projectId = this.getAttribute('project-id');
            const customUrl = this.getAttribute('custom-url');
            const isDev = this.hasAttribute('is-dev');
            if (isDev) {
                if (customUrl) {
                    return `${customUrl}/dev`;
                } else if (projectId) {
                    return `https://example.com/${projectId}/dev`;
                } else{
                    return 'http://localhost:8000/dev';
                }
            } else if(customUrl) {
                return customUrl;
            } else {
                return `https://example.com/${projectId}/wc`;
            }
        })();

        // query が未設定ならエラー表示
        if (!query) {
            this.displayError("Error: you should set query");
            return;
        }

        // ローディング状態の表示
        this.displayLoading();

        try {
            const response = await fetch(aquveeUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ format, query, url })
            });
            const data = await response.json();
            // 取得したデータを表示
            this.displayContent(data.content);
        } catch (error) {
            console.error('Data fetch error:', error);
            this.displayError("Error fetching data");
        }
    }
    
    /**
     * ローディングインジケーターを表示する。
     * データ取得中や処理中にユーザーにフィードバックを提供するために使用される。
     */
    displayLoading() {
        const loader = document.createElement('div');
        loader.classList.add('loader');
        this.updateDOM(loader);
    }

    /**
     * サーバーから取得したコンテンツを表示する。
     * @param {string} content - 表示するHTMLまたはテキストコンテンツ。
     */
    displayContent(content) {
        const container = document.createElement('div');
        container.innerHTML = content;
        this.updateDOM(container);
    }

    /**
     * エラーメッセージを表示する。
     * ネットワークエラーやサーバーからの応答エラーなど、問題が発生した場合に使用される。
     * @param {string} message - 表示するエラーメッセージ。
     */
    displayError(message) {
        const errorContainer = document.createElement('div');
        errorContainer.textContent = message;
        this.updateDOM(errorContainer);
    }

    /**
     * DOMを更新する汎用的なメソッド。
     * コンテンツコンテナ内のみを更新し、スタイルは保持する。
     * @param {HTMLElement} content - DOMに追加する要素。
     */
    updateDOM(content) {
        const fragment = document.createDocumentFragment();
        fragment.appendChild(content);
        // コンテンツコンテナのみをクリアして更新
        this.contentContainer.innerHTML = '';
        this.contentContainer.appendChild(fragment);
    }
}

// カスタムエレメントとして登録
if (!customElements.get("aquvee-component")) {
    customElements.define("aquvee-component", AquveeComponent);
}
