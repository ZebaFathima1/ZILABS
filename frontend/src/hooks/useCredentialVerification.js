import { useQuery } from '@tanstack/react-query';
import Papa from 'papaparse';
import axios from 'axios';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTTsEKPmeuUa6KoMZ38iS_MccQg-Qjgh0p_flRJTLP3ON3o_I0EIfSgFjg5kLItZB1wHgr46v_Rip1h/pub?output=csv';

/**
 * Hook to fetch and parse credential data from Google Sheets CSV.
 * Uses TanStack Query for caching and efficient data retrieval.
 */
export const useCredentialVerification = () => {
  const query = useQuery({
    queryKey: ['credentials'],
    queryFn: async () => {
      try {
        const response = await axios.get(CSV_URL);
        const csvText = response.data;
        
        return new Promise((resolve, reject) => {
          Papa.parse(csvText, {
            header: true,
            skipEmptyLines: 'greedy',
            transformHeader: (header) => header.trim(), // Requirement 4: Trim whitespace from headers
            transform: (value) => value.trim(), // Requirement 4: Trim whitespace from values
            complete: (results) => {
              if (results.errors.length > 0) {
                console.warn('CSV Parsing Warnings:', results.errors);
              }
              
              // Debug logging
              console.log('--- Credential Database Debug ---');
              console.log('Total Records:', results.data.length);
              if (results.data.length > 0) {
                console.log('Headers Detected:', Object.keys(results.data[0]));
              }
              console.log('Full Data:', results.data);
              console.log('---------------------------------');
              
              resolve(results.data);
            },
            error: (err) => {
              reject(new Error(`CSV Parsing Error: ${err.message}`));
            },
          });
        });
      } catch (err) {
        throw new Error(`Failed to fetch credential database: ${err.message}`);
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes cache
    retry: 2,
  });

  /**
   * Searches for a credential record by ID.
   * @param {string} id - The Credential ID to look up.
   * @returns {object|null} The matching record or null if not found.
   */
  const verifyCredential = (id) => {
    if (!query.data || !id) return null;
    
    // Requirement 4 & 5: Trim and case-insensitive comparison
    const normalizedSearchId = id.trim().toUpperCase();
    
    // Requirement 3: Search using exact column name "Credential ID"
    return query.data.find(row => {
      const credId = row['Credential ID'];
      return credId?.toString().trim().toUpperCase() === normalizedSearchId;
    }) || null;
  };

  return {
    verifyCredential,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    isFetched: query.isFetched,
    refetch: query.refetch
  };
};
