# dwitter

Twitter library for Deno.

## Sample

### Import

```
import { Twitter } from 'https://raw.githubusercontent.com/Azulamb/dwitter/main/mod.ts'

const twitter = new Twitter(
	TWITTER_API_KEY,
	TWITTER_API_KEY_SECRET
);

// If exists access token.
//twitter.oauth.setAccessToken( TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET );
```

### Get access token.

```
twitter.oauth.request_token( { oauth_callback: 'http://localhost/' } ).then( ( url ) =>
{
	console.log( url );
	// https://api.twitter.com/oauth/authorize?oauth_token=XXXXXXXX&oauth_token_secret=XXXXXXXX&oauth_callback_confirmed=true
});
```

Access to url.

You can get `oauth_token` and `oauth_verifier` in callback param.

```
http://localhost/?oauth_token=XXXXXXXX&oauth_verifier=XXXXXXXX
```

```
twitter.oauth.access_token( 'oauth_token=XXXXXXXX&oauth_verifier=XXXXXXXX' ).then( ( result ) =>
{
	console.log( token );
	// { oauth_token: "00000000-XXXXXXXX", oauth_token_secret: "XXXXXXXX", user_id: "00000000", screen_name: "XXXXXXXX" }

	// Set access token.
	twitter.oauth.setAccessToken( result.oauth_token, result.oauth_token_secret );
});
```

### Use API

```
// After twitter.oauth.setAccessToken()
twitter.v1_1.statuses.home_timeline().then( ( result ) =>
{
	console.log( result );
} );
```

## API list

* POST statuses/update
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-update
* POST statuses/destroy/:id
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-destroy-id
* **GET statuses/show/:id**
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/get-statuses-show-id
* GET statuses/oembed
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/get-statuses-oembed
* GET statuses/lookup
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/get-statuses-lookup
* POST statuses/retweet/:id
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-retweet-id
* POST statuses/unretweet/:id
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-unretweet-id
* GET statuses/retweets/:id
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/get-statuses-retweets-id
* GET statuses/retweets_of_me
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/get-statuses-retweets_of_me
* GET statuses/retweeters/ids
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/get-statuses-retweeters-ids
* POST favorites/create
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-favorites-create
* POST favorites/destroy
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-favorites-destroy
* GET favorites/list
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/get-favorites-list
* ~~POST statuses/update_with_media~~
* **GET statuses/home_timeline**
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/api-reference/get-statuses-home_timeline
* GET statuses/mentions_timeline
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/api-reference/get-statuses-mentions_timeline
* GET statuses/user_timeline
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/api-reference/get-statuses-user_timeline
* GET statuses/user_mentions
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/api-reference/get-statuses-mentions_timeline
* GET collections/entries
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/curate-a-collection/api-reference/get-collections-entries
* GET collections/list
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/curate-a-collection/api-reference/get-collections-list
* GET collections/show
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/curate-a-collection/api-reference/get-collections-show
* POST collections/create
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/curate-a-collection/api-reference/post-collections-create
* POST collections/destroy
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/curate-a-collection/api-reference/post-collections-destroy
* POST collections/entries/add
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/curate-a-collection/api-reference/post-collections-entries-add
* POST collections/entries/curate
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/curate-a-collection/api-reference/post-collections-entries-curate
* POST collections/entries/move
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/curate-a-collection/api-reference/post-collections-entries-move
* POST collections/entries/remove
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/curate-a-collection/api-reference/post-collections-entries-remove
* POST collections/update
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/curate-a-collection/api-reference/post-collections-update
* search/tweets
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/search/api-reference/get-search-tweets
* POST statuses/filter
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/filter-realtime/api-reference/post-statuses-filter
* statuses/sample
  * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/sample-realtime/api-reference/get-statuses-sample
* GET account/settings
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/manage-account-settings/api-reference/get-account-settings
* GET account/verify_credentials
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/manage-account-settings/api-reference/get-account-verify_credentials
* GET users/profile_banner
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/manage-account-settings/api-reference/get-users-profile_banner
* POST account/remove_profile_banner
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/manage-account-settings/api-reference/post-account-remove_profile_banner
* POST account/settings
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/manage-account-settings/api-reference/post-account-settings
* POST account/update_profile
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/manage-account-settings/api-reference/post-account-update_profile
* POST account/update_profile_banner
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/manage-account-settings/api-reference/post-account-update_profile_banner
* POST account/update_profile_image
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/manage-account-settings/api-reference/post-account-update_profile_image
* GET saved_searches/list
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/manage-account-settings/api-reference/get-saved_searches-list
* GET saved_searches/show/:id
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/manage-account-settings/api-reference/get-saved_searches-show-id
* POST saved_searches/create
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/manage-account-settings/api-reference/post-saved_searches-create
* POST saved_searches/destroy/:id
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/manage-account-settings/api-reference/post-saved_searches-destroy-id
* GET blocks/ids
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/mute-block-report-users/api-reference/get-blocks-ids
* GET blocks/list
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/mute-block-report-users/api-reference/get-blocks-list
* GET mutes/users/ids
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/mute-block-report-users/api-reference/get-mutes-users-ids
* GET mutes/users/list
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/mute-block-report-users/api-reference/get-mutes-users-list
* POST blocks/create
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/mute-block-report-users/api-reference/post-blocks-create
* POST blocks/destroy
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/mute-block-report-users/api-reference/post-blocks-destroy
* POST mutes/users/create
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/mute-block-report-users/api-reference/post-mutes-users-create
* POST mutes/users/destroy
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/mute-block-report-users/api-reference/post-mutes-users-destroy
* POST users/report_spam
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/mute-block-report-users/api-reference/post-users-report_spam
* GET followers/ids
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/get-followers-ids
* GET followers/list
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/get-followers-list
* GET friends/ids
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/get-friends-ids
* GET friends/list
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/get-friends-list
* GET friendships/incoming
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/get-friendships-incoming
* GET friendships/lookup
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/get-friendships-lookup
* GET friendships/no_retweets/ids
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/get-friendships-no_retweets-ids
* GET friendships/outgoing
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/get-friendships-outgoing
* GET friendships/show
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/get-friendships-show
* GET users/lookup
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/get-users-lookup
* GET users/search
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/get-users-search
* **GET users/show**
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/get-users-show
* POST friendships/create
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/post-friendships-create
* POST friendships/destroy
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/post-friendships-destroy
* POST friendships/update
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/post-friendships-update
* GET lists/list
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/create-manage-lists/api-reference/get-lists-list
* GET lists/members
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/create-manage-lists/api-reference/get-lists-members
* GET lists/members/show
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/create-manage-lists/api-reference/get-lists-members-show
* GET lists/memberships
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/create-manage-lists/api-reference/get-lists-memberships
* GET lists/ownerships
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/create-manage-lists/api-reference/get-lists-ownerships
* GET lists/show
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/create-manage-lists/api-reference/get-lists-show
* GET lists/statuses
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/create-manage-lists/api-reference/get-lists-statuses
* GET lists/subscribers
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/create-manage-lists/api-reference/get-lists-subscribers
* GET lists/subscribers/show
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/create-manage-lists/api-reference/get-lists-subscribers-show
* GET lists/subscriptions
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/create-manage-lists/api-reference/get-lists-subscriptions
* POST lists/create
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/create-manage-lists/api-reference/post-lists-create
* POST lists/destroy
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/create-manage-lists/api-reference/post-lists-destroy
* POST lists/members/create
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/create-manage-lists/api-reference/post-lists-members-create
* POST lists/members/create_all
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/create-manage-lists/api-reference/post-lists-members-create_all
* POST lists/members/destroy
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/create-manage-lists/api-reference/post-lists-members-destroy
* POST lists/members/destroy_all
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/create-manage-lists/api-reference/post-lists-members-destroy_all
* POST lists/subscribers/create
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/create-manage-lists/api-reference/post-lists-subscribers-create
* POST lists/subscribers/destroy
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/create-manage-lists/api-reference/post-lists-subscribers-destroy
* POST lists/update
  * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/create-manage-lists/api-reference/post-lists-update
* POST direct_messages/events/new (message_create)
  * https://developer.twitter.com/en/docs/twitter-api/v1/direct-messages/sending-and-receiving/api-reference/new-event
* GET direct_messages/events/show
  * https://developer.twitter.com/en/docs/twitter-api/v1/direct-messages/sending-and-receiving/api-reference/get-event
* GET direct_messages/events/list
  * https://developer.twitter.com/en/docs/twitter-api/v1/direct-messages/sending-and-receiving/api-reference/list-events
* DELETE direct_messages/events/destroy
  * https://developer.twitter.com/en/docs/twitter-api/v1/direct-messages/sending-and-receiving/api-reference/delete-message-event
* DELETE direct_messages/welcome_messages/destroy
  * https://developer.twitter.com/en/docs/twitter-api/v1/direct-messages/welcome-messages/api-reference/delete-welcome-message
* DELETE direct_messages/welcome_messages/rules/destroy
  * https://developer.twitter.com/en/docs/twitter-api/v1/direct-messages/welcome-messages/api-reference/delete-welcome-message-rule
* GET direct_messages/welcome_messages/show
  * https://developer.twitter.com/en/docs/twitter-api/v1/direct-messages/welcome-messages/api-reference/get-welcome-message
* GET direct_messages/welcome_messages/rules/show
  * https://developer.twitter.com/en/docs/twitter-api/v1/direct-messages/welcome-messages/api-reference/get-welcome-message-rule
* GET direct_messages/welcome_messages/rules/list
  * https://developer.twitter.com/en/docs/twitter-api/v1/direct-messages/welcome-messages/api-reference/list-welcome-message-rules
* GET direct_messages/welcome_messages/list
  * https://developer.twitter.com/en/docs/twitter-api/v1/direct-messages/welcome-messages/api-reference/list-welcome-messages
* POST direct_messages/welcome_messages/new
  * https://developer.twitter.com/en/docs/twitter-api/v1/direct-messages/welcome-messages/api-reference/new-welcome-message
* POST direct_messages/welcome_messages/rules/new
  * https://developer.twitter.com/en/docs/twitter-api/v1/direct-messages/welcome-messages/api-reference/new-welcome-message-rule
* PUT direct_messages/welcome_messages/update
  * https://developer.twitter.com/en/docs/twitter-api/v1/direct-messages/welcome-messages/api-reference/update-welcome-message
* POST direct_messages/mark_read
  * https://developer.twitter.com/en/docs/twitter-api/v1/direct-messages/typing-indicator-and-read-receipts/api-reference/new-read-receipt
* POST direct_messages/indicate_typing
  * https://developer.twitter.com/en/docs/twitter-api/v1/direct-messages/typing-indicator-and-read-receipts/api-reference/new-typing-indicator
* DELETE custom_profiles/destroy.json
  * https://developer.twitter.com/en/docs/twitter-api/v1/direct-messages/custom-profiles/api-reference/delete-profile
* GET custom_profiles/:id
  * https://developer.twitter.com/en/docs/twitter-api/v1/direct-messages/custom-profiles/api-reference/get-profile
* POST custom_profiles/new.json
  * https://developer.twitter.com/en/docs/twitter-api/v1/direct-messages/custom-profiles/api-reference/new-profile
* GET custom_profiles/list
  * https://developer.twitter.com/en/docs/twitter-api/v1/direct-messages/custom-profiles/api-reference/get-profile-list
* GET feedback/show/:id
  * https://developer.twitter.com/en/docs/twitter-api/v1/direct-messages/customer-feedback/api-reference/show
* GET feedback/events
  * https://developer.twitter.com/en/docs/twitter-api/v1/direct-messages/customer-feedback/api-reference/events
* POST feedback/create
  * https://developer.twitter.com/en/docs/twitter-api/v1/direct-messages/customer-feedback/api-reference/create
* POST media/upload (INIT)
  * https://developer.twitter.com/en/docs/twitter-api/v1/media/upload-media/api-reference/post-media-upload-init
* POST media/upload (APPEND)
  * https://developer.twitter.com/en/docs/twitter-api/v1/media/upload-media/api-reference/post-media-upload-append
* GET media/upload (STATUS)
  * https://developer.twitter.com/en/docs/twitter-api/v1/media/upload-media/api-reference/get-media-upload-status
* POST media/upload (FINALIZE)
  * https://developer.twitter.com/en/docs/twitter-api/v1/media/upload-media/api-reference/post-media-upload-finalize
* POST media/upload
  * https://developer.twitter.com/en/docs/twitter-api/v1/media/upload-media/api-reference/post-media-upload
* POST media/metadata/create
  * https://developer.twitter.com/en/docs/twitter-api/v1/media/upload-media/api-reference/post-media-metadata-create
* POST media/subtitles/delete
  * https://developer.twitter.com/en/docs/twitter-api/v1/media/upload-media/api-reference/post-media-subtitles-delete
* POST media/subtitles/create
  * https://developer.twitter.com/en/docs/twitter-api/v1/media/upload-media/api-reference/post-media-subtitles-create
* GET trends/place
  * https://developer.twitter.com/en/docs/twitter-api/v1/trends/trends-for-location/api-reference/get-trends-place
* GET trends/available
  * https://developer.twitter.com/en/docs/twitter-api/v1/trends/locations-with-trending-topics/api-reference/get-trends-available
* GET trends/closest
  * https://developer.twitter.com/en/docs/twitter-api/v1/trends/locations-with-trending-topics/api-reference/get-trends-closest
* GET geo/id/:place_id
  * https://developer.twitter.com/en/docs/twitter-api/v1/geo/place-information/api-reference/get-geo-id-place_id
* GET geo/reverse_geocode
  * https://developer.twitter.com/en/docs/twitter-api/v1/geo/places-near-location/api-reference/get-geo-reverse_geocode
* GET geo/search
  * https://developer.twitter.com/en/docs/twitter-api/v1/geo/places-near-location/api-reference/get-geo-search
* GET application/rate_limit_status
  * https://developer.twitter.com/en/docs/twitter-api/v1/developer-utilities/rate-limit-status/api-reference/get-application-rate_limit_status
* GET help/languages
  * https://developer.twitter.com/en/docs/twitter-api/v1/developer-utilities/supported-languages/api-reference/get-help-languages
