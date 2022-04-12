import { TwitterApiLogs } from './Cache.ts';
import { OAuth } from './OAuth.ts';
import { OAuth2 } from './OAuth2.ts';
import { TwitterAPI } from './TwitterAPI.ts';
import { V1_1 } from './v1/1.ts';
import { V2_0 } from './v2/0.ts';

export class Dwitter extends TwitterAPI
{
	protected logs: TwitterApiLogs =
	{
		saveTwitterApiLogs: ( data: any ) => { return Promise.resolve(); },
		loadTwitterApiLogs: () => { return Promise.resolve( <any>{} ); },
	};

	protected save(): Promise<void>
	{
		return this.logs.saveTwitterApiLogs( this.export() ).catch( ( error ) => {} );
	}

	protected path = 'https://api.twitter.com/';

	protected getPath() { return this.path; }

	public oauth = new OAuth( this );
	public v1_1 = new V1_1( this );

	public oauth2 = new OAuth2( this );
	public v2 = new V2_0( this );

	public get oauthFetch(): OAuth { return this.oauth; }
	public get oauth2Fetch(): OAuth2 { return this.oauth2; }

	constructor( apiKey: string, apiKeySecret: string, logs?: TwitterApiLogs )
	{
		super( <any>null );
		this.oauth.setAPIKey( apiKey, apiKeySecret );
		this.oauth2.setAPIKey( apiKey, apiKeySecret );
		if ( logs ) { this.logs = logs; }
	}

	public export()
	{
		return {
			oauth: this.oauth.export(),
			v1_1: this.v1_1.export(),
			oauth2: this.oauth.export(),
			v2: this.v1_1.export(),
		};
	}

	public import( data: any )
	{
		if ( typeof data !== 'object' ) { return; }
		if ( typeof data.oauth === 'object' ) { this.oauth.import( data.oauth ); }
		if ( typeof data.v1_1 === 'object' ) { this.v1_1.import( data.v11 ); }
		if ( typeof data.oauth2 === 'object' ) { this.oauth2.import( data.oauth2 ); }
		if ( typeof data.v2 === 'object' ) { this.v2.import( data.v11 ); }
	}
}
