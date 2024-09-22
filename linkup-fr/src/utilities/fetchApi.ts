interface IOptionsProps {
  method?: string;
  headers?: {};
  body?: string;
}

export default async function fetchApi(
  url: string,
  options?: IOptionsProps
): Promise<any> {
  try {
    const response = await fetch(url, options);
    console.log(response);
    if (!response.ok) throw new Error("Error with the response");
    return await response.json();
  } catch (error) {
    return { message: "Error with the fetchApi", error };
  }
}
