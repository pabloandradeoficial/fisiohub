import fs from 'fs';
import https from 'https';

const env = fs.readFileSync('.env.local', 'utf8');
let url = '';
let key = '';

env.split(/\r?\n/).forEach(line => {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) url = line.split('=')[1].trim();
  if (line.startsWith('SUPABASE_SERVICE_ROLE_KEY=')) key = line.split('=')[1].trim();
});

if (url && key) {
  const req = https.request(`${url}/rest/v1/profiles?select=email,plan_type`, {
    headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
  }, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => console.log('PROFILES:', data));
  });
  req.end();
} else {
  console.log("No keys found");
}
