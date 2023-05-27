# クライアントを起動する
client/start:
	npm run dev

# クライアントの型定義をチェックする
client/type-check/watch:
	npm run type-check:watch

# データベースのカラム変化を監視する
server/watch:
	npm run server:watch

# データベースに変更したカラムを反映させる
db/push:
	npm run db/push

# データベース GUI を起動する
db/watch:
	npm run studio

# 依存パッケージをインストールする
install/dependencies:
	npm ci
