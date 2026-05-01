-- Run this script in your Supabase SQL Editor to update the user creation trigger.
-- It ensures that 'aganyawiseman@gmail.com' is automatically assigned the 'admin' role upon signup.

create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    CASE 
      WHEN new.email = 'aganyawiseman@gmail.com' THEN 'admin' 
      ELSE 'customer' 
    END
  );
  return new;
end;
$$ language plpgsql security definer;
