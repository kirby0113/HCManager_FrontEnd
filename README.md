# HelloCManager

# 概要
- HelloC Managerのフロントエンドシステム
 
# 使用方法

- パッケージをインストール
```
npm install
```

- ページを表示
```
npm run start
```
localhost:8000に表示されます。

- APIのリンクを修正
compoents/APILink.js内の以下コードを修正
```
const APILink = 'http://192.168.100.130:4000';
```
この状態だと、IPアドレス192.168.100.130のlocalhost:4000にアクセスとなります。<br>
現状はここを直さないとエラーが表示され機能しなくなります。
