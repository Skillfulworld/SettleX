import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { arcCircleClient } from '@/lib/arc/client';

export async function POST(req: Request) {
  const body = await req.json();
  const { agent_id, trigger_metric, incoming_value } = body;

  console.log('SIGNALRECEIVED');

  const { data: rule, error } = await supabase
    .from('settlement_rules')
    .select('*, agents(wallet_address)')
    .eq('agent_id', agent_id)
    .eq('trigger_signal', trigger_metric)
    .eq('status', 'active')
    .single();

  if (error || !rule) {
    console.log('RULENOTFOUND');
    return NextResponse.json({ message: 'Rule not found' }, { status: 404 });
  }

  console.log('RULEFOUND');

  if (incoming_value >= rule.threshold) {
    // Assuming agents is an object due to .single()
    const agents = rule.agents as any;
    await arcCircleClient.sendTransaction({
      from: 'PLACEHOLDER_SYSTEM_WALLET',
      to: agents.wallet_address,
      amount: rule.settlement_amount.toString(),
      currency: 'USDC'
    });
    console.log('SETTLEMENT_EXECUTED');
  }

  console.log('VALIDATED');
  return NextResponse.json({ status: 'success' });
}
