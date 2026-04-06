-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique not null,
  role text not null check (role in ('creator', 'clipper', 'admin')),
  status text not null default 'active' check (status in ('active', 'pending', 'suspended')),
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) for profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- 2. Campaigns Table
create table public.campaigns (
  id uuid default uuid_generate_v4() primary key,
  creator_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  niche text not null,
  content_link text not null,
  description text not null,
  cpm numeric not null default 0,
  budget numeric not null default 0,
  spent numeric not null default 0,
  status text not null default 'pending' check (status in ('pending', 'active', 'paused', 'completed', 'rejected')),
  max_clippers integer,
  max_payout_per_clipper numeric,
  impressions integer not null default 0,
  duration_days integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.campaigns enable row level security;
create policy "Campaigns are viewable by everyone." on public.campaigns for select using (true);
create policy "Creators can create campaigns." on public.campaigns for insert with check (auth.uid() = creator_id);
create policy "Creators can update own campaigns." on public.campaigns for update using (auth.uid() = creator_id);

-- 3. Accepted Offers (Tracking which clipper joined which campaign)
create table public.accepted_offers (
  id uuid default uuid_generate_v4() primary key,
  clipper_id uuid references public.profiles(id) on delete cascade not null,
  campaign_id uuid references public.campaigns(id) on delete cascade not null,
  status text not null default 'active' check (status in ('active', 'completed', 'abandoned')),
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(clipper_id, campaign_id)
);

alter table public.accepted_offers enable row level security;
create policy "Accepted offers viewable by participants." on public.accepted_offers for select using (true);
create policy "Clippers can accept offers." on public.accepted_offers for insert with check (auth.uid() = clipper_id);
create policy "Clippers can update own offers." on public.accepted_offers for update using (auth.uid() = clipper_id);

-- 4. Clip Submissions
create table public.clip_submissions (
  id uuid default uuid_generate_v4() primary key,
  clipper_id uuid references public.profiles(id) on delete cascade not null,
  campaign_id uuid references public.campaigns(id) on delete cascade not null,
  post_link text not null,
  platform text not null,
  impressions integer not null default 0,
  earnings numeric not null default 0,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  submitted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.clip_submissions enable row level security;
create policy "Submissions are viewable by owner and campaign creator." on public.clip_submissions for select using (true);
create policy "Clippers can submit clips." on public.clip_submissions for insert with check (auth.uid() = clipper_id);
create policy "Clippers can update own pending submissions." on public.clip_submissions for update using (auth.uid() = clipper_id and status = 'pending');

-- 5. Transactions
create table public.transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null check (type in ('deposit', 'withdrawal', 'escrow_release', 'refund', 'payout')),
  amount numeric not null,
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed')),
  description text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.transactions enable row level security;
create policy "Users can view own transactions." on public.transactions for select using (auth.uid() = user_id);

-- Storage bucket for campaign media
insert into storage.buckets (id, name, public) values ('campaign-media', 'campaign-media', true) on conflict (id) do nothing;
create policy "Anyone can read campaign media" on storage.objects for select using (bucket_id = 'campaign-media');
create policy "Authenticated users can upload campaign media" on storage.objects for insert with check (bucket_id = 'campaign-media' and auth.role() = 'authenticated');


-- Create a trigger to automatically create a profile for new users
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, role, status)
  values (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'role', 'pending');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 6. Helper function to easily check if the current user is an admin
create or replace function public.is_admin() 
returns boolean as $`$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$`$ language plpgsql security definer;

-- Admin policies
create policy "Admins can update any campaign." on public.campaigns for update using (public.is_admin());
create policy "Admins can update any profile." on public.profiles for update using (public.is_admin());
