import * as TwitterTypes from './twitter.d.ts';
import { APICounter } from './APICounter.ts';
import { Base64 } from 'https://raw.githubusercontent.com/Azulamb/drypto/main/base64.ts';

export class OAuth2 extends APICounter
{
	protected path = 'oauth2/';

	private apiKey = '';
	private apiKeySecret = '';
	private bearerToken = '';

	protected limits =
	{
		// token: https://developer.twitter.com/en/docs/authentication/api-reference/token
	};

	public setAPIKey( apiKey: string, apiKeySecret: string )
	{
		this.apiKey = apiKey;
		this.apiKeySecret = apiKeySecret;

		return this;
	}

	public setBearerToken( bearerToken: string )
	{
		this.bearerToken = bearerToken;

		return this;
	}

	protected request( method: string, url: string, params: URLSearchParams )
	{
		const authorization = `Bearer ${ this.bearerToken }`;

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

	protected createRequestUrl( url: string, params: URLSearchParams )
	{
		const queryString = params.toString();
		return queryString ? url + '?' + queryString : url;
	}

	public get( url: string, params: URLSearchParams )
	{
		return this.request( 'GET', url, params );
	}

	public token(): Promise<TwitterTypes.BearerToken>
	{
		const api = 'token';

		const basic = Base64.fromString( `${ this.encode( this.apiKey ) }:${ this.encode( this.apiKeySecret ) }` );
		const body = 'grant_type=client_credentials';

		return fetch( this.getPath() + api,
		{
			method: 'POST',
			headers:
			{
				Authorization: `Basic ${ basic }`,
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				'Content-Length': body.length + '',
			},
			body: body,
		} ).then( ( response ) =>
		{
			return response.json();
		} ).then( async ( result ) =>
		{
			if ( result.errors )
			{
				throw new Error( `Error: ${ JSON.stringify( result ) }` );
			}

			await this.save();

			return result;
		} );
	}

	public invalidate_bearer_token( accessToken: string ): Promise<TwitterTypes.InvalidateBearerToken>
	{
		const api = 'token';

		const basic = Base64.toString( `${ this.encode( this.apiKey ) }:${ this.encode( this.apiKeySecret ) }` );
		const body = `access_token=${ accessToken }`;

		return fetch( this.getPath() + api,
		{
			method: 'POST',
			headers:
			{
				Authorization: `Basic ${ basic }`,
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				'Content-Length': body.length + '',
			},
			body: body,
		} ).then( ( response ) =>
		{
			return response.json();
		} ).then( async ( result ) =>
		{
			if ( result.errors )
			{
				throw new Error( `Error: ${ JSON.stringify( result ) }` );
			}

			await this.save();

			return result;
		} );
	}

	private encode( value: string )
	{
		return encodeURIComponent( value ).replace( /[!'()*]/g, ( char ) => { return '%' + char.charCodeAt( 0 ).toString( 16 ); } );
	}
}
