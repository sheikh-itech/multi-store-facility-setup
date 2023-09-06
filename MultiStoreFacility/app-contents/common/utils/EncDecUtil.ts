import Base64 from 'react-native-base64'
import { TextEncoder, TextDecoder } from 'text-encoding'

export class EncDecUtil {

    private static textDecoder = new TextDecoder('utf-8');

    public static encrypt(text: string): string {

        return Base64.encode(text);
    }

    public static decrypt(encText: string) {

        if(!encText)
            return encText;

        return EncDecUtil.textDecoder.decode(Uint8Array.from(Base64.decode(encText), c => c.charCodeAt(0)));

        /*let decodedData = Uint8Array.from(Base64.decode(encText), c => c.charCodeAt(0));
        return EncDecUtil.textDecoder.decode(decodedData);*/
    }
}
