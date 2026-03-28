import { loginTypeSchema, registerTypeSchema } from "@/schemas/auth.schemas";

export async function registerUser(data: registerTypeSchema) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    },
  );

  const responseData = await response.json();

  return responseData;
}

export async function loginUser(data: loginTypeSchema) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    },
  );

  const responseData = await response.json();

  return responseData;
}
