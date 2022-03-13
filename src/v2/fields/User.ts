import * as TwitterTypes from '../../twitter.d.ts';
import { FieldBase } from './FieldBase.ts';

export class User extends FieldBase
{
	static createField( fields: TwitterTypes.UserFields[], params?: URLSearchParams )
	{
		if ( !params ) { params = new URLSearchParams(); }
		params.set( 'user.fields', fields.join( ',' ) );
		return params;
	}
}
