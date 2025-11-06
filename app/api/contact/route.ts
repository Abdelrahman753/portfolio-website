/**
 * This file used to be a server-side API proxy. For a static-only deployment
 * (for example hosting on S3) we don't run server handlers. Instead this
 * module exposes the configured API Gateway URL as a build-time constant so
 * client code can import it and send directly to the public API.
 *
 * Note: HTTP handlers under `app/api` won't run on purely static hosts.
 */

export const CONTACT_API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL ??
  'https://i55zopetdd.execute-api.us-east-1.amazonaws.com/prod/contact'

export default CONTACT_API_URL
