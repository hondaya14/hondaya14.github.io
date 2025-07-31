import crypto from 'crypto'

export interface AmazonProductInfo {
  title?: string
  description?: string
  image?: string
  url?: string
  siteName?: string
  price?: string
  availability?: string
}

interface PAAPIItem {
  ItemInfo?: {
    Title?: { DisplayValue?: string }
    Features?: { DisplayValues?: string[] }
  }
  Images?: { Primary?: { Large?: { URL?: string } } }
  Offers?: {
    Listings?: Array<{
      Price?: { DisplayAmount?: string }
      Availability?: { Message?: string }
    }>
  }
}

interface PAAPIResponse {
  ItemsResult?: { Items?: PAAPIItem[] }
}

function sign(key: string | Buffer, msg: string) {
  return crypto.createHmac('sha256', key).update(msg, 'utf8').digest()
}

function getSignatureKey(key: string, dateStamp: string, regionName: string, serviceName: string) {
  const kDate = sign('AWS4' + key, dateStamp)
  const kRegion = sign(kDate, regionName)
  const kService = sign(kRegion, serviceName)
  return sign(kService, 'aws4_request')
}

function extractASIN(url: string): string | null {
  try {
    const asinMatch = url.match(/(?:dp|gp\/product)\/([A-Z0-9]{10})/i)
    if (asinMatch) return asinMatch[1]
    const urlObj = new URL(url)
    const parts = urlObj.pathname.split('/')
    for (const part of parts) {
      if (/^[A-Z0-9]{10}$/.test(part)) return part
    }
  } catch {
    // ignore
  }
  return null
}

export async function fetchAmazonProductInfo(url: string): Promise<AmazonProductInfo | null> {
  const asin = extractASIN(url)
  if (!asin) {
    console.error('Failed to extract ASIN from URL:', url)
    return null
  }

  const accessKey = process.env.AMAZON_ACCESS_KEY
  const secretKey = process.env.AMAZON_SECRET_KEY
  const partnerTag = process.env.AMAZON_PARTNER_TAG
  const region = process.env.AMAZON_REGION || 'us-east-1'
  const host = process.env.AMAZON_HOST || 'webservices.amazon.co.jp'
  const marketplace = process.env.AMAZON_MARKETPLACE || 'www.amazon.co.jp'

  if (!accessKey || !secretKey || !partnerTag) {
    console.error('Amazon PA-API environment variables are not set')
    return null
  }

  const service = 'ProductAdvertisingAPI'
  const endpoint = `https://${host}/paapi5/getitems`
  const now = new Date()
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '')
  const dateStamp = amzDate.slice(0, 8)

  const payload = JSON.stringify({
    ItemIds: [asin],
    Resources: [
      'Images.Primary.Large',
      'ItemInfo.Title',
      'Offers.Listings.Price',
      'Offers.Listings.Availability'
    ],
    PartnerTag: partnerTag,
    PartnerType: 'Associates',
    Marketplace: marketplace
  })

  const canonicalHeaders = [
    'content-encoding:amz-1.0',
    'content-type:application/json; charset=utf-8',
    `host:${host}`,
    `x-amz-date:${amzDate}`
  ].join('\n') + '\n'
  const signedHeaders = 'content-encoding;content-type;host;x-amz-date'
  const payloadHash = crypto.createHash('sha256').update(payload, 'utf8').digest('hex')
  const canonicalRequest = [
    'POST',
    '/paapi5/getitems',
    '',
    canonicalHeaders,
    signedHeaders,
    payloadHash
  ].join('\n')

  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    crypto.createHash('sha256').update(canonicalRequest, 'utf8').digest('hex')
  ].join('\n')

  const signingKey = getSignatureKey(secretKey, dateStamp, region, service)
  const signature = crypto.createHmac('sha256', signingKey).update(stringToSign, 'utf8').digest('hex')

  const authorizationHeader =
    `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`

  const headers = {
    'Content-Encoding': 'amz-1.0',
    'Content-Type': 'application/json; charset=utf-8',
    'X-Amz-Date': amzDate,
    Authorization: authorizationHeader,
    Host: host
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: payload
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch Amazon product info: ${response.status}`)
    }

    const data = (await response.json()) as PAAPIResponse
    const item = data.ItemsResult?.Items?.[0]
    if (!item) {
      throw new Error('No item information returned')
    }

    return {
      title: item.ItemInfo?.Title?.DisplayValue,
      description: item.ItemInfo?.Features?.DisplayValues?.[0],
      image: item.Images?.Primary?.Large?.URL,
      siteName: 'Amazon',
      url,
      price: item.Offers?.Listings?.[0]?.Price?.DisplayAmount,
      availability: item.Offers?.Listings?.[0]?.Availability?.Message
    }
  } catch (error) {
    console.error('Error fetching Amazon product info via PA-API:', error)
    return null
  }
}

export function isAmazonUrl(url: string): boolean {
  return /amazon\.(co\.jp|com)/i.test(url) || /amzn\.(asia|to)/i.test(url)
}