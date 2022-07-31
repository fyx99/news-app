import { StyleSheet } from 'react-native'
import { FontSize } from './variables'

export default StyleSheet.create({

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



});
