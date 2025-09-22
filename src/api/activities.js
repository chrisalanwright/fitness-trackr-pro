const API = import.meta.env.VITE_API;

export async function getActivities() {
  try {
    const response = await fetch((API = "/activities"));
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getActivity(id) {
  try {
    const response = await fetch(API + "/activities/" + id);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createActivity(token, activity) {
  if (!token) {
    throw Error("Must sign in to create activity.");
  }

  const response = await fetch(API + "/activities/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + token,
    },
    body: JSON.stringify(activity),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

export async function deleteActivity(token, id) {
  if (!token) {
    throw Error("Must sign in to delete activity.");
  }

  const response = await fetch((API = "/activities/" + id), {
    method: "DELETE",
    headers: {
      Authorization: "Bearer" + token,
    },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}
