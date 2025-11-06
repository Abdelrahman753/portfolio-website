interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function submitContactForm(formData: ContactFormData) {
  // In development, proxy through Next.js to avoid CORS issues (server-side fetch).
  // In production, call the API Gateway URL directly.
  const API_ENDPOINT = process.env.NODE_ENV === 'development'
    ? '/api/contact'
    : process.env.NEXT_PUBLIC_API_GATEWAY_URL;
  
  if (!API_ENDPOINT) {
    console.error('API Gateway URL is missing in environment variables');
    throw new Error('API Gateway URL is not configured');
  }

  const requestBody = JSON.stringify(formData);
  console.log('Request details:', {
    url: API_ENDPOINT,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: requestBody,
  });

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: requestBody,
    });

    const responseText = await response.text();
    let responseData;
    
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse response as JSON:', responseText);
      responseData = null;
    }

    console.log('Response details:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      data: responseData,
      rawText: responseText
    });

    if (!response.ok) {
      const errorMessage = responseData?.message || 
        `Failed to send message: ${response.status} ${response.statusText}`;
      console.error('Request failed:', errorMessage);
      throw new Error(errorMessage);
    }

    return responseData;
  } catch (error: unknown) {
    // Normalize error information for logging (avoid passing `unknown` directly into console as a structured object)
    const errorInfo = error instanceof Error
      ? { message: error.message, stack: error.stack }
      : { message: String(error) };

    // Log a safe string representation to avoid any environment-specific console typing issues
    try {
      console.error('Error submitting form: ' + JSON.stringify(errorInfo));
    } catch (e) {
      // Fallback if stringify fails for any reason
      console.error('Error submitting form:', errorInfo);
    }

    if (error instanceof TypeError && typeof error.message === 'string' && error.message.includes('Failed to fetch')) {
      throw new Error('Unable to reach the server. Please check your connection and try again.');
    }

    // Re-throw the original error so callers can inspect it; if it's not an Error, wrap it.
    if (error instanceof Error) throw error;
    throw new Error(String(error));
  }
}