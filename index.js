/**
 * デフォルトのローダースタイルをシャドウDOMに追加する。
 * @param {ShadowRoot} shadowRoot - このコンポーネントのシャドウルート。
 */
function addDefaultStyle(shadowRoot) {
    const style = document.createElement('style');
    style.textContent = `
        // ローダーの基本スタイルを定義
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
    shadowRoot.appendChild(style);
}

/**
 * カスタムスタイルタグをシャドウDOMに追加し、将来の更新のために参照を保持する。
 * @param {ShadowRoot} shadowRoot - このコンポーネントのシャドウルート。
 * @returns {HTMLStyleElement} - 追加されたカスタムスタイルタグ。
 */
function addCustomStyleTag(shadowRoot) {
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
        this.customStyleTag = addCustomStyleTag(shadowRoot);
        // コンテンツ用のコンテナを作成
        this.contentContainer = document.createElement('div');
        shadowRoot.appendChild(this.contentContainer);
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
        loader.innerHTML = '<div class="loader"></div>';
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
