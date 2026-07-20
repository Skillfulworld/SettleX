import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(req: Request) {
  const body = await req.json();
  const { table_name } = body;

  console.log('SIGNALRECEIVED');

  const { data, error } = await supabase
    .rpc('get_table_data', { table_name });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log('RPC_EXECUTED');
  return NextResponse.json(data);
}
