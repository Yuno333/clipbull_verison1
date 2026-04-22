-- Rename role value from clipper -> earner
update public.profiles
set role = 'earner'
where role = 'clipper';

-- Replace role check constraint to include earner
alter table public.profiles
drop constraint if exists profiles_role_check;

alter table public.profiles
add constraint profiles_role_check
check (role in ('creator', 'earner', 'admin'));
