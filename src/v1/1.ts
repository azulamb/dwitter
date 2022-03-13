import { TwitterAPI } from '../TwitterAPI.ts'
import { Statuses } from './Statuses.ts';
import { Users } from './Users.ts';

export class V1_1 extends TwitterAPI
{
	protected path = '1.1/';

	public statuses = new Statuses( this );
	public users = new Users( this );

	public export()
	{
		return {
			statuses: this.statuses.export(),
			users: this.users.export(),
		};
	}

	public import( data: any )
	{
		if ( typeof data !== 'object' ) { return; }
		if ( typeof data.statuses === 'object' ) { this.statuses.import( data.statuses ); }
		if ( typeof data.users === 'object' ) { this.users.import( data.users ); }
	}
}
