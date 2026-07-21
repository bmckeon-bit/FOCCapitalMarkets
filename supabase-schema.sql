-- Run once in Supabase > SQL Editor.
create table if not exists dashboard_state (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table dashboard_state enable row level security;
-- Anyone with the anon key may read and write the single dashboard row.
-- Edit protection is enforced in the app by the editor passcode; viewers never attempt writes.
create policy "anon read"  on dashboard_state for select using (true);
create policy "anon write" on dashboard_state for insert with check (true);
create policy "anon update" on dashboard_state for update using (true);
