import * as TwitterTypes from '../../twitter.d.ts';
import { FieldBase } from './FieldBase.ts';

export class Tweet extends FieldBase
{
	static createField( fields: TwitterTypes.TweetFields[], params?: URLSearchParams )
	{
		if ( !params ) { params = new URLSearchParams(); }
		params.set( 'tweet.fields', fields.join( ',' ) );
		return params;
	}
}
