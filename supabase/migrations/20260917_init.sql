-- Groupe NO LIMIT — schema initial

create extension if not exists "pgcrypto";

create type public.role_type as enum ('visitor', 'student', 'admin');
create type public.lead_status as enum ('new', 'contacted', 'converted', 'archived');
create type public.diploma_type as enum ('cqp', 'dqp', 'langue', 'autre');
create type public.content_status as enum ('draft', 'published', 'archived');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role public.role_type not null default 'student',
  created_at timestamptz not null default now()
);

create table public.formation_poles (
  id text primary key,
  slug text unique not null,
  name text not null,
  tagline text,
  description text,
  sort_order int not null default 0,
  is_published boolean not null default true
);

create table public.formations (
  id text primary key,
  pole_id text not null references public.formation_poles(id) on delete restrict,
  slug text unique not null,
  title text not null,
  excerpt text,
  description text,
  diploma public.diploma_type not null default 'cqp',
  duration text not null default '1 an',
  skills text[] not null default '{}',
  outlets text[] not null default '{}',
  content_status text not null default 'title-only',
  is_published boolean not null default true,
  sort_order int not null default 0
);

create table public.actualites (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body text,
  cover_path text,
  published_at timestamptz,
  status public.content_status not null default 'draft'
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  author_role text,
  quote text not null,
  is_approved boolean not null default false,
  sort_order int not null default 0
);

create table public.preinscriptions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  city text,
  birth_date date,
  guardian_name text,
  guardian_phone text,
  formation_id text references public.formations(id),
  diploma_interest text,
  message text,
  consent boolean not null default false,
  status public.lead_status not null default 'new',
  user_id uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status public.lead_status not null default 'new',
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''), 'student');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.formation_poles enable row level security;
alter table public.formations enable row level security;
alter table public.actualites enable row level security;
alter table public.testimonials enable row level security;
alter table public.preinscriptions enable row level security;
alter table public.contacts enable row level security;

create policy "public read poles"
  on public.formation_poles for select
  using (is_published = true or public.is_admin());

create policy "admin write poles"
  on public.formation_poles for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "public read formations"
  on public.formations for select
  using (is_published = true or public.is_admin());

create policy "admin write formations"
  on public.formations for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "public read actualites"
  on public.actualites for select
  using (status = 'published' or public.is_admin());

create policy "admin write actualites"
  on public.actualites for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "public read testimonials"
  on public.testimonials for select
  using (is_approved = true or public.is_admin());

create policy "admin write testimonials"
  on public.testimonials for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "anon insert preinscriptions"
  on public.preinscriptions for insert
  with check (consent = true);

create policy "own read preinscriptions"
  on public.preinscriptions for select
  using (auth.uid() = user_id or public.is_admin());

create policy "admin write preinscriptions"
  on public.preinscriptions for update
  using (public.is_admin());

create policy "anon insert contacts"
  on public.contacts for insert
  with check (true);

create policy "admin read contacts"
  on public.contacts for select
  using (public.is_admin());

create policy "admin write contacts"
  on public.contacts for update
  using (public.is_admin());

create policy "own profile"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id and role = (select role from public.profiles where id = auth.uid()));

create policy "admin profiles"
  on public.profiles for all
  using (public.is_admin())
  with check (public.is_admin());
