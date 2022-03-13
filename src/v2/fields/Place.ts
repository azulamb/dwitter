import * as TwitterTypes from '../../twitter.d.ts';
import { FieldBase } from './FieldBase.ts';

export class Place extends FieldBase
{
	static createField( fields: TwitterTypes.PlaceFields[], params?: URLSearchParams )
	{
		if ( !params ) { params = new URLSearchParams(); }
		params.set( 'place.fields', fields.join( ',' ) );
		return params;
	}
}
