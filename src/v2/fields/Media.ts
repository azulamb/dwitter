import * as TwitterTypes from '../../twitter.d.ts';
import { FieldBase } from './FieldBase.ts';

export class Media extends FieldBase
{
	static createField( fields: TwitterTypes.MediaFields[], params?: URLSearchParams )
	{
		if ( !params ) { params = new URLSearchParams(); }
		params.set( 'media.fields', fields.join( ',' ) );
		return params;
	}
}
