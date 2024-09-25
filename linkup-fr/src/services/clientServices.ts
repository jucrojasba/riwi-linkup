export async function getCompaniesByMonth(): Promise<{ formattedDates: string[], counts: number[] } | null> {
  try {
    const response = await fetch('api/companies'); // Fetch data from API
    const companies = await response.json(); // Parse the JSON response
    const { data } = companies; // Extract the data property
  
    // If data is not an array or doesn't exist, return null
    if (!data || !Array.isArray(data)) return null;
  
    // Abbreviations for months (January to December)
    const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    // Get the last 5 data points
    const lastFive = data.slice(-5);
  
    // Map over the last 5 records and format dates using month abbreviation
    const formattedDates = lastFive.map(item => monthAbbreviations[item.month - 1]);
    
    // Extract the count from each item
    const counts = lastFive.map(item => item.count);
  
    // Return formatted data and counts
    return { formattedDates, counts };
  } catch (error) {
    console.error('Error fetching data:', error); // Log any errors
    return null; // Return null in case of error
  }
}
