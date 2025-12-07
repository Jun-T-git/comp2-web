# サーバーサイド - クライアント層

## 役割
サーバーサイドから外部にアクセスするロジックを提供する。
ビジネスロジックは持たない。

## 構成

- `[client]/[client].client.ts` : クライアント層
- `[client]/[client].client.test.ts` : クライアント層のテスト
- `[client]/[client].schema.ts` : クライアント層のスキーマ
- `[client]/[client].mapper.ts` : クライアント層のマッパー
