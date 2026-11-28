-- Reports: totals only, for staff with Reports access.
begin;
create extension if not exists pgtap with schema extensions;
select plan(7);

insert into auth.users (id, email) values
  ('00000000-0000-0000-0000-0000000000a1', 'ops@rep.test'),
  ('00000000-0000-0000-0000-0000000000a2', 'editor@rep.test'),
  ('00000000-0000-0000-0000-0000000000a3', 'owner@rep.test');
insert into public.user_roles (user_id, role_key) values
  ('00000000-0000-0000-0000-0000000000a1', 'operations_manager'),
  ('00000000-0000-0000-0000-0000000000a2', 'content_editor'),
  ('00000000-0000-0000-0000-0000000000a3', 'super_admin');
update private.security_settings set require_staff_mfa = true;
select public.submit_enquiry('care_request', 'Report Test', true, 'rt@example.com', null, 'United Kingdom');

set local role authenticated;
set local request.jwt.claims to '{"sub": "00000000-0000-0000-0000-0000000000a1", "role": "authenticated", "aal": "aal2"}';
select ok((public.report_stats(current_date - 30, current_date) -> 'enquiries' ->> 'total')::int >= 1, 'the operations manager sees enquiry totals');
select ok((public.report_stats(current_date - 30, current_date) -> 'enquiries' ->> 'from_abroad')::int >= 1, 'including those from abroad');
select is(public.report_stats(current_date - 30, current_date) -> 'wellbeing', 'null'::jsonb, 'but not wellbeing counts');
select throws_ok($$ select public.report_stats(current_date, current_date - 1) $$, '22023', null, 'a backwards range is refused');

set local request.jwt.claims to '{"sub": "00000000-0000-0000-0000-0000000000a3", "role": "authenticated", "aal": "aal2"}';
select isnt(public.report_stats(current_date - 30, current_date) -> 'wellbeing', 'null'::jsonb, 'the owner sees wellbeing counts');
select ok(not (public.report_stats(current_date - 30, current_date)::text ~* 'rt@example.com|Report Test'), 'no names or emails in the report');

set local request.jwt.claims to '{"sub": "00000000-0000-0000-0000-0000000000a2", "role": "authenticated", "aal": "aal2"}';
select throws_ok($$ select public.report_stats(current_date - 30, current_date) $$, '42501', null, 'content editors cannot see reports');

select * from finish();
rollback;
