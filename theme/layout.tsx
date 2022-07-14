import { StyleSheet } from 'react-native'
import { Colors, FontSize } from './variables'

export default StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.background
    },    
    articleTestViewContainer: {
        flex: 1,
        backgroundColor: Colors.background,

        },
    headerContainer: {

        paddingHorizontal: 10,
        alignItems: "center",
        height: 60,
        width: "100%",
        flex: undefined
    },
    rowContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    rowContainerNoFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    paddingVSmall: {
        paddingHorizontal: 5
    },
    paddingHMedium: {

        paddingVertical: 10
    },
    sectionTitle: {
        paddingVertical: 15,
        paddingHorizontal: 10,

        color: Colors.text,
        fontWeight: "bold",
        fontSize: FontSize.regular
    },
    tinyText: {

        color: Colors.gray,
        fontSize: FontSize.tiny
    },
    smallText: {
        color: Colors.text,
        fontSize: FontSize.small
    },
    regularText: {
        color: Colors.text,
        fontSize: FontSize.regular
    },
    gray: {
        color: Colors.gray
    },
    red: {
        color: Colors.red
    }


});
