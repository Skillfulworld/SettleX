"use client";
import { useEffect, useState } from 'react';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';

export default function Page() {
  const [agents, setAgents] = useState([]);
  const [rules, setRules] = useState([]);

  useEffect(() => {
    fetch('/api/rpc', { method: 'POST', body: JSON.stringify({ table_name: 'agents' }) })
      .then(res => res.json())
      .then(setAgents);
    fetch('/api/rpc', { method: 'POST', body: JSON.stringify({ table_name: 'settlement_rules' }) })
      .then(res => res.json())
      .then(setRules);
  }, []);

  return (
    <div>
      <DynamicWidget />
      
      <h2>Agents</h2>
      <table>
        <thead><tr><th>ID</th><th>Wallet</th><th>Status</th></tr></thead>
        <tbody>
          {agents.map((a: any) => <tr key={a.id}><td>{a.id}</td><td>{a.wallet_address}</td><td>{a.status}</td></tr>)}
        </tbody>
      </table>

      <h2>Settlement Rules</h2>
      <table>
        <thead><tr><th>ID</th><th>Agent ID</th><th>Signal</th><th>Threshold</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody>
          {rules.map((r: any) => <tr key={r.id}><td>{r.id}</td><td>{r.agent_id}</td><td>{r.trigger_signal}</td><td>{r.threshold}</td><td>{r.settlement_amount}</td><td>{r.status}</td></tr>)}
        </tbody>
      </table>
      
      <button className="settlex-action-button">Action</button>
    </div>
  );
}