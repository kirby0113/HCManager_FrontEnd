# 引継ぎ者向けドキュメント

## 開発環境・技術選定

### OS・フレームワーク等
- Windows 10
- JavaScript
- React (v17.0.2)
- node (v14.16.0)

### パッケージ

#### CSS in JS
- styled-components (v5.3.1)

#### デザインライブラリ
- material-ui/core (v4.12.3)
- material-ui/icons (v4.11.2)

#### 問題作成のForm管理
- react-final-form (v6.5.7)

#### 問題文表示用
- query-string (v7.0.1)
- papaparse (v5.3.1)
- html-react-parser (v1.4.5)

#### ルーティング管理
- react-router (v5.2.1)

#### ページネーション
- react-pagination (v5.2.1)

## 大まかなディレクトリ（2022/02/28時点）
```
HelloCManager
|   .env
|   .eslintrc
|   .gitignore
|   .prettierrc
|   package-lock.json
|   package.json
|   README.md
|   
+---build
|               
+---node_modules
|                   
+---public\
|       
\---src
    |   APILink.js　APIの大まかなリンクを定義
    |   App.js
    |   index.css
    |   index.js
    |   reportWebVitals.js
    |   
    +---components ページで使うコンポーネント群
    |   |   
    |   +---API　API処理を記述したファイル群
    |   |       
    |   +---Buttons　各ページで使用するボタン群やボタンのリスト表示
    |   |           
    |   +---Cards　詳細ページ・一覧ページで使うCardコンポーネント群
    |   |           
    |   +---Forms　Form内で使うコンポーネント群
    |   |       
    |   +---Function
    |   |
    |   +---Modals　作成や編集用のModalコンポーネント群
    |   |           
    |   +---pages 各ページ専用のコンポーネント定義
    |   |           
    |   +---Pagination 一覧ページで使うページネーション用コンポーネント
    |   |       
    |   \---Utilities その他分類に困ったコンポーネント入れ
    |       |---Anchor.js リンク表示
    |       |---Loading.js　ローディング画面
    |       |---Title.js　各画面のタイトル
    |       |   
    |       \---Card　問題詳細のみで使う（？）コンポーネント入れ
    |               CodeBoard.js
    |               Label.js
    |               QuestionBoard.js
    |               
    +---constants 定数定義用フォルダ
    |       
    +---contexts コンテキスト定義用フォルダ
    |       
    +---hooks　カスタムフック定義用フォルダ
    |       
    \---pages 各ページの定義
        |---LoginUser.js
        |   
        +---Auth
        |       
        +---Book
        |       
        +---Group
        |       
        +---Home
        |       
        +---Question
        |           
        \---User
```

## Context
### ディレクトリ
```
contexts/
   |---AuthContext.js
   |---BookContext.js
   |---GroupContext.js
   |---PaginationContext.js
   |---QuestionContext.js
   |---UserContext.js
```
### 説明
- APIから取得したデータをそれぞれ管理するために、Contextを作成しています。
- 基本的には、取得したデータを入れるStateと編集・作成Modal等で使用するためのState(select〇〇という名前)を作ってます。
#### 例外として、以下のものがあります。
#####  AuthContext
- 認証しているか確認するためのContext。
- ログイン時にAPIから認証データを取得し、このContextに保存します。（ユーザーページなどで使用）
##### PaginationContext
- 各ページのページネーション状態の表示状態を管理するためのContext。
- perPageとoffsetのStateを作成してます。（前ページのページネーションをすべてこれで管理）
- ページ表示の時に大体リセットします。


## カスタムフック

### ディレクトリ

```
hooks/
   |---useBook.js
   |---useGroup.js
   |---usePagination.js
   |---useQuestion.js
   |---useUser.js
```

### 説明
- APIからのデータ取得・登録・更新・削除といった処理を一つにまとめています。
- 基本的には前述したContextと併せて使用します。
- ここで作成したカスタムフックを各ページで必要に応じて利用することで、コードの重複等を避けています。
