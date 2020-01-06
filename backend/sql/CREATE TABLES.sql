
CREATE TABLE "users_settings" (
  "id" uuid PRIMARY KEY,
  "user_id" varchar,
  "created_at" timestamp,
  "updated_at" timestamp,
  "auto_replay" boolean,
  "layout_display_items" varchar,
  "image_url" varchar
);

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY,
  "firstname" varchar,
  "lastname" varchar,
  "created_at" timestamp,
  "updated_at" timestamp,
  "country_code" int,
  "member_level" varchar,
  "bank_account_name" varchar,
  "bank_account_number" varchar,
  "bank_account_address" varchar,
  "bank_name" varchar,
  "bank_address" varchar
);

CREATE TABLE "providers" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "country_code" int,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "providers_comissions" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "provider_id" varchar,
  "action_type" varchar,
  "comission_percent" float,
  "comission_rule" varchar,
  "currency" varchar
);

CREATE TABLE "contents" (
  "id" uuid PRIMARY KEY,
  "user_id" varchar,
  "provider_id" varchar,
  "url" varchar,
  "title" varchar,
  "description" varchar,
  "action_type" varchar,
  "monthly_income_estimation" float,
  "currency" varchar,
  "created_at" timestamp,
  "updated_at" timestamp,
  "available" boolean
);

CREATE TABLE "users_income_monthly_overview" (
  "id" uuid PRIMARY KEY,
  "user_id" varchar,
  "created_at" timestamp,
  "updated_at" timestamp,
  "log_type" varchar,
  "provider_id" varchar,
  "year" integer,
  "month" integer,
  "monthly_view_count" bigint,
  "monthly_comment_count" bigint,
  "monthly_click_count" bigint,
  "monthly_subcribe_count" bigint,
  "monthly_time_comsuming_minutes" bigint,
  "monthly_income" float,
  "monthly_income_status" varchar,
  "currency" varchar
);

CREATE TABLE "customers" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "country_code" int,
  "address" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "customers_contents" (
  "id" uuid PRIMARY KEY,
  "customer_id" varchar,
  "provider_id" varchar,
  "content_id" varchar,
  "action_type" varchar,
  "comission_percent" float,
  "comission_rule" varchar,
  "currency" varchar
);

CREATE TABLE "users_contents" (
  "id" uuid PRIMARY KEY,
  "user_id" varchar,
  "content_id" varchar,
  "action_status" varchar,
  "action_status_notes" varchar,
  "action_value" integer,
  "action_type" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "countries" (
  "code" int PRIMARY KEY,
  "name" varchar,
  "continent_name" varchar
);
