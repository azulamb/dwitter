import * as TwitterTypes from '../../twitter.d.ts';
import { Expansions } from './Expansions.ts';
import { Media } from './Media.ts';
import { Place } from './Place.ts';
import { Poll } from './Poll.ts';
import { Tweet } from './Tweet.ts';
import { User } from './User.ts';

export function Fields( option?: TwitterTypes.V2Params )
{
	const params = new URLSearchParams();

	if ( !option )
	{
		return params;
	}

	if ( option.expansions && 0 < option.expansions.length )
	{
		Expansions.createField( option.expansions, params );
	}

	if ( option.media && 0 < option.media.length )
	{
		Media.createField( option.media, params );
	}

	if ( option.place && 0 < option.place.length )
	{
		Place.createField( option.place, params );
	}

	if ( option.poll && 0 < option.poll.length )
	{
		Poll.createField( option.poll, params );
	}

	if ( option.tweet && 0 < option.tweet.length )
	{
		Tweet.createField( option.tweet, params );
	}

	if ( option.user && 0 < option.user.length )
	{
		User.createField( option.user, params );
	}

	return params;
}
