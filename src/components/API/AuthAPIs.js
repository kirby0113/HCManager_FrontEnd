class AuthError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'AuthError';
    this.status = response.status;
  }
}

export const loginUser = async (jsonData) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/auth/signin`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      mail: jsonData.mail,
      password: jsonData.password,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new AuthError(res);
      }
      return res.json();
    })
    .then((json) => {
      return {...json, status: 'success'};
    })
    .catch((error) => {
      if (error.status === undefined) {
        return {status: 'fail', message: 'ログインに失敗しました。ネットワークエラーです。'};
      } else {
        console.error('ログイン失敗', error);
        return {status: 'fail', message: 'ログインに失敗しました。パスワードが違います。'};
      }
    });
};

export const registerUser = async (jsonData) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: jsonData.name,
      mail: jsonData.mail,
      role: jsonData.role,
      password: jsonData.password,
    }),
  })
    .then((res) => res.json())
    .then((json) => json)
    .catch((error) => {
      console.log(error);
    });
};
