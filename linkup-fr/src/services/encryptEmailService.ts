import fetchApi from "@/utilities/fetchApi";

export async function encryptEmailService(email: string): Promise<{ encryptedEmail: string; iv: string } | { message: string }> {
    const apiFetch = await fetchApi("/api/encryptEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(email)
    });
    console.log("apiFetch", apiFetch);

    if (apiFetch && "message" in apiFetch) {
        return apiFetch; 
    }

    return apiFetch; 
}


export async function decryptEmailService(encryptedEmail: string, iv: string): Promise<{ email: string } | { message: string }> {
    const response = await fetch("/api/decryptEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: encryptedEmail, iv })
    });

    const data = await response.json();
    return data;
}
