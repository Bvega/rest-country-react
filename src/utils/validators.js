/**
 * Validation Utility Functions
 * 
 * This file contains functions to validate user input,
 * particularly for IP addresses and search queries.
 * 
 * IP Address Format:
 * - IPv4: Four numbers (0-255) separated by dots (e.g., 192.168.1.1)
 * - IPv6: Eight groups of four hexadecimal digits (e.g., 2001:0db8:85a3::8a2e:0370:7334)
 */

/**
 * Validates if a string is a valid IPv4 address
 * 
 * @param {string} ip - The string to validate
 * @returns {boolean} - True if valid IPv4 address
 * 
 * Examples:
 * - Valid: "192.168.1.1", "8.8.8.8", "255.255.255.255"
 * - Invalid: "256.1.1.1", "192.168", "abc.def.ghi.jkl"
 */
export const isValidIPAddress = (ip) => {
  // Check if input is a string and not empty
  if (!ip || typeof ip !== 'string') {
    return false;
  }
  
  // Regular expression breakdown:
  // ^ - Start of string
  // (?:...) - Non-capturing group
  // 25[0-5] - Matches 250-255
  // 2[0-4][0-9] - Matches 200-249
  // [01]?[0-9][0-9]? - Matches 0-199
  // \. - Literal dot
  // {3} - Repeat 3 times
  // $ - End of string
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  
  return ipv4Regex.test(ip);
};

/**
 * Validates if a string is a valid IPv6 address
 * 
 * @param {string} ip - The string to validate
 * @returns {boolean} - True if valid IPv6 address
 * 
 * This handles most common IPv6 formats including:
 * - Full format: 2001:0db8:85a3:0000:0000:8a2e:0370:7334
 * - Compressed: 2001:db8:85a3::8a2e:370:7334
 * - IPv4 mapped: ::ffff:192.168.1.1
 */
export const isValidIPv6Address = (ip) => {
  // Check if input is a string and not empty
  if (!ip || typeof ip !== 'string') {
    return false;
  }
  
  // Simplified IPv6 regex that handles most common formats
  // This is a complex regex that matches various IPv6 formats
  const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  
  return ipv6Regex.test(ip);
};

/**
 * Determines the type of search query
 * 
 * @param {string} query - The search query
 * @returns {'ip' | 'country' | null} - The type of search
 * 
 * Logic:
 * 1. If query matches IP address format → 'ip'
 * 2. If query has letters or spaces → 'country'
 * 3. If empty or invalid → null
 */
export const detectSearchType = (query) => {
  // Handle empty or invalid input
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return null;
  }
  
  // Remove extra whitespace
  const trimmedQuery = query.trim();
  
  // Check if it's an IP address (IPv4 or IPv6)
  if (isValidIPAddress(trimmedQuery) || isValidIPv6Address(trimmedQuery)) {
    return 'ip';
  }
  
  // If it contains letters or spaces, assume it's a country search
  // This regex checks for any letter (a-z, A-Z) or space
  if (/[a-zA-Z\s]/.test(trimmedQuery)) {
    return 'country';
  }
  
  // Default to null for ambiguous input
  return null;
};

/**
 * Sanitizes search input to prevent XSS attacks
 * 
 * @param {string} input - Raw user input
 * @returns {string} - Sanitized input
 * 
 * Security note: This removes potentially dangerous characters
 * that could be used for cross-site scripting (XSS) attacks
 */
export const sanitizeSearchInput = (input) => {
  // Return empty string for invalid input
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  return input
    .trim()                    // Remove leading/trailing whitespace
    .replace(/[<>]/g, '')      // Remove angle brackets (prevent HTML injection)
    .replace(/['"]/g, '')      // Remove quotes (prevent attribute injection)
    .slice(0, 100);            // Limit length to prevent DOS attacks
};

/**
 * Validates country name format
 * 
 * @param {string} name - Country name to validate
 * @returns {boolean} - True if valid country name format
 * 
 * Rules:
 * - At least 2 characters
 * - Only letters, spaces, hyphens, and apostrophes
 * - No numbers or special characters
 */
export const isValidCountryName = (name) => {
  if (!name || typeof name !== 'string') {
    return false;
  }
  
  const trimmed = name.trim();
  
  // Check minimum length
  if (trimmed.length < 2) {
    return false;
  }
  
  // Allow letters, spaces, hyphens, apostrophes, and periods
  // This covers names like "United States", "Côte d'Ivoire", "St. Lucia"
  const countryNameRegex = /^[a-zA-ZÀ-ÿ\s\-'.]+$/;
  
  return countryNameRegex.test(trimmed);
};

/**
 * Formats an IP address for display
 * 
 * @param {string} ip - IP address to format
 * @returns {string} - Formatted IP address
 * 
 * Adds visual separation for readability
 */
export const formatIPAddress = (ip) => {
  if (!ip) return '';
  
  // For IPv6, add spacing around ::
  if (ip.includes(':')) {
    return ip.replace('::', ' :: ');
  }
  
  // For IPv4, return as-is (already readable)
  return ip;
};

/**
 * Extract numbers from a string (useful for partial IP searches)
 * 
 * @param {string} input - Input string
 * @returns {string} - String with only numbers and dots
 */
export const extractIPPattern = (input) => {
  if (!input) return '';
  
  // Keep only numbers, dots, and colons (for IPv6)
  return input.replace(/[^0-9.:]/g, '');
};