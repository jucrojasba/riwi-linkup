import { ICoder, ICoderComplet, ICoderFilter } from "../interfaces/ICoderInterface";
import fetchApi from "@/utilities/fetchApi"; // Utility for making fetch requests
import { FilterOption, FilterState } from "@/UI/interfaces/Filter";
import { verifyExistsQueryParams } from "../utils/verifyExistsQueryParams";
import { FilterQuery } from "../interfaces/IFilterQueryInterface";

// Function to fetch a coder by its ID
// Returns either a coder object or an error message
export async function getCoderById(id: number): Promise<ICoder | { message: string }> {
    try {
        const response = await fetch(`https://linkupv1-production.up.railway.app/api/v1/Coders/${id}`);
        if (!response.ok) throw new Error(`Error with the response`);
        return await response.json(); // Return the coder data
    } catch (error) {
        // Return an error message if there's a problem fetching the coder
        return ({ message: `Error to getCoderById ${error}` });
    }
}

// Function to delete a coder by its ID
// No return value, but logs an error message in case of failure
export async function deleteCoder(id: number): Promise<void> {
    try {
        const response = await fetch(`https://linkupv1-production.up.railway.app/api/v2/CodersControllerV2/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error("Error with the response");
        await response.json(); // Wait for the response (not used)
    } catch (error) {
        // Log an error message if there's an issue deleting the coder
        console.log({ message: "Error delete coder" });
    }
}

// Function to create a new coder
// Returns the created coder object or an error message
export async function createCoder(coder: ICoderComplet): Promise<ICoder | { message: string }> {
    try {
        const response = await fetch(`https://linkupv1-production.up.railway.app/api/v2/CodersControllerV2`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(coder) // Send the coder object as JSON
        });
        if (!response.ok) throw new Error(`Error with the response`);
        return await response.json(); // Return the created coder data
    } catch (error) {
        // Return an error message if there's a problem creating the coder
        return ({ message: `Error to createCoder ${error}` });
    }
}

// Function to fetch all coders
// Returns an array of coders or an error message
export async function getCoders(): Promise<ICoder[] | { message: string }> {
    try {
        const response = await fetch(`https://linkupv1-production.up.railway.app/api/v1/Coders`);
        if (!response.ok) throw new Error(`Error with the response`);
        return await response.json(); // Return the coders data
    } catch (error) {
        // Return an error message if there's a problem fetching coders
        return ({ message: `Error to getCoders ${error}` });
    }
}

// Function to filter coders based on a query string
// Returns an array of filtered coders or an error message
export async function filterCoders(query: string): Promise<ICoderFilter[] | { message: string }> {
    const endPoint: string = "https://linkupv1-production.up.railway.app/api/v3/CodersControllerV3/filter";
    const completeQuery: string = `${endPoint}?${query}`;
    const codersFilter = await fetch(completeQuery, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return codersFilter.json(); // Return the filtered coders data
}

// Function to update an existing coder by its ID
// Returns a string message from the API
export async function updateCoder(coderUpdate: ICoderComplet, id: number): Promise<string> {
    const codersFilter = await fetch(`https://linkupv1-production.up.railway.app/api/v2/CodersControllerV2/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(coderUpdate) // Send updated coder object as JSON
    });
    console.log("codersFilter", codersFilter); // Log the response for debugging
    return await codersFilter.text(); // Return the response as plain text
}
