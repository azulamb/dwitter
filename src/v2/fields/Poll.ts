import * as TwitterTypes from '../../twitter.d.ts';
import { FieldBase } from './FieldBase.ts';

export class Poll extends FieldBase
{
	static createField( fields: TwitterTypes.PollFields[], params?: URLSearchParams )
	{
		if ( !params ) { params = new URLSearchParams(); }
		params.set( 'poll.fields', fields.join( ',' ) );
		return params;
	}
}
