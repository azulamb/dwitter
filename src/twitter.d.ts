// v1.1

export interface AccessToken
{
	oauth_token: string;
	oauth_token_secret: string;
	user_id: string;
	screen_name: string;
}

export interface TwitterURL
{
	url: string;
	expanded_url: string;
	display_url: string;
	indices: number[];
}

export type TranslatorType = 'none';

export type Lang = string | null;

export interface UserEntities
{
	url:
	{
		urls: TwitterURL[];
	};
	description:
	{
		urls: TwitterURL[];
	};
}

export interface UserStatus
{
	created_at: string;
	id: number;
	id_str: string;
	text: string;
	truncated: boolean;
	entities: { hashtags: [], symbols: [], user_mentions: [], urls: [] };
	source: string;
	in_reply_to_status_id: null | number;
	in_reply_to_status_id_str: null | string;
	in_reply_to_user_id: null | number;
	in_reply_to_user_id_str: null | string;
	in_reply_to_screen_name: null | string;
	geo: null;
	coordinates: null;
	place: null;
	contributors: null;
	is_quote_status: boolean;
	retweet_count: number;
	favorite_count: number;
	favorited: boolean;
	retweeted: boolean;
	lang: string;
}

export interface User
{
	id: number;
	id_str: string;
	name: string;
	screen_name: string;
	location: string;
	profile_location: string | null;
	description: string;
	url: string,
	entities: UserEntities;
	protected: boolean;
	followers_count: number;
	friends_count: number;
	listed_count: number;
	created_at: string;
	favourites_count: number;
	utc_offset: null;
	time_zone: null;
	geo_enabled: boolean;
	verified: boolean;
	statuses_count: number;
	lang: Lang;
	status: UserStatus,
	contributors_enabled: boolean;
	is_translator: boolean;
	is_translation_enabled: boolean;
	profile_background_color: string;
	profile_background_image_url: string;
	profile_background_image_url_https: string;
	profile_background_tile: boolean;
	profile_image_url: string;
	profile_image_url_https: string;
	profile_banner_url: string;
	profile_link_color: string;
	profile_sidebar_border_color: string;
	profile_sidebar_fill_color: string;
	profile_text_color: string;
	profile_use_background_image: boolean;
	has_extended_profile: boolean;
	default_profile: boolean;
	default_profile_image: boolean;
	following: boolean;
	follow_request_sent: boolean;
	notifications: boolean;
	translator_type: TranslatorType;
	withheld_in_countries: [];
	suspended: boolean;
	needs_phone_verification: boolean;
}

export interface Entities
{
	hashtags: string[];
	symbols: string[];
	user_mentions: [];
	urls: TwitterURL[];
}

export interface Tweet
{
	created_at: string;
	id: number;
	id_str: string;
	text: string;
	truncated: boolean;
	entities: Entities;
	source: string;
	in_reply_to_status_id: number | null;
	in_reply_to_status_id_str: string | null;
	in_reply_to_user_id: number | null;
	in_reply_to_user_id_str: string | null;
	in_reply_to_screen_name: string | null;
	user: User;
	geo: null;
	coordinates: null;
	place: null;
	contributors: null;
	is_quote_status: boolean;
	retweet_count: number;
	favorite_count: number;
	favorited: boolean;
	retweeted: boolean;
	possibly_sensitive?: boolean;
	possibly_sensitive_appealable?: boolean;
	lang: Lang;
}

// v2.0

export interface BearerToken
{
	token_type: 'bearer';
	access_token: string;
}

export interface InvalidateBearerToken
{
	access_token: string;
}

export type TweetFields = 'id' |
	'text' |
	'attachments' |
	'author_id' |
	'context_annotations' |
	'created_at' |
	'entities' |
	'geo' |
	'in_reply_to_user_id' |
	'lang' |
	'non_public_metrics' |
	'organic_metrics' |
	'possibly_sensitive' |
	'promoted_metrics' |
	'public_metrics' |
	'referenced_tweets' |
	'reply_settings' |
	'source' |
	'withheld';

export type UserFields = 'id' |
	'name' |
	'username' |
	'created_at' |
	'description' |
	'entities' |
	'location' |
	'pinned_tweet_id' |
	'profile_image_url' |
	'protected' |
	'public_metrics' |
	'url' |
	'verified' |
	'withheld';

export type MediaFields = 'media_key' |
	'type' |
	'duration_ms' |
	'height' |
	'non_public_metrics' |
	'organic_metrics' |
	'preview_image_url' |
	'promoted_metrics' |
	'public_metrics' |
	'width' |
	'alt_text';

export type PollFields = 'id' |
	'options' |
	'duration_minutes' |
	'end_datetime' |
	'voting_status';

export type PlaceFields = 'full_name' |
	'id' |
	'contained_within' |
	'country' |
	'country_code' |
	'geo' |
	'name' |
	'place_type';

export type ExpansionsField = 'author_id' |
	'referenced_tweets.id' |
	'in_reply_to_user_id' |
	'attachments.media_keys' |
	'attachments.poll_ids' |
	'geo.place_id' |
	'entities.mentions.username' |
	'referenced_tweets.id.author_id' |
	'pinned_tweet_id';

export interface V2Params
{
	expansions?: ExpansionsField[];
	media?: MediaFields[];
	place?: PlaceFields[];
	poll?: PollFields[];
	tweet?: TweetFields[];
	user?: UserFields[];
}
