-- Update handle_new_user to make nicodevnico@gmail.com an admin by default
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id, 
    coalesce(new.raw_user_meta_data->>'full_name', ''), 
    case when new.email = 'nicodevnico@gmail.com' then 'admin'::public.role_type else 'student'::public.role_type end
  );
  return new;
end;
$$;

-- Update existing user if they already signed up
UPDATE public.profiles
SET role = 'admin'
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'nicodevnico@gmail.com'
);
