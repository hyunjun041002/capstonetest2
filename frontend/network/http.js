export const fetching = async (url, option) => {
  let { body, method, headers } = option;
  let baseURL = "http://localhost:3000";

  try {
    const response = await fetch(`${baseURL}${url}`, {
      method,
      body: JSON.stringify(body),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    let data = await response.json();
    console.log(data);
    return await { status: response.status, inf: data };
  } catch (err) {
    throw err;
  }
};
