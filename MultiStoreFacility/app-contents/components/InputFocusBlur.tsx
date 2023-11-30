import React, { PropsWithChildren, useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

type inputValues = PropsWithChildren<{
    value: any;
    placeholder: string;
    onChangeText: (value: any) => void;
    keepFocused?: boolean;
    secureTextEntry?: boolean;
    keyboardType?: string;
    width?: any;
}>;

function InputFocusBlur({ placeholder, value, onChangeText, secureTextEntry, keepFocused, keyboardType, width}: inputValues) {

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
    if(width)
        styles.input.width = width;
    return (
        <TextInput
            style={
                [
                    styles.input,
                    isFocused ? styles.focusInput : styles.blurInput
                ]
            }
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}            
        />
    );
};
export default InputFocusBlur;

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        width: 200
    },
    focusInput: {
        borderWidth: 2,
        borderColor: '#2089dc',
    },
    blurInput: {
        borderWidth: 2,
        borderColor: 'gray',
    },
});
