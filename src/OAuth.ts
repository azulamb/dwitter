import * as TwitterTypes from './twitter.d.ts';
import { APICounter } from './APICounter.ts';
import { HMAC_SHA1 } from './crypto.ts'

interface FetchParams { [ keys: string ]: string | number | boolean | undefined }

interface RequestTokenOption
{
	oauth_callback: string;
	x_auth_access_type?: 'read' | 'write';
}

interface AccessTokenOption
{
	oauth_token: string;
	oauth_verifier: string;
}

export class OAuth extends APICounter
{
	protected path = 'oauth/';

	private apiKey = '';
	private apiKeySecret = '';
	private accessToken = '';
	private accessTokenSecret = '';

	public setAPIKey( apiKey: string, apiKeySecret: string )
	{
		this.apiKey = apiKey;
		this.apiKeySecret = apiKeySecret;
	}

	public setAccessToken( accessToken: string, accessTokenSecret: string )
	{
		this.accessToken = accessToken;
		this.accessTokenSecret = accessTokenSecret;

		return this;
	}

	protected request( method: string, url: string, params: FetchParams, disableToken = false )
	{
		const authorization = this.createAuthHeader( method, url, params, disableToken );

		return fetch( 
			this.createRequestUrl( url, params ),
			{
				method: method,
				headers:
				{
					Authorization: authorization,
				},
			}
		);
	}

	private createAuthHeader( method: string, url: string, params: FetchParams, disableToken = false )
	{
		const oauthParams: { [ keys: string ]: string } =
		{
			oauth_consumer_key: this.apiKey,
			oauth_nonce: this.generateNonce(),
			oauth_signature_method: 'HMAC-SHA1',
			oauth_timestamp: this.getCurrentTimestamp(),
			oauth_version: '1.0',
		};
		if ( !disableToken )
		{
			oauthParams.oauth_token = this.accessToken;
		}

		const signatureKey = 
		[
			this.encode( this.apiKeySecret ),
			disableToken ? '' : this.encode( this.accessTokenSecret ),
		].join( '&' );

		const signatureBase = this.generateSignatureBase( method, url, params, oauthParams );

		const signature = HMAC_SHA1.toBase64( signatureKey, signatureBase );

		const headerParams: { [ keys: string ]: string } =
		{
			... oauthParams,
			oauth_signature: signature,
		};

		return 'OAuth ' + Object.keys( headerParams ).sort().map( ( key ) =>
		{
			return `${ this.encode( key ) }="${ this.encode( headerParams[ key ] ) }"`;
		} ).join( ', ' );
	}

	private generateNonce()
	{
		const array = window.crypto.getRandomValues( new Uint8Array( 32 ) );
		return [ ...array ].map( ( uint ) =>
		{
			return uint.toString( 16 ).padStart( 2, '0' );
		} ).join( '' );
	}

	private getCurrentTimestamp()
	{
		return Math.floor( Date.now() / 1000 ).toString();
	}

	private encode( value: string )
	{
		return encodeURIComponent( value ).replace( /[!'()*]/g, ( char ) => { return '%' + char.charCodeAt( 0 ).toString( 16 ); } );
	}

	private generateSignatureBase( method: string, url: string, params: FetchParams, oauthParams: { [ keys: string ]: string } )
	{
		const allParams: { [ keys: string ]: string } = {};

		Object.keys( oauthParams ).forEach( ( key ) =>
		{
			allParams[ this.encode( key ) ] = this.encode( oauthParams[ key ] );
		} );

		Object.keys( params ).forEach( ( key ) =>
		{
			const value = params[ key ];
			if ( value === undefined ) { return; }
			allParams[ this.encode( key ) ] = this.encode( value + '' );
		} );

		const encodeParams = ( ( params ) =>
		{
			const keys = Object.keys( params );
			keys.sort();

			return keys.map( ( key  ) =>
			{
				return `${ key }=${ params[ key ] }`;
			} );
		} )( allParams );

		return [
			this.encode( method ),
			this.encode( url ),
			this.encode( encodeParams.join( '&' ) ),
		].join( '&' );
	}

	protected createRequestUrl( url: string, params: FetchParams )
	{
		const query = new URLSearchParams();
		Object.keys( params ).forEach( ( key ) =>
		{
			if ( params[ key ] === undefined ) { return; }
			query.append( key, params[ key ] + '' );
		} );
		const queryString = query.toString();

		return queryString ? url + '?' + queryString : url;
	}

	public get( url: string, params: FetchParams )
	{
		return this.request( 'GET', url, params );
	}

	public post( url: string, params: FetchParams )
	{
		return this.request( 'POST', url, params );
	}

	protected limits =
	{
		// request_token: https://developer.twitter.com/en/docs/authentication/api-reference/request_token
	};

	public request_token( option: RequestTokenOption ): Promise<string>
	{
		const api = 'request_token';

		return this.request( 'POST', this.getPath() + api, <{}>option, true ).then( ( response ) =>
		{
			if ( response.status === 200 )
			{
				return response.text();
			}
			return response.json();
		} ).then( ( result ) =>
		{
			if ( typeof result === 'string' ) { return `https://api.twitter.com/oauth/authorize?${ result }`; }
			return Promise.reject( result );
		} );
	}

	public access_token( option: string | AccessTokenOption ): Promise<TwitterTypes.AccessToken>
	{
		const api = 'access_token';
		const isString = typeof option === 'string';

		const params = isString ? new URLSearchParams( option ) : new URLSearchParams();

		if ( !isString )
		{
			params.append( 'oauth_token', option.oauth_token );
			params.append( 'oauth_verifier', option.oauth_verifier );
		}

		return fetch( `${ this.getPath() }${ api }?${ params }`, { method: 'POST' } ).then( ( response ) =>
		{
			if ( response.status === 200 )
			{
				return response.text();
			}
			return response.json();
		} ).then( ( result ) =>
		{
			if ( typeof result === 'string' )
			{
				const data = new URLSearchParams( result );
				return {
					oauth_token: data.get( 'oauth_token' ) || '',
					oauth_token_secret: data.get( 'oauth_token_secret' ) || '',
					user_id: data.get( 'user_id' ) || '',
					screen_name: data.get( 'screen_name' ) || '',
				};
			}

			return Promise.reject( result );
		} );
	}
}
