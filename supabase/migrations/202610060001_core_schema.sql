begin;

create extension if not exists pgcrypto;

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  category text not null default 'Notes',
  title text not null,
  description text not null default '',
  content text not null default '',
  date date not null default current_date,
  color text not null default 'cyan' check (color in ('blue', 'cyan', 'purple', 'green', 'orange', 'pink')),
  published boolean not null default false,
  author text,
  tags text[] not null default '{}',
  created_at timestamptz not null default timezone('utc', now()),
  last_modified timestamptz not null default timezone('utc', now())
);

create index if not exists documents_published_created_at_idx
  on public.documents (published, created_at desc);

create table if not exists public.me_config (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.spotify_tokens (
  id uuid primary key default gen_random_uuid(),
  access_token text not null,
  refresh_token text not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.spotify_history (
  id uuid primary key default gen_random_uuid(),
  song_name text not null,
  artist text not null,
  cover_url text,
  played_at timestamptz not null default timezone('utc', now()),
  unique (song_name, artist)
);

create index if not exists spotify_history_played_at_idx
  on public.spotify_history (played_at desc);

create table if not exists public.spotify_status (
  id smallint primary key default 1 check (id = 1),
  is_playing boolean not null default false,
  title text,
  artist text,
  album text,
  album_image_url text,
  song_url text,
  progress_ms integer,
  duration_ms integer,
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.documents enable row level security;
alter table public.me_config enable row level security;
alter table public.spotify_tokens enable row level security;
alter table public.spotify_history enable row level security;
alter table public.spotify_status enable row level security;

revoke insert, update, delete, truncate, references, trigger
  on table public.documents, public.me_config, public.spotify_tokens, public.spotify_history, public.spotify_status
  from public, anon, authenticated;

grant select on table public.documents, public.me_config, public.spotify_status
  to anon, authenticated;

drop policy if exists "documents_public_read" on public.documents;
create policy "documents_public_read"
  on public.documents for select to anon, authenticated
  using (published = true);

drop policy if exists "me_config_public_read" on public.me_config;
create policy "me_config_public_read"
  on public.me_config for select to anon, authenticated
  using (true);

insert into public.spotify_status (id, is_playing)
values (1, false)
on conflict (id) do nothing;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'spotify_status'
  ) then
    alter publication supabase_realtime add table public.spotify_status;
  end if;
end $$;

commit;
