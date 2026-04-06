import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const env = fs.readFileSync('.env.local', 'utf8');
let url = '', key = '';
env.split(/\r?\n/).forEach(line => {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) url = line.split('=')[1].trim();
  if (line.startsWith('SUPABASE_SERVICE_ROLE_KEY=')) key = line.split('=')[1].trim();
});

const supabase = createClient(url, key);

async function check() {
  const { data: usersData } = await supabase.auth.admin.listUsers();
  const users = usersData?.users || [];
  
  const { data: profiles } = await supabase.from('profiles').select('*');
  const { data: subs } = await supabase.from('subscriptions').select('*');

  console.log('=== USERS ===');
  for (const p of profiles) {
    const authUser = users.find(u => u.id === p.id);
    const email = authUser ? authUser.email : 'unknown';
    const sub = subs.find(s => s.user_id === p.id);
    
    console.log(`Email: ${email.padEnd(25)} | Plan: ${String(p.plan_type).padEnd(12)} | SubActive: ${sub ? sub.status : 'none'}`);
  }
}
check();
