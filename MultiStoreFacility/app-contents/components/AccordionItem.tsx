import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { PropsWithChildren, useState } from "react";
import { Button, LayoutAnimation } from "react-native";
import { UIManager } from "react-native";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type AccordionItemPros = PropsWithChildren<{
    title: string;
}>;

function AccordionItem({ children, title }: AccordionItemPros): JSX.Element {

    const [expanded, setExpanded] = useState(false);

    function toggleItem() {
        //LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        //LayoutAnimation.configureNext(LayoutAnimation.create(350, 'linear', 'scaleY'));
        LayoutAnimation.configureNext(LayoutAnimation.create(300, 'linear', 'scaleX'));
        setExpanded(!expanded);
    }

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const body = <View style={styles.accordBody}>{children}</View>;

    return (
        <View style={styles.accordContainer}>
            <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
                <Text style={styles.accordTitle}>{title}</Text>
                <FontAwesomeIcon icon={expanded ? faCaretUp : faCaretDown} size={24} color="white" />
            </TouchableOpacity>
            {expanded && body}
        </View>
    );
}

export default AccordionItem;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    accordContainer: {
        paddingBottom: 4
    },
    accordHeader: {
        padding: 12,
        backgroundColor: '#666',
        color: '#eee',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    accordTitle: {
        fontSize: 20,
    },
    accordBody: {
        padding: 12
    },
    textSmall: {
        fontSize: 16
    },
    seperator: {
        height: 12
    }
});
