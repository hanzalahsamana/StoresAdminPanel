import axios from 'axios';
import BASE_URL from '../../../../../config';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    const BaseDomain = process.env.NODE_ENV === 'production' ? 'designsli' : 'localhost:3000';
    const { site_id } = params;
    const host = req?.headers?.get('host');
    const subdomain = host.split('.')[0];
    const potentialSlug = subdomain?.replace(`${BaseDomain}`, '');

    if (!potentialSlug || potentialSlug === 'www' || potentialSlug === 'localhost:3000' || potentialSlug === 'designsli' || potentialSlug === 'dev') {
      return NextResponse.next();
    }
    const ApiQuerry = host.includes(BaseDomain) ? `subDomain=${potentialSlug}` : `domain=${host}`;

    const { data } = await axios.get(`${BASE_URL}/${site_id}/data/sitemap/xml?${ApiQuerry}`);

    return new Response(data, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error fetching sitemap:', error);
    return new Response('<urlset></urlset>', { status: 500 });
  }
}
