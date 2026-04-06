-- 1. Create a helper function to easily check if the current user is an admin
create or replace function public.is_admin() 
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- 2. Add an Admin policy for the Campaigns table (allows approval)
create policy "Admins can update any campaign." 
on public.campaigns 
for update using (public.is_admin());

create policy "Admins can delete any campaign." 
on public.campaigns 
for delete using (public.is_admin());

-- 3. Add an Admin policy for the Profiles table (allows suspending users)
create policy "Admins can update any profile." 
on public.profiles 
for update using (public.is_admin());
