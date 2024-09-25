// Defining an interface for the options that can be passed to the fetchApi function
interface IOptionsProps {
  method?: string;  // HTTP method (GET, POST, etc.)
  headers?: {};     // Any headers to include in the request
  body?: string;    // The body of the request, if applicable
}

// Asynchronous function to fetch data from an API
export default async function fetchApi(
  url: string,           // The API endpoint URL
  options?: IOptionsProps // Optional settings for the request
): Promise<any> {
  try {
    // Making the fetch call with the provided URL and options
    const response = await fetch(url, options);
    console.log(response); // Logging the response for debugging

    // Checking if the response is not ok (status code not in the range 200-299)
    if (!response.ok) throw new Error("Error with the response");

    // Parsing the response JSON and returning it
    return await response.json();
  } catch (error) {
    // Returning an error message if something goes wrong
    return { message: "Error with the fetchApi", error };
  }
}
