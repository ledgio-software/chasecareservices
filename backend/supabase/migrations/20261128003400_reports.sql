-- =============================================================================
-- Reports & analytics [dashboard spec §3.15].
--
-- report_stats(from, to) returns counts for a date range as one JSON object:
-- care requests (by type, country, month), care (visits, report rate, concerns,
-- incidents), recruitment funnel, Academy, community events, newsletter, worker
-- documents and (for the wellbeing team only) wellbeing request counts.
-- Only totals: no names or details. Requires reports.view.
-- =============================================================================

create function public.report_stats(from_date date, to_date date)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  f timestamptz := from_date::timestamptz;
  t timestamptz := (to_date + 1)::timestamptz;   -- to_date is inclusive
  today date := (now() at time zone 'UTC')::date;
  result jsonb;
begin
  if not public.has_permission('reports.view') then
    raise exception 'Reports are for staff with Reports access' using errcode = '42501';
  end if;
  if to_date < from_date or to_date - from_date > 731 then
    raise exception 'Choose a date range of up to two years' using errcode = '22023';
  end if;

  result := jsonb_build_object(
    'range', jsonb_build_object('from', from_date, 'to', to_date),

    'enquiries', (
      select jsonb_build_object(
        'total', count(*),
        'converted', count(*) filter (where e.status = 'converted'),
        'from_abroad', count(*) filter (where e.country is not null and lower(e.country) not in ('ghana', 'gh')),
        'by_type', coalesce((select jsonb_agg(jsonb_build_object('key', k, 'n', n) order by n desc)
                    from (select x.enquiry_type::text k, count(*) n from public.enquiries x where x.created_at >= f and x.created_at < t group by 1) s), '[]'),
        'by_country', coalesce((select jsonb_agg(jsonb_build_object('key', k, 'n', n) order by n desc)
                    from (select coalesce(nullif(initcap(trim(x.country)), ''), 'Not given') k, count(*) n
                          from public.enquiries x where x.created_at >= f and x.created_at < t group by 1 order by 2 desc limit 12) s), '[]'),
        'by_month', coalesce((select jsonb_agg(jsonb_build_object('key', k, 'n', n) order by k)
                    from (select to_char(date_trunc('month', x.created_at at time zone 'UTC'), 'YYYY-MM') k, count(*) n
                          from public.enquiries x where x.created_at >= f and x.created_at < t group by 1) s), '[]')
      )
      from public.enquiries e where e.created_at >= f and e.created_at < t
    ),

    'care', jsonb_build_object(
      'active_clients', (select count(*) from public.care_clients where is_active),
      'visits', (select count(*) from public.care_shift_status s where s.shift_date between from_date and least(to_date, today) and s.visit_status <> 'cancelled'),
      'visits_done', (select count(*) from public.care_shift_status s where s.shift_date between from_date and least(to_date, today) and s.visit_status = 'done'),
      'visits_missed', (select count(*) from public.care_shift_status s where s.shift_date between from_date and least(to_date, today) and s.visit_status = 'missed'),
      'reports', (select count(*) from public.care_reports r where r.visit_date between from_date and to_date),
      'reports_with_concern', (select count(*) from public.care_reports r where r.visit_date between from_date and to_date and r.concern_level <> 'none'),
      'incidents', coalesce((select jsonb_agg(jsonb_build_object('key', k, 'n', n))
                    from (select i.severity k, count(*) n from public.care_incidents i where i.occurred_at >= f and i.occurred_at < t group by 1) s), '[]'),
      'visits_by_month', coalesce((select jsonb_agg(jsonb_build_object('key', k, 'n', n, 'done', d) order by k)
                    from (select to_char(date_trunc('month', s.shift_date), 'YYYY-MM') k, count(*) n, count(*) filter (where s.visit_status = 'done') d
                          from public.care_shift_status s
                          where s.shift_date between from_date and least(to_date, today) and s.visit_status <> 'cancelled' group by 1) s), '[]')
    ),

    'recruitment', jsonb_build_object(
      'new_applicants', (select count(*) from public.recruitment_applicants a where a.created_at >= f and a.created_at < t),
      'placed', (select count(*) from public.recruitment_applicants a where a.stage in ('placed', 'support') and a.stage_changed_at >= f and a.stage_changed_at < t),
      'by_stage', coalesce((select jsonb_agg(jsonb_build_object('key', k, 'n', n))
                    from (select a.stage k, count(*) n from public.recruitment_applicants a where a.created_at < t group by 1) s), '[]')
    ),

    'academy', jsonb_build_object(
      'enrolments', (select count(*) from public.course_enrolments e where e.enrolled_at >= f and e.enrolled_at < t),
      'completions', (select count(*) from public.course_enrolments e where e.completed_at >= f and e.completed_at < t),
      'certificates', (select count(*) from public.certificates c where c.issued_at >= f and c.issued_at < t and c.revoked_at is null),
      'cpd_hours', (select coalesce(sum(c.cpd_hours), 0) from public.certificates c where c.issued_at >= f and c.issued_at < t and c.revoked_at is null),
      'by_course', coalesce((select jsonb_agg(jsonb_build_object('key', k, 'n', n, 'done', d) order by n desc)
                    from (select c.title k, count(*) n, count(*) filter (where e.status = 'completed') d
                          from public.course_enrolments e join public.courses c on c.id = e.course_id
                          where e.enrolled_at >= f and e.enrolled_at < t group by 1 order by 2 desc limit 10) s), '[]')
    ),

    'community', (
      select jsonb_build_object(
        'events', count(distinct ev.id),
        'registrations', count(r.id) filter (where r.status <> 'cancelled'),
        'attended', count(r.id) filter (where r.status = 'attended'),
        'marked', count(r.id) filter (where r.status in ('attended', 'no_show'))
      )
      from public.community_events ev
      left join public.event_registrations r on r.event_id = ev.id
      where ev.starts_at >= f and ev.starts_at < t and ev.status = 'published'
    ),

    'newsletter', jsonb_build_object(
      'subscribers', (select count(*) from public.newsletter_subscribers where status = 'subscribed'),
      'new', (select count(*) from public.newsletter_subscribers where status = 'subscribed' and confirmed_at >= f and confirmed_at < t)
    ),

    'documents', (select to_jsonb(c) from public.credential_counts() c),

    'wellbeing', case when public.has_permission('wellbeing.view') then (
      select jsonb_build_object(
        'requests', count(*),
        'by_kind', coalesce((select jsonb_agg(jsonb_build_object('key', k, 'n', n) order by n desc)
                    from (select w.kind k, count(*) n from public.wellbeing_requests w where w.created_at >= f and w.created_at < t group by 1) s), '[]')
      )
      from public.wellbeing_requests w where w.created_at >= f and w.created_at < t
    ) end
  );
  return result;
end;
$$;
comment on function public.report_stats(date, date) is 'Totals for the Reports page (no personal details). Requires reports.view.';

revoke all on function public.report_stats(date, date) from public, anon;
grant execute on function public.report_stats(date, date) to authenticated;
