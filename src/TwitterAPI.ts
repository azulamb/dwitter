import { OAuth } from './OAuth.ts'
import { OAuth2 } from './OAuth2.ts'

export class TwitterAPI
{
	protected get oauthFetch(): OAuth { return this.parent.oauthFetch; }
	protected get oauth2Fetch(): OAuth2 { return this.parent.oauth2Fetch; }

	protected parent!: TwitterAPI;
	protected path = '';
	protected getPath(): string { return this.parent.getPath() + this.path; }
	protected save(): Promise<void> { return this.parent.save(); }

	constructor( parent: TwitterAPI )
	{
		this.parent = parent;
		this.onSetParent();
	}

	protected onSetParent(){}

	protected createUrl( name: string )
	{
		return this.getPath() + name + '.json';
	}
}
