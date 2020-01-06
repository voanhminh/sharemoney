CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- providers

INSERT INTO public.providers(
	id, name, "created_at", "updated_at", "country_code")
	VALUES (uuid_generate_v4(), 'youtube', now(), now(), 1);
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO public.providers(
	id, name, "created_at", "updated_at", "country_code")
	VALUES (uuid_generate_v4(), 'facebook', now(), now(), 1);    

INSERT INTO public.providers(
	id, name, "created_at", "updated_at", "country_code")
	VALUES (uuid_generate_v4(), 'twitter', now(), now(), 1);

INSERT INTO public.providers(
	id, name, "created_at", "updated_at", "country_code")
	VALUES (uuid_generate_v4(), 'tiki', now(), now(), 84);

--end providers


--users

INSERT INTO public.users(
	id, firstname, lastname, created_at, updated_at, country_code, member_level, bank_account_name, bank_account_number, bank_account_address, bank_name, bank_address)
	VALUES (uuid_generate_v4(), 
			'Minh', 'Vo', now(), now(), 84, 'Diamond', 'VO ANH MINH', 123456789, 'Phu Huu, Nho Trach Dong Nai', 'ACB', 'Nguyen Thi Dinh, Q2, HCM, Vietnam');
			
			INSERT INTO public.users(
	id, firstname, lastname, created_at, updated_at, country_code, member_level, bank_account_name, bank_account_number, bank_account_address, bank_name, bank_address)
	VALUES (uuid_generate_v4(), 
			'Chi', 'Nguyen', now(), now(), 84, 'Diamond', 'NGUYEN QUOC CHI', 123456789, 'Quan 9, HCM, Vietnam', 'ACB', 'Nguyen Thi Dinh, Q2, HCM, Vietnam');

--end users


-- contents
INSERT INTO public.contents(
	id, user_id, provider_id, url, title, description, action_type, monthly_income_estimation, currency, created_at, updated_at, available)
	VALUES ( 
		uuid_generate_v4(), 
		(select id from public.users limit 1 offset 0), 
		(select id from public.providers limit 1 offset 0),
		'https://www.youtube.com/watch?v=9SZA5yVJbhI', 
		'review sach', 
		'review sach rung ram cua be vua moi mua', 
		'view', 
		1000000, 
		'vnd', now(), now(), true);
--end contents        

-- users_income_monthly_overview
INSERT INTO public.users_income_monthly_overview(
	id, user_id, created_at, updated_at, log_type, provider_id, 
	year, month, monthly_view_count, monthly_comment_count, 
	monthly_click_count, monthly_subcribe_count, monthly_time_comsuming_minutes, 
	monthly_income, monthly_income_status, currency)
	VALUES (uuid_generate_v4(), 
			(select id from public.users limit 1 offset 1), 
			now(),
			now(), 
			'monthly_overview', 
			(select id from public.providers limit 1 offset 0), 
			2019, 12, 10000, 1000, 2000, 10, 14400, 3000000, 'transfered_to_bank_count', 'vnd');

-- end users_income_monthly_overview