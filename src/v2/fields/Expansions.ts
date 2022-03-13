import * as TwitterTypes from '../../twitter.d.ts';
import { FieldBase } from './FieldBase.ts';

export class Expansions extends FieldBase
{
	static createField( fields: TwitterTypes.ExpansionsField[], params?: URLSearchParams )
	{
		if ( !params ) { params = new URLSearchParams(); }
		params.set( 'expansions', fields.join( ',' ) );
		return params;
	}
}
