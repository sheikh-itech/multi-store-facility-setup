import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { PropsWithChildren, useState } from "react";
import { LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type AccordionItemPros = PropsWithChildren<{
    title: string;
    expanded: boolean;
    onHeaderPress: (index: number) => void;
}>;

type AccordionData = {
    title: string;
    content: JSX.Element;
    expanded: boolean;
    onHeaderPress: (index: number) => void;
};

type AccordionProps = PropsWithChildren<{
    data: AccordionData;
}>;

function AccordionItem({ children, title, expanded, onHeaderPress }: AccordionItemPros): JSX.Element {

    const body = <View style={styles.accordBody}>{children}</View>;

    return (
        <View style={styles.accordContainer}>
            <TouchableOpacity style={styles.accordHeader} onPress={(index: any)=>onHeaderPress(index)}>
                <Text style={styles.accordTitle}>{title}</Text>
                <FontAwesomeIcon icon={expanded ? faCaretUp : faCaretDown} size={25} color="black" />
            </TouchableOpacity>
            {expanded && body}
        </View>
    );
}

function AdvAccordion({ accordionData }: AccordionProps | any): JSX.Element {

    const [expandedIndex, setExpandedIndex] = useState(null);

    function handleHeaderPress(index: any) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedIndex(expandedIndex === index ? null : index);
    }

    return (
        <>  
            {accordionData.map((item: any, index: any) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    expanded={expandedIndex === index}
                    onHeaderPress={() => handleHeaderPress(index)}>
                    {item.content}
                </AccordionItem>
            ))}
        </>
    );
}

export default AdvAccordion;

const styles = StyleSheet.create({
    accordContainer: {
        paddingBottom: 4
    },
    accordHeader: {
        padding: 12,
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
        borderColor: 'black',
        borderStyle: "solid",
        borderWidth: 2,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 2,
    },
    accordTitle: {
        fontSize: 20,
        color: 'black'
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
