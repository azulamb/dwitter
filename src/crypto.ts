import { HMAC } from 'https://raw.githubusercontent.com/Azulamb/drypto/main/hmac.ts'
import { SHA_1, BLOCK_SIZE } from 'https://raw.githubusercontent.com/Azulamb/drypto/main/sha_1.ts'

export class HMAC_SHA1
{
	static toBase64( key: string | Uint8Array, message: string | Uint8Array )
	{
		return HMAC( key, message ).convert( SHA_1, BLOCK_SIZE ).toBase64();
	}
}
