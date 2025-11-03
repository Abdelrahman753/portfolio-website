interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function submitContactForm(formData: ContactFormData) {
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
  
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
  } catch (error) {
    console.error('Error submitting form:', {
      error,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Unable to reach the server. Please check your connection and try again.');
    }
    throw error;
  }
}