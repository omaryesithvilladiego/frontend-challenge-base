const urlBack = "http://localhost:3001/";

export const loginFetch = async (
  email: string,
  password: string,
): Promise<any> => {
  const response = await fetch(`${urlBack}users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();

  return data;
};

export const signupFetch = async (
  email: string,
  password: string,
): Promise<any> => {
  const response = await fetch(`${urlBack}users/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Signup failed");
  }

  const data = await response.json();

  return data;
};
