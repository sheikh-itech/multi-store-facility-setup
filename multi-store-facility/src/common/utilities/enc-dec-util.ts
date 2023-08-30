
export class EncDecUtil {

    private static textDecoder = new TextDecoder('utf-8');

    public static encrypt(text: string): string {

        return btoa(text);
    }

    public static decrypt(encText: string): string {
        
		return this.textDecoder.decode(Uint8Array.from(atob(encText), c => c.charCodeAt(0)));
    }
}