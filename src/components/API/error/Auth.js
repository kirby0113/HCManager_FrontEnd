export const loginErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 404: {
      return {status: 'fail', content: 'ログインに失敗しました。入力されたユーザー情報が見つかりません。'};
    }
    case 401: {
      return {status: 'fail', content: 'ログインに失敗しました。パスワードが違います。'};
    }
    default: {
      return {status: 'fail', content: 'ログインに失敗しました。定義されていないエラーです。'};
    }
  }
};
