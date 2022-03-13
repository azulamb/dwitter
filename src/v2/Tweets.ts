import * as TwitterTypes from '../twitter.d.ts';
import { APICounter } from '../APICounter.ts';
import { Fields } from './fields/Fields.ts';

export class Tweets extends APICounter
{
	protected path = 'tweets/';

	protected limits =
	{
		get_id: { count: 900, time: 15 }, // https://developer.twitter.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets-id
	};

	public get( id: string, option?: TwitterTypes.V2Params )
	{
		const api = 'get_id';
		if ( this.isLimit( api ) ) { return this.limitError(); }

		return this.oauth2Fetch.get( this.createUrl( id ), Fields( option ) ).then( ( response ) =>
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

	/*public post(){}

	public delete(){}*/
}
