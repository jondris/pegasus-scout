-- =========================================================
-- PEGASUS SCOUT — Skema Supabase
-- =========================================================

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  role text check (role in ('penggalang','pembina')) default 'penggalang',
  created_at timestamptz default now()
);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'Pengguna'),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create table if not exists penggalang (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade unique,
  nama text not null,
  regu text,
  jabatan_regu text check (jabatan_regu in ('Ketua','Wakil','Sekretaris','Bendahara','Anggota')),
  tingkat_sku text check (tingkat_sku in ('Ramu','Rakit','Terap')),
  jenis_skk text,
  status text default 'Aktif',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists absensi (
  id uuid primary key default gen_random_uuid(),
  penggalang_id uuid references penggalang(id) on delete cascade,
  tanggal date default current_date,
  kegiatan text,
  status text check (status in ('Hadir','Izin','Sakit','Alpha')) default 'Hadir',
  keterangan text,
  created_at timestamptz default now()
);

create table if not exists sku (
  id uuid primary key default gen_random_uuid(),
  penggalang_id uuid references penggalang(id) on delete cascade unique,
  ramu boolean default false,
  rakit boolean default false,
  terap boolean default false,
  updated_at timestamptz default now()
);

create table if not exists skk (
  id uuid primary key default gen_random_uuid(),
  penggalang_id uuid references penggalang(id) on delete cascade,
  nama_skk text not null,
  status text check (status in ('Proses','Lulus')) default 'Proses',
  created_at timestamptz default now()
);

-- RLS
alter table profiles  enable row level security;
alter table penggalang enable row level security;
alter table absensi   enable row level security;
alter table sku       enable row level security;
alter table skk       enable row level security;

create policy "profiles_read"        on profiles  for select using (auth.role() = 'authenticated');
create policy "profiles_update_self" on profiles  for update using (auth.uid() = id);

create policy "penggalang_read"          on penggalang for select using (auth.role() = 'authenticated');
create policy "penggalang_insert_self"   on penggalang for insert with check (auth.uid() = user_id);
create policy "penggalang_update_self"   on penggalang for update using (auth.uid() = user_id);
create policy "penggalang_delete_self"   on penggalang for delete using (auth.uid() = user_id);

create policy "absensi_read"     on absensi for select using (auth.role() = 'authenticated');
create policy "absensi_all_self" on absensi for all using (
  exists (select 1 from penggalang p where p.id = absensi.penggalang_id and p.user_id = auth.uid())
);

create policy "sku_read"     on sku for select using (auth.role() = 'authenticated');
create policy "sku_all_self" on sku for all using (
  exists (select 1 from penggalang p where p.id = sku.penggalang_id and p.user_id = auth.uid())
);

create policy "skk_read"     on skk for select using (auth.role() = 'authenticated');
create policy "skk_all_self" on skk for all using (
  exists (select 1 from penggalang p where p.id = skk.penggalang_id and p.user_id = auth.uid())
);

-- Pembina bisa akses semua
create policy "pembina_all_penggalang" on penggalang for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'pembina')
);
create policy "pembina_all_absensi" on absensi for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'pembina')
);
create policy "pembina_all_sku" on sku for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'pembina')
);
create policy "pembina_all_skk" on skk for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'pembina')
);
