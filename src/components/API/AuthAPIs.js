export const loginUser = async (jsonData) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/auth/signin`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      mail: jsonData.mail,
      password: jsonData.password,
    }),
  })
    .then((res) => res.json())
    .then((json) => json);
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
    .then((json) => json);
};
