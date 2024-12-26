const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js'); // Import from Supabase client library

// Initialize Supabase client
const supabase = createClient('https://vqvruapmkpjwdrrhnzfr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxdnJ1YXBta3Bqd2RycmhuemZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAzMzM3MTUsImV4cCI6MjAzNTkwOTcxNX0.oqhbTwHcsmsM_FbQSrdAs-bpN-wZ3UPXvIP3TCh5Fyg');

const generateSitemap = async () => {
  try {
    // Fetch product data from Supabase
    const { data: products, error } = await supabase
      .from('products')
      .select('product_id')
      .order('product_id');

    if (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<urlset\n`;
    sitemap += `      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
    sitemap += `      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
    sitemap += `      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n`;

    // Add static URLs
    const staticUrls = [
      { loc: 'https://alcheez.com/', lastmod: new Date().toISOString() },
      { loc: 'https://alcheez.com/electronics', lastmod: new Date().toISOString() },
      { loc: 'https://alcheez.com/contact-us', lastmod: new Date().toISOString() },
      { loc: 'https://alcheez.com/electronics/headsets', lastmod: new Date().toISOString() },
      { loc: 'https://alcheez.com/electronics/speakers', lastmod: new Date().toISOString() },
      { loc: 'https://alcheez.com/electronics/power-banks', lastmod: new Date().toISOString() },
      { loc: 'https://alcheez.com/electronics/smart-watches', lastmod: new Date().toISOString() },
      { loc: 'https://alcheez.com/electronics/chargers-cables', lastmod: new Date().toISOString() },
      { loc: 'https://alcheez.com/electronics/mobile-laptop-stands', lastmod: new Date().toISOString() }
    ];

    staticUrls.forEach(url => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${url.loc}</loc>\n`;
      sitemap += `    <lastmod>${url.lastmod}</lastmod>\n`;
      sitemap += `  </url>\n`;
    });

    // Add dynamic product URLs
    products.forEach(product => {
      const url = `https://alcheez.com/product-details/${product.product_id}`;
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${url}</loc>\n`;
      sitemap += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
      sitemap += `  </url>\n`;
    });

    sitemap += `</urlset>\n`;

    // Write sitemap to file
    fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), sitemap);
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
};

generateSitemap();
