import axios from 'axios';

/**
 * Judge0 API Service
 * Handles code compilation and execution using Judge0 public API
 * 
 * API Endpoint: https://judge0-ce.p.rapidapi.com
 * Documentation: https://ce.judge0.com/
 */

// Judge0 API Configuration
const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';

// RapidAPI Headers (Using free tier)
// Note: You need to get your own API key from RapidAPI
// Visit: https://rapidapi.com/judge0-official/api/judge0-ce
const RAPIDAPI_HEADERS = {
  'content-type': 'application/json',
  'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY_HERE', // Replace with your actual key
  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
};

/**
 * Submit code for compilation and execution
 * @param {string} sourceCode - The source code to compile/execute
 * @param {number} languageId - Judge0 language ID
 * @param {string} stdin - Standard input for the program
 * @returns {Promise<string>} - Returns submission token
 */
export const submitCode = async (sourceCode, languageId, stdin = '') => {
  try {
    const response = await axios.post(
      `${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=false`,
      {
        source_code: sourceCode,
        language_id: languageId,
        stdin: stdin,
      },
      {
        headers: RAPIDAPI_HEADERS,
      }
    );

    return response.data.token;
  } catch (error) {
    console.error('Error submitting code:', error);
    throw new Error('Failed to submit code. Please check your API key and try again.');
  }
};

/**
 * Get submission result by token
 * @param {string} token - Submission token
 * @returns {Promise<Object>} - Returns submission result
 */
export const getSubmission = async (token) => {
  try {
    const response = await axios.get(
      `${JUDGE0_API_URL}/submissions/${token}?base64_encoded=false`,
      {
        headers: RAPIDAPI_HEADERS,
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error getting submission:', error);
    throw new Error('Failed to get submission result.');
  }
};

/**
 * Poll for submission result until completion
 * @param {string} token - Submission token
 * @param {number} maxAttempts - Maximum polling attempts
 * @param {number} interval - Polling interval in milliseconds
 * @returns {Promise<Object>} - Returns final submission result
 */
export const pollSubmission = async (token, maxAttempts = 10, interval = 1000) => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const result = await getSubmission(token);

    // Status ID meanings:
    // 1: In Queue, 2: Processing, 3: Accepted, 4: Wrong Answer, 5: Time Limit Exceeded
    // 6: Compilation Error, 7-12: Various Runtime Errors, 13: Internal Error, 14: Exec Format Error
    
    // If status is In Queue (1) or Processing (2), continue polling
    if (result.status.id === 1 || result.status.id === 2) {
      await new Promise((resolve) => setTimeout(resolve, interval));
      continue;
    }

    // Execution completed (success or error)
    return result;
  }

  throw new Error('Execution timeout. Please try again.');
};

/**
 * Execute code and get result (convenience method)
 * Combines submission and polling into one function
 * 
 * @param {string} sourceCode - The source code to execute
 * @param {number} languageId - Judge0 language ID
 * @param {string} stdin - Standard input
 * @returns {Promise<Object>} - Returns execution result with output/error
 */
export const executeCode = async (sourceCode, languageId, stdin = '') => {
  try {
    // Step 1: Submit the code
    const token = await submitCode(sourceCode, languageId, stdin);

    // Step 2: Poll for the result
    const result = await pollSubmission(token);

    // Step 3: Format and return the result
    return {
      success: result.status.id === 3, // Status 3 = Accepted/Success
      output: result.stdout || '',
      error: result.stderr || result.compile_output || '',
      status: result.status.description,
      time: result.time,
      memory: result.memory,
    };
  } catch (error) {
    return {
      success: false,
      output: '',
      error: error.message || 'An unexpected error occurred.',
      status: 'Error',
      time: null,
      memory: null,
    };
  }
};