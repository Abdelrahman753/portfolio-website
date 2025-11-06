interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function submitContactForm(formData: ContactFormData) {
  // Use the public API Gateway URL directly so this helper is static-friendly.
  // You can set NEXT_PUBLIC_API_GATEWAY_URL at build time to change the endpoint.
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_GATEWAY_URL ?? 'https://i55zopetdd.execute-api.us-east-1.amazonaws.com/prod/contact';
  
  if (!API_ENDPOINT) {
    console.error('API Gateway URL is missing in environment variables');
    throw new Error('API Gateway URL is not configured');
  }

  const requestBody = JSON.stringify(formData);

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
      // Non-JSON response is expected in some error cases; keep a minimal console.warn for debugging only
      console.warn('Failed to parse response as JSON');
      responseData = null;
    }

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
      // Keep a single informative error log for debugging in non-production environments
      console.error('Error submitting form: ' + JSON.stringify(errorInfo));
    } catch (e) {
      console.error('Error submitting form');
    }

    if (error instanceof TypeError && typeof error.message === 'string' && error.message.includes('Failed to fetch')) {
      throw new Error('Unable to reach the server. Please check your connection and try again.');
    }

    // Re-throw the original error so callers can inspect it; if it's not an Error, wrap it.
    if (error instanceof Error) throw error;
    throw new Error(String(error));
  }
}