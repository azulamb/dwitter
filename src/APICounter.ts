import { TwitterAPI } from './TwitterAPI.ts'

export class APICounter extends TwitterAPI
{
	protected limits: { [ keys: string ]: { count: number, time: number } } = {};
	private logs: { [ keys: string ]: number[] } = {};

	protected isLimit( api: string )
	{
		const limit = this.limits[ api ];
		if ( !limit ) { return false; }

		const now = Date.now() - limit.time * 60000;
		const log = ( this.logs[ api ] || [] ).filter( ( time ) => { return now <= time; } );
		this.logs[ api ] = log;

		return limit.count <= log.length;
	}

	protected addSuccessRequest( api: string )
	{
		if ( !this.limits[ api ] ) { return false; }
		this.logs[ api ] = ( this.logs[ api ] || [] );
		this.logs[ api ].push( Date.now() );
	}

	protected limitError()
	{
		return Promise.reject( new Error( 'API limit.' ) );
	}

	public export()
	{
		return this.logs;
	}

	public import( data: any )
	{
		if ( typeof data !== 'object' ) { return; }
		Object.keys( data ).forEach( ( key ) =>
		{
			const log = data[ key ];
			if ( !Array.isArray( log ) ) { return; }
			this.logs[ key ] = log.filter( ( d ) => { return typeof d === 'number'; } );
		} );
	}
}
