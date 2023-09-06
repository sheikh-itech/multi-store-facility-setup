
export class EncDecUtil {

    private static textDecoder = new TextDecoder('utf-8');

    public static encrypt(text: string): string {

        return btoa(text);
    }

    public static decrypt(encText: string): string {
        
		return this.textDecoder.decode(Uint8Array.from(atob(encText), c => c.charCodeAt(0)));
    }

    public static bytesToBase64ImageConvert(qrBytes: BinaryType) {
        
        const byteCharacters = atob(qrBytes);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = Array.from(byteNumbers);
        
        return 'data:image/png;base64,' + btoa(String.fromCharCode.apply(null, byteArray));
    }
}