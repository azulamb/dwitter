import * as TwitterTypes from '../twitter.d.ts';
import { APICounter } from '../APICounter.ts';

interface HomeTimelineOption
{
	count?: number; // Default 20, Max 200
	since_id?: number; //
	max_id?: number; //
	trim_user?: boolean; //
	exclude_replies?: boolean; //
	include_entities?: boolean; //
}

interface ShowOption
{
	trim_user?: boolean;
	include_my_retweet?: boolean;
	include_entities?: boolean;
	include_ext_alt_text?: boolean;
	include_card_uri?: boolean;
}

export class Statuses extends APICounter
{
	protected path = 'statuses/';

	protected limits =
	{
		// destroy:{}, // https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-destroy-id
		home_timeline: { count: 15, time: 15 }, // https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/api-reference/get-statuses-home_timeline
		// lookup: { count: 900, time: 15 }, // https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/get-statuses-lookup
		show: { count: 900, time: 15 }, // https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/get-statuses-show-id
		// update: { count: 300, time: 180 }, // https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-update
		// retweet: {}, // https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-retweet-id
		// retweeters: {}, // https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/get-statuses-retweeters-ids
		//retweet https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-retweet-id
		// unretweet: {}, // https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-unretweet-id
	};

	/**
	 * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/api-reference/get-statuses-user_timeline
	 */
	public home_timeline( option: HomeTimelineOption = {} ): Promise<TwitterTypes.Tweet[]>
	{
		const api = 'home_timeline';
		if ( this.isLimit( api ) ) { return this.limitError(); }

		return this.oauthFetch.get( this.createUrl( api ), <{}>option ).then( ( response ) =>
		{
			this.addSuccessRequest( api );
			return response.json();
		} ).then( async ( result ) =>
		{
			if ( result.errors )
			{
				throw new Error( `Error: ${ JSON.stringify( result ) }` );
			}

			await this.save();

			return result;
		} );
	}

	/**
	 * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/get-statuses-show-id
	 */
	public show( id: string, option: ShowOption = {} ): Promise<TwitterTypes.Tweet[]>
	{
		const api = 'show';
		if ( this.isLimit( api ) ) { return this.limitError(); }
		const opt = Object.assign( { id: id }, option );

		return this.oauthFetch.get( this.createUrl( api ), <{}>opt ).then( ( response ) =>
		{
			this.addSuccessRequest( api );
			return response.json();
		} ).then( async ( result ) =>
		{
			if ( result.errors )
			{
				throw new Error( `Error: ${ JSON.stringify( result ) }` );
			}

			await this.save();

			return result;
		} );
	}
}
