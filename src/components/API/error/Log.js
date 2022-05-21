export const getLogsErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: 'ログ一覧取得に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: 'ログ一覧取得に失敗しました。APIサーバーのエンドポイントが見つかりません。'};
    }
    default: {
      return {status: 'fail', content: 'ログ一覧取得に失敗しました。定義されていないエラーです。'};
    }
  }
};
