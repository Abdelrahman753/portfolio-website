import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({ region: 'us-east-1' }); // Replace with your AWS region

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS,POST'
  };

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Request body is missing' })
      };
    }

    const formData = JSON.parse(event.body);
    const recipientEmail = process.env.RECIPIENT_EMAIL;
    const senderEmail = process.env.SENDER_EMAIL;
    
    if (!recipientEmail || !senderEmail) {
      throw new Error('Email configuration is missing');
    }

    if (!formData.name || !formData.email || !formData.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Missing required fields' })
      };
    }

    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: [recipientEmail]
      },
      Message: {
        Body: {
          Text: {
            Data: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
          }
        },
        Subject: {
          Data: `New Contact Form Submission from ${formData.name}`
        }
      },
      Source: senderEmail,
      ReplyToAddresses: [formData.email]
    });

    await sesClient.send(command);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('Error processing request:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        message: 'Failed to process request',
        error: error.message || 'Unknown error'
      })
    };
  }
};