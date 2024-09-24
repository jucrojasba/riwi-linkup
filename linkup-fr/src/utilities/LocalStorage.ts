// Importing the ICoder interface for type safety
import { ICoder } from "@/UI/interfaces/ICoderInterface";

// Function to save data to local storage
export function saveLocalStorage(name: string, data: string | ICoder | number): void {
    // Storing the data in local storage with the specified name, converting it to a JSON string
    localStorage.setItem(`${name}`, JSON.stringify(data));
}

// Function to clear all data from local storage
export function clearLocalStorage(): void {
    // Removing all key-value pairs from local storage
    localStorage.clear();
}
