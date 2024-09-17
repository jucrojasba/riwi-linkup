export async function getCompaniesByMonth(): Promise<{ formattedDates: string[], counts: number[] } | undefined> {
    try {
      const response = await fetch('https://linkupv1-production.up.railway.app/api/Dashboard/companies-by-month');
      const data = await response.json();
  
      if (!data || !Array.isArray(data)) return;
  
      const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
      const lastFive = data.slice(-5);
  
      const formattedDates = lastFive.map(item => monthAbbreviations[item.month - 1]); 
      const counts = lastFive.map(item => item.count);
  
      return { formattedDates, counts };
    } catch (error) {
      console.error('Error fetching data:', error);
      return;
    }
  }
  