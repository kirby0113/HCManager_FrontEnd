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

## ディレクトリ（2022/02/28時点）
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
    |   APILink.js
    |   App.js
    |   index.css
    |   index.js
    |   reportWebVitals.js
    |   
    +---components ページで使うコンポーネント群
    |   |   Breadcrumbs.js パンくずリスト
    |   |   Header.js　全ページのヘッダー
    |   |   Navigation.js　ページ移動に使うナビゲーション
    |   |   
    |   +---API　API処理を記述したファイル群
    |   |       AuthAPIs.js
    |   |       BookAPIs.js
    |   |       GroupAPIs.js
    |   |       QuestionAPIs.js
    |   |       UserAPIs.js
    |   |       
    |   +---Buttons　各ページで使用するボタン群やボタンのリスト表示
    |   |   |   PrimaryButton.js
    |   |   |   
    |   |   \---Lists
    |   |           AddButtonList.js
    |   |           EditRelationButtonList.js
    |   |           
    |   +---Cards　詳細ページ・一覧ページで使うCardコンポーネント群
    |   |   |   AnswerCard.js
    |   |   |   DetailCard.js
    |   |   |   InfoCard.js
    |   |   |   
    |   |   \---Lists
    |   |           InfoCardList.js
    |   |           
    |   +---Forms　Form内で使うコンポーネント群
    |   |       InputBox.js
    |   |       Question.js
    |   |       SelectBox.js
    |   |       TextArea.js
    |   |       
    |   +---Function
    |   +---Modals　作成や編集用のModalコンポーネント群
    |   |   |   Modal.js
    |   |   |   Overray.js
    |   |   |   
    |   |   +---Create
    |   |   |       CreateBookModal.js
    |   |   |       CreateGroupModal.js
    |   |   |       CreateUserModal.js
    |   |   |       
    |   |   \---Edit
    |   |           EditBookModal.js
    |   |           EditGroupModal.js
    |   |           EditUserModal.js
    |   |           
    |   +---pages 各ページ専用のコンポーネント定義
    |   |   +---Book
    |   |   |       BookInfo.js
    |   |   |       
    |   |   +---Group
    |   |   |       GroupInfo.js
    |   |   |       
    |   |   +---Questions
    |   |   |       QuestionInfo.js
    |   |   |       
    |   |   \---Users
    |   |           UserInfo.js
    |   |           
    |   +---Pagination 一覧ページで使うページネーション用コンポーネント
    |   |       Pagination.js
    |   |       SelectPerPage.js
    |   |       
    |   \---Utilities その他分類に困ったコンポーネント入れ
    |       |   Anchor.js リンク表示
    |       |   Loading.js　ローディング画面
    |       |   Title.js　各画面のタイトル
    |       |   
    |       \---Card　問題詳細のみで使う（？）コンポーネント入れ
    |               CodeBoard.js
    |               Label.js
    |               QuestionBoard.js
    |               
    +---constants 定数定義用フォルダ
    |       Button.js
    |       Color.js
    |       
    +---contexts コンテキスト定義用フォルダ
    |       AuthContext.js
    |       BookContext.js
    |       GroupContext.js
    |       PaginationContext.js
    |       QuestionContext.js
    |       UserContext.js
    |       
    +---hooks　カスタムフック定義用フォルダ
    |       useBook.js
    |       useGroup.js
    |       usePagination.js
    |       useQuestion.js
    |       useUser.js
    |       
    \---pages 各ページの定義
        |   LoginUser.js
        |   
        +---Auth
        |       Login.js
        |       Register.js
        |       
        +---Book
        |       BookDetail.js
        |       BookList.js
        |       
        +---Group
        |       GroupDetail.js
        |       GroupList.js
        |       
        +---Home
        |       Home.js
        |       
        +---Question
        |   |   QuestionDetail.js
        |   |   QuestionList.js
        |   |   
        |   \---create
        |           CreateBlankQuestion.js
        |           
        \---User
                UserList.js
```
