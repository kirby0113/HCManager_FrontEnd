export const getGroupsErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 404: {
      return {status: 'fail', content: 'Group取得に失敗しました。APIサーバーのエンドポイントが見つかりません。'};
    }
    default: {
      return {status: 'fail', content: 'ログインに失敗しました。定義されていないエラーです。'};
    }
  }
};
