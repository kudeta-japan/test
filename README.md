# KU-DETA 静的サイト

KU-DETA（岐阜市の肉とチーズのレストラン）のコーポレートサイトを、単一ページ構成（`index.html`、`styles.css`、`main.js`）で実装しています。モバイルファーストのレスポンシブデザインで、メニュータブ、予約フォーム、採用応募フォーム、Instagram埋め込み、構造化データなどを備えています。

## 編集ポイント

ページ上部の `<body>` 要素に設定している `data-*` 属性を更新すると、住所・営業時間・電話番号・予約URL・Instagramハンドル・席数などがページ全体で自動的に反映されます。

```html
<body
  data-address="岐阜県岐阜市〇〇町1-2-3"
  data-hours="ランチ 11:30-15:00 (L.O.14:00) / ディナー 17:30-23:00 (L.O.22:00)"
  data-phone="058-000-0000"
  data-reservation-url="https://example.com/reserve"
  data-instagram="@ku_deta_gifu"
  data-seats="テーブル40席 / カウンター6席"
>
```

必要に応じて以下も編集してください。

- **メニューや価格の変更**：`index.html` 内の該当セクションを更新します。JSON-LD（構造化データ）は `main.js` 内の `ldMenu` オブジェクトを編集してください。
- **フォームの送信先**：現在はフロントエンド側でのバリデーション後に完了メッセージを表示するダミー動作です。実運用に合わせて `main.js` の `reserveForm` / `recruitForm` ハンドラをサーバー送信に置き換えてください。
- **Instagram**：埋め込み先の投稿URLを更新する場合は `#instagram` セクションの `data-instgrm-permalink` を差し替えてください。

## ビルド / 起動方法

静的ファイルのみの構成です。以下の手順でローカルプレビューが可能です。

```bash
# 任意のHTTPサーバーで配信します（例：python）
python -m http.server 3000
# ブラウザで http://localhost:3000/index.html を開く
```

CDN や任意の静的ホスティングサービスに `index.html`、`styles.css`、`main.js` をアップロードするだけで稼働します。
