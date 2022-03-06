export const getGroupsErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: 'クラス作成に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: 'クラス一覧取得に失敗しました。APIサーバーのエンドポイントが見つかりません。'};
    }
    default: {
      return {status: 'fail', content: 'クラス一覧取得に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const getGroupErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: 'クラス取得に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: 'クラス取得に失敗しました。該当グループが見つかりません。'};
    }
    default: {
      return {status: 'fail', content: 'クラス取得に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const createGroupErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: 'Group作成に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: 'Group作成に失敗しました。作成用のエンドポイントが見つかりません。'};
    }
    default: {
      return {status: 'fail', content: 'Group作成に失敗しました。定義されていないエラーです。'};
    }
  }
};
