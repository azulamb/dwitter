import * as TwitterTypes from '../twitter.d.ts';
import { APICounter } from '../APICounter.ts';

interface ShowUserIdOption
{
	user_id: string;
	include_entities?: boolean;
}
interface ShowScreenNameOption
{
	screen_name: string;
	include_entities?: boolean;
};

type ShowOption = ShowUserIdOption | ShowScreenNameOption;

export class Users extends APICounter
{
	protected path = 'users/';

	protected limits =
	{
		show: { count: 900, time: 15 }, // https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/get-users-show
	};

	/**
	 * https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/get-users-show
	 */
	public show( option: ShowOption ): Promise<TwitterTypes.User[]>
	{
		const api = 'show';
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
}
