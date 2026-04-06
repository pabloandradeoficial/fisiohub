import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDB() {
  const { data: profiles, error } = await supabase.from('profiles').select('*');
  if (error) {
    console.error("Error fetching profiles:", error);
    return;
  }
  
  console.log("=== PROFILES ===");
  profiles.forEach(p => {
    console.log(`Email: ${p.email.padEnd(30)} | Plan: ${p.plan_type?.padEnd(15)} | ID: ${p.id} | StripeCustomer: ${p.stripe_customer_id}`);
  });
  console.log("================\n");

  const { data: subscriptions, error: err2 } = await supabase.from('subscriptions').select('*');
  if (err2) {
    console.error("Error fetching subscriptions:", err2);
    return;
  }
  console.log("=== SUBSCRIPTIONS ===");
  subscriptions.forEach(s => {
    console.log(`User: ${s.user_id} | Status: ${s.status} | Plan: ${s.plan_type}`);
  });
  console.log("=====================");
}

checkDB();
