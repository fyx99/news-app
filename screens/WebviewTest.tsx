import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import layout from '../theme/layout';
import React, { useState } from 'react';


import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Webview = ({ navigation, route }: any) => {
    const urls = ["https://medium.com/codesight/creating-an-embedded-browser-with-react-native-aea42b54740",
        "https://www.dw.com/de/eu-sucht-wege-für-ukrainischen-weizen/a-62190781",
        "https://www.dailytelegraph.com.au/news/world/helicopter-downed-in-donetsk-field/video/a8f8253b32ac9333d74511057f8ec4a7",
        "https://www.dailytelegraph.com.au/news/world/fifa-world-athletics-to-review-transgender-participation-policies/video/3d446e87321b48bd1556338c5ca028a6",
        "https://www.n-tv.de/panorama/Mehrjaehrige-Haftstrafe-fuer-Franco-A-gefordert-article23411739.html",
        "https://nypost.com/2022/06/20/15-year-old-boy-shot-dead-at-illegal-dc-festival-identified/",
        "https://pagesix.com/2022/06/20/minka-kelly-hits-f1-race-in-first-outing-since-trevor-noah-split/",
        "https://nypost.com/2022/06/20/klay-thompson-trolls-steph-curry-for-crying-after-title-win/",
        "https://nypost.com/2022/06/20/why-wont-biden-lift-tariffs-and-other-commentary/",
        "https://nypost.com/2022/06/20/cristiano-ronaldos-2-million-bugatti-involved-in-crash/",
        "https://nypost.com/2022/06/20/congress-may-fail-to-do-anything-about-gun-control-if-it-keeps-bickering/",
        "https://nypost.com/2022/06/20/manhattan-da-alvin-braggs-latest-concession-on-fighting-crime-isnt-enough/",
        "https://www.theguardian.com/football/2022/jun/20/richard-arnold-hoping-frenkie-de-jong-deal-leads-first-transfer-window-manchester-united",
        "https://www.washingtonexaminer.com/policy/defense-national-security/china-ballistic-missile-united-states-military",
        "https://www.mdr.de/geschichte/mitteldeutschland/jahrestage/kalenderblatt-geschichte-ringheiligtum-poemmelte-patent-buna-ladenschlusszeiten-staatsvertrag-102.html",
        "https://www.independent.co.uk/news/berta-caceres-ap-tegucigalpa-honduras-mexican-b2105493.html",
        "https://www.independent.co.uk/business/pm-to-call-for-sensible-compromise-to-shield-passengers-from-rail-chaos-b2105490.html",
        "https://www.independent.co.uk/news/uk/christopher-geidt-labour-conservative-mps-prime-minister-commons-b2105491.html",
        "https://www.independent.co.uk/news/uk/prince-george-cambridge-diana-harry-charlotte-b2105492.html",
        "https://www.independent.co.uk/news/world/middle-east/israel-government-dissolves-parliament-calls-elections-b2105415.html",
        "https://www.independent.co.uk/news/world/americas/us-politics/ap-colorado-nebraska-denver-donald-trump-b2105500.html"]

    const [maxScroll, setMaxScroll] = useState(0);
    const [navIndex, setNavIndex] = useState(0);
    const [pointer, setPointer] = useState(0);
    const maxPreloads = 10;

    const insets = useSafeAreaInsets();


    const onScrollArticleView = (evt) => {

        const fullHeight = evt.nativeEvent.contentSize.height
        const contentOffsetY = evt.nativeEvent.contentOffset.y
        const scrollRatio = contentOffsetY / fullHeight
        //route.params.onGoBack("asdasd");
        //navigation.state.params.onGoBack('123')
        const newMaxScroll = Math.max(maxScroll, scrollRatio)
        setMaxScroll(newMaxScroll)



    }

    const incrementPointer = () => {
        setPointer((pointer + 1) % maxPreloads)
        setNavIndex((navIndex + 1) % urls.length)
    }

    const test1 = ["https://medium.com/codesight/creating-an-embedded-browser-with-react-native-aea42b54740",
        "https://www.dw.com/de/eu-sucht-wege-für-ukrainischen-weizen/a-62190781",
        "https://www.dailytelegraph.com.au/news/world/helicopter-downed-in-donetsk-field/video/a8f8253b32ac9333d74511057f8ec4a7"]

    const articleBuffer = (
        <>
            {
                urls.map((e, i) => {

                    if (pointer == i) {
                        return (<View key={i + "sdasda"} style={{ height: '100%', backgroundColor: "red" }} >
                            <WebView source={{ uri: urls[navIndex] }} style={styles.webone} onScroll={onScrollArticleView} allowsInlineMediaPlayback={true} mediaPlaybackRequiresUserAction={true} />
                        </View>)
                    }
                    if (pointer != i) {
                        return (<View key={i + "sdasda"} style={{ flex: 1, backgroundColor: "red" }} >
                            <WebView source={{ uri: urls[navIndex + i] }} style={styles.webone} onScroll={onScrollArticleView} allowsInlineMediaPlayback={true} onLoadEnd={()=>{console.log("done")}} mediaPlaybackRequiresUserAction={true} />
                        </View>)
                    }
                })
            }
                    


        </>

    );


    const [loaded, setLoaded] = useState(false);


    const articleLoadScreen = (
        <>
            {
       
                        <View style={{ height: '100%', backgroundColor: "red" }} >
                            <View style={{ height: !loaded ? '100%' : '0%',  backgroundColor: "green" }}></View>
                            <WebView source={{ uri: urls[navIndex] }} style={styles.webone} onScroll={onScrollArticleView} onLoadEnd={()=>{console.log("done");setLoaded(true)}} allowsInlineMediaPlayback={true} mediaPlaybackRequiresUserAction={true} />
                        </View>
            }
                    


        </>

    );


    const fonts = (
        <>
            {
       
       <ScrollView style={{flex:1, height: '100%', backgroundColor: 'white'}}>
       <Text style={{fontFamily: 'RobotoSlab-Black'}}>Roboto Slab nice Font hola</Text>
       <Text style={{fontFamily: 'Academy Engraved LET'}}>Academy Engraved LET </Text>
       <Text style={{fontFamily: 'AcademyEngravedLetPlain'}}>AcademyEngravedLetPlain </Text>
       <Text style={{fontFamily: 'Al Nile'}}>Al Nile </Text>
       <Text style={{fontFamily: 'AlNile-Bold'}}>AlNile-Bold </Text>
       <Text style={{fontFamily: 'American Typewriter'}}>American Typewriter </Text>
       <Text style={{fontFamily: 'AmericanTypewriter-Bold'}}>AmericanTypewriter-Bold </Text>
       <Text style={{fontFamily: 'AmericanTypewriter-Condensed'}}>AmericanTypewriter-Condensed </Text>
       <Text style={{fontFamily: 'AmericanTypewriter-CondensedBold'}}>AmericanTypewriter-CondensedBold </Text>
       <Text style={{fontFamily: 'AmericanTypewriter-CondensedLight'}}>AmericanTypewriter-CondensedLight </Text>
       <Text style={{fontFamily: 'AmericanTypewriter-Light'}}>AmericanTypewriter-Light </Text>
       <Text style={{fontFamily: 'Apple Color Emoji'}}>Apple Color Emoji </Text>
       <Text style={{fontFamily: 'Apple SD Gothic Neo'}}>Apple SD Gothic Neo </Text>
       <Text style={{fontFamily: 'AppleColorEmoji'}}>AppleColorEmoji </Text>
       <Text style={{fontFamily: 'AppleSDGothicNeo-Bold'}}>AppleSDGothicNeo-Bold </Text>
       <Text style={{fontFamily: 'AppleSDGothicNeo-Light'}}>AppleSDGothicNeo-Light </Text>
       <Text style={{fontFamily: 'AppleSDGothicNeo-Medium'}}>AppleSDGothicNeo-Medium </Text>
       <Text style={{fontFamily: 'AppleSDGothicNeo-Regular'}}>AppleSDGothicNeo-Regular </Text>
       <Text style={{fontFamily: 'AppleSDGothicNeo-SemiBold'}}>AppleSDGothicNeo-SemiBold </Text>
       <Text style={{fontFamily: 'AppleSDGothicNeo-Thin'}}>AppleSDGothicNeo-Thin </Text>
       <Text style={{fontFamily: 'AppleSDGothicNeo-UltraLight'}}>AppleSDGothicNeo-UltraLight </Text>
       <Text style={{fontFamily: 'Arial'}}>Arial </Text>
       <Text style={{fontFamily: 'Arial Hebrew'}}>Arial Hebrew </Text>
       <Text style={{fontFamily: 'Arial Rounded MT Bold'}}>Arial Rounded MT Bold </Text>
       <Text style={{fontFamily: 'Arial-BoldItalicMT'}}>Arial-BoldItalicMT </Text>
       <Text style={{fontFamily: 'Arial-BoldMT'}}>Arial-BoldMT </Text>
       <Text style={{fontFamily: 'Arial-ItalicMT'}}>Arial-ItalicMT </Text>
       <Text style={{fontFamily: 'ArialHebrew'}}>ArialHebrew </Text>
       <Text style={{fontFamily: 'ArialHebrew-Bold'}}>ArialHebrew-Bold </Text>
       <Text style={{fontFamily: 'ArialHebrew-Light'}}>ArialHebrew-Light </Text>
       <Text style={{fontFamily: 'ArialMT'}}>ArialMT </Text>
       <Text style={{fontFamily: 'ArialRoundedMTBold'}}>ArialRoundedMTBold </Text>
       <Text style={{fontFamily: 'Avenir'}}>Avenir </Text>
       <Text style={{fontFamily: 'Avenir Next'}}>Avenir Next </Text>
       <Text style={{fontFamily: 'Avenir Next Condensed'}}>Avenir Next Condensed </Text>
       <Text style={{fontFamily: 'Avenir-Black'}}>Avenir-Black </Text>
       <Text style={{fontFamily: 'Avenir-BlackOblique'}}>Avenir-BlackOblique </Text>
       <Text style={{fontFamily: 'Avenir-Book'}}>Avenir-Book </Text>
       <Text style={{fontFamily: 'Avenir-BookOblique'}}>Avenir-BookOblique </Text>
       <Text style={{fontFamily: 'Avenir-Heavy'}}>Avenir-Heavy </Text>
       <Text style={{fontFamily: 'Avenir-HeavyOblique'}}>Avenir-HeavyOblique </Text>
       <Text style={{fontFamily: 'Avenir-Light'}}>Avenir-Light </Text>
       <Text style={{fontFamily: 'Avenir-LightOblique'}}>Avenir-LightOblique </Text>
       <Text style={{fontFamily: 'Avenir-Medium'}}>Avenir-Medium </Text>
       <Text style={{fontFamily: 'Avenir-MediumOblique'}}>Avenir-MediumOblique </Text>
       <Text style={{fontFamily: 'Avenir-Oblique'}}>Avenir-Oblique </Text>
       <Text style={{fontFamily: 'Avenir-Roman'}}>Avenir-Roman </Text>
       <Text style={{fontFamily: 'AvenirNext-Bold'}}>AvenirNext-Bold </Text>
       <Text style={{fontFamily: 'AvenirNext-BoldItalic'}}>AvenirNext-BoldItalic </Text>
       <Text style={{fontFamily: 'AvenirNext-DemiBold'}}>AvenirNext-DemiBold </Text>
       <Text style={{fontFamily: 'AvenirNext-DemiBoldItalic'}}>AvenirNext-DemiBoldItalic </Text>
       <Text style={{fontFamily: 'AvenirNext-Heavy'}}>AvenirNext-Heavy </Text>
       <Text style={{fontFamily: 'AvenirNext-HeavyItalic'}}>AvenirNext-HeavyItalic </Text>
       <Text style={{fontFamily: 'AvenirNext-Italic'}}>AvenirNext-Italic </Text>
       <Text style={{fontFamily: 'AvenirNext-Medium'}}>AvenirNext-Medium </Text>
       <Text style={{fontFamily: 'AvenirNext-MediumItalic'}}>AvenirNext-MediumItalic </Text>
       <Text style={{fontFamily: 'AvenirNext-Regular'}}>AvenirNext-Regular </Text>
       <Text style={{fontFamily: 'AvenirNext-UltraLight'}}>AvenirNext-UltraLight </Text>
       <Text style={{fontFamily: 'AvenirNext-UltraLightItalic'}}>AvenirNext-UltraLightItalic </Text>
       <Text style={{fontFamily: 'AvenirNextCondensed-Bold'}}>AvenirNextCondensed-Bold </Text>
       <Text style={{fontFamily: 'AvenirNextCondensed-BoldItalic'}}>AvenirNextCondensed-BoldItalic </Text>
       <Text style={{fontFamily: 'AvenirNextCondensed-DemiBold'}}>AvenirNextCondensed-DemiBold </Text>
       <Text style={{fontFamily: 'AvenirNextCondensed-DemiBoldItalic'}}>AvenirNextCondensed-DemiBoldItalic </Text>
       <Text style={{fontFamily: 'AvenirNextCondensed-Heavy'}}>AvenirNextCondensed-Heavy </Text>
       <Text style={{fontFamily: 'AvenirNextCondensed-HeavyItalic'}}>AvenirNextCondensed-HeavyItalic </Text>
       <Text style={{fontFamily: 'AvenirNextCondensed-Italic'}}>AvenirNextCondensed-Italic </Text>
       <Text style={{fontFamily: 'AvenirNextCondensed-Medium'}}>AvenirNextCondensed-Medium </Text>
       <Text style={{fontFamily: 'AvenirNextCondensed-MediumItalic'}}>AvenirNextCondensed-MediumItalic </Text>
       <Text style={{fontFamily: 'AvenirNextCondensed-Regular'}}>AvenirNextCondensed-Regular </Text>
       <Text style={{fontFamily: 'AvenirNextCondensed-UltraLight'}}>AvenirNextCondensed-UltraLight </Text>
       <Text style={{fontFamily: 'AvenirNextCondensed-UltraLightItalic'}}>AvenirNextCondensed-UltraLightItalic </Text>
       <Text style={{fontFamily: 'Baskerville'}}>Baskerville </Text>
       <Text style={{fontFamily: 'Baskerville-Bold'}}>Baskerville-Bold </Text>
       <Text style={{fontFamily: 'Baskerville-BoldItalic'}}>Baskerville-BoldItalic </Text>
       <Text style={{fontFamily: 'Baskerville-Italic'}}>Baskerville-Italic </Text>
       <Text style={{fontFamily: 'Baskerville-SemiBold'}}>Baskerville-SemiBold </Text>
       <Text style={{fontFamily: 'Baskerville-SemiBoldItalic'}}>Baskerville-SemiBoldItalic </Text>
       <Text style={{fontFamily: 'Bodoni 72'}}>Bodoni 72 </Text>
       <Text style={{fontFamily: 'Bodoni 72 Oldstyle'}}>Bodoni 72 Oldstyle </Text>
       <Text style={{fontFamily: 'Bodoni 72 Smallcaps'}}>Bodoni 72 Smallcaps </Text>
       <Text style={{fontFamily: 'Bodoni Ornaments'}}>Bodoni Ornaments </Text>
       <Text style={{fontFamily: 'BodoniOrnamentsITCTT'}}>BodoniOrnamentsITCTT </Text>
       <Text style={{fontFamily: 'BodoniSvtyTwoITCTT-Bold'}}>BodoniSvtyTwoITCTT-Bold </Text>
       <Text style={{fontFamily: 'BodoniSvtyTwoITCTT-Book'}}>BodoniSvtyTwoITCTT-Book </Text>
       <Text style={{fontFamily: 'BodoniSvtyTwoITCTT-BookIta'}}>BodoniSvtyTwoITCTT-BookIta </Text>
       <Text style={{fontFamily: 'BodoniSvtyTwoOSITCTT-Bold'}}>BodoniSvtyTwoOSITCTT-Bold </Text>
       <Text style={{fontFamily: 'BodoniSvtyTwoOSITCTT-Book'}}>BodoniSvtyTwoOSITCTT-Book </Text>
       <Text style={{fontFamily: 'BodoniSvtyTwoSCITCTT-Book'}}>BodoniSvtyTwoSCITCTT-Book </Text>
       <Text style={{fontFamily: 'Bradley Hand'}}>Bradley Hand </Text>
       <Text style={{fontFamily: 'BradleyHandITCTT-Bold'}}>BradleyHandITCTT-Bold </Text>
       <Text style={{fontFamily: 'Chalkboard SE'}}>Chalkboard SE </Text>
       <Text style={{fontFamily: 'ChalkboardSE-Bold'}}>ChalkboardSE-Bold </Text>
       <Text style={{fontFamily: 'ChalkboardSE-Light'}}>ChalkboardSE-Light </Text>
       <Text style={{fontFamily: 'ChalkboardSE-Regular'}}>ChalkboardSE-Regular </Text>
       <Text style={{fontFamily: 'Chalkduster'}}>Chalkduster </Text>
       <Text style={{fontFamily: 'Chalkduster'}}>Chalkduster </Text>
       <Text style={{fontFamily: 'Cochin'}}>Cochin </Text>
       <Text style={{fontFamily: 'Cochin-Bold'}}>Cochin-Bold </Text>
       <Text style={{fontFamily: 'Cochin-BoldItalic'}}>Cochin-BoldItalic </Text>
       <Text style={{fontFamily: 'Cochin-Italic'}}>Cochin-Italic </Text>
       <Text style={{fontFamily: 'Copperplate'}}>Copperplate </Text>
       <Text style={{fontFamily: 'Copperplate-Bold'}}>Copperplate-Bold </Text>
       <Text style={{fontFamily: 'Copperplate-Light'}}>Copperplate-Light </Text>
       <Text style={{fontFamily: 'Damascus'}}>Damascus </Text>
       <Text style={{fontFamily: 'DamascusBold'}}>DamascusBold </Text>
       <Text style={{fontFamily: 'DamascusLight'}}>DamascusLight </Text>
       <Text style={{fontFamily: 'DamascusMedium'}}>DamascusMedium </Text>
       <Text style={{fontFamily: 'DamascusSemiBold'}}>DamascusSemiBold </Text>
       <Text style={{fontFamily: 'Devanagari Sangam MN'}}>Devanagari Sangam MN </Text>
       <Text style={{fontFamily: 'DevanagariSangamMN'}}>DevanagariSangamMN </Text>
       <Text style={{fontFamily: 'DevanagariSangamMN-Bold'}}>DevanagariSangamMN-Bold </Text>
       <Text style={{fontFamily: 'Didot'}}>Didot </Text>
       <Text style={{fontFamily: 'Didot-Bold'}}>Didot-Bold </Text>
       <Text style={{fontFamily: 'Didot-Italic'}}>Didot-Italic </Text>
       <Text style={{fontFamily: 'DiwanMishafi'}}>DiwanMishafi </Text>
       <Text style={{fontFamily: 'Euphemia UCAS'}}>Euphemia UCAS </Text>
       <Text style={{fontFamily: 'EuphemiaUCAS-Bold'}}>EuphemiaUCAS-Bold </Text>
       <Text style={{fontFamily: 'EuphemiaUCAS-Italic'}}>EuphemiaUCAS-Italic </Text>
       <Text style={{fontFamily: 'Farah'}}>Farah </Text>
       <Text style={{fontFamily: 'Futura'}}>Futura </Text>
       <Text style={{fontFamily: 'Futura-CondensedExtraBold'}}>Futura-CondensedExtraBold </Text>
       <Text style={{fontFamily: 'Futura-CondensedMedium'}}>Futura-CondensedMedium </Text>
       <Text style={{fontFamily: 'Futura-Medium'}}>Futura-Medium </Text>
       <Text style={{fontFamily: 'Futura-MediumItalic'}}>Futura-MediumItalic </Text>
       <Text style={{fontFamily: 'Geeza Pro'}}>Geeza Pro </Text>
       <Text style={{fontFamily: 'GeezaPro-Bold'}}>GeezaPro-Bold </Text>
       <Text style={{fontFamily: 'Georgia'}}>Georgia </Text>
       <Text style={{fontFamily: 'Georgia-Bold'}}>Georgia-Bold </Text>
       <Text style={{fontFamily: 'Georgia-BoldItalic'}}>Georgia-BoldItalic </Text>
       <Text style={{fontFamily: 'Georgia-Italic'}}>Georgia-Italic </Text>
       <Text style={{fontFamily: 'Gill Sans'}}>Gill Sans </Text>
       <Text style={{fontFamily: 'GillSans-Bold'}}>GillSans-Bold </Text>
       <Text style={{fontFamily: 'GillSans-BoldItalic'}}>GillSans-BoldItalic </Text>
       <Text style={{fontFamily: 'GillSans-Italic'}}>GillSans-Italic </Text>
       <Text style={{fontFamily: 'GillSans-Light'}}>GillSans-Light </Text>
       <Text style={{fontFamily: 'GillSans-LightItalic'}}>GillSans-LightItalic </Text>
       <Text style={{fontFamily: 'GillSans-SemiBold'}}>GillSans-SemiBold </Text>
       <Text style={{fontFamily: 'GillSans-SemiBoldItalic'}}>GillSans-SemiBoldItalic </Text>
       <Text style={{fontFamily: 'GillSans-UltraBold'}}>GillSans-UltraBold </Text>
       <Text style={{fontFamily: 'Helvetica'}}>Helvetica </Text>
       <Text style={{fontFamily: 'Helvetica Neue'}}>Helvetica Neue </Text>
       <Text style={{fontFamily: 'Helvetica-Bold'}}>Helvetica-Bold </Text>
       <Text style={{fontFamily: 'Helvetica-BoldOblique'}}>Helvetica-BoldOblique </Text>
       <Text style={{fontFamily: 'Helvetica-Light'}}>Helvetica-Light </Text>
       <Text style={{fontFamily: 'Helvetica-LightOblique'}}>Helvetica-LightOblique </Text>
       <Text style={{fontFamily: 'Helvetica-Oblique'}}>Helvetica-Oblique </Text>
       <Text style={{fontFamily: 'HelveticaNeue-Bold'}}>HelveticaNeue-Bold </Text>
       <Text style={{fontFamily: 'HelveticaNeue-BoldItalic'}}>HelveticaNeue-BoldItalic </Text>
       <Text style={{fontFamily: 'HelveticaNeue-CondensedBlack'}}>HelveticaNeue-CondensedBlack </Text>
       <Text style={{fontFamily: 'HelveticaNeue-CondensedBold'}}>HelveticaNeue-CondensedBold </Text>
       <Text style={{fontFamily: 'HelveticaNeue-Italic'}}>HelveticaNeue-Italic </Text>
       <Text style={{fontFamily: 'HelveticaNeue-Light'}}>HelveticaNeue-Light </Text>
       <Text style={{fontFamily: 'HelveticaNeue-LightItalic'}}>HelveticaNeue-LightItalic </Text>
       <Text style={{fontFamily: 'HelveticaNeue-Medium'}}>HelveticaNeue-Medium </Text>
       <Text style={{fontFamily: 'HelveticaNeue-MediumItalic'}}>HelveticaNeue-MediumItalic </Text>
       <Text style={{fontFamily: 'HelveticaNeue-Thin'}}>HelveticaNeue-Thin </Text>
       <Text style={{fontFamily: 'HelveticaNeue-ThinItalic'}}>HelveticaNeue-ThinItalic </Text>
       <Text style={{fontFamily: 'HelveticaNeue-UltraLight'}}>HelveticaNeue-UltraLight </Text>
       <Text style={{fontFamily: 'HelveticaNeue-UltraLightItalic'}}>HelveticaNeue-UltraLightItalic </Text>
       <Text style={{fontFamily: 'Hiragino Mincho ProN'}}>Hiragino Mincho ProN </Text>
       <Text style={{fontFamily: 'Hiragino Sans'}}>Hiragino Sans </Text>
       <Text style={{fontFamily: 'HiraginoSans-W3'}}>HiraginoSans-W3 </Text>
       <Text style={{fontFamily: 'HiraginoSans-W6'}}>HiraginoSans-W6 </Text>
       <Text style={{fontFamily: 'HiraMinProN-W3'}}>HiraMinProN-W3 </Text>
       <Text style={{fontFamily: 'HiraMinProN-W6'}}>HiraMinProN-W6 </Text>
       <Text style={{fontFamily: 'Hoefler Text'}}>Hoefler Text </Text>
       <Text style={{fontFamily: 'HoeflerText-Black'}}>HoeflerText-Black </Text>
       <Text style={{fontFamily: 'HoeflerText-BlackItalic'}}>HoeflerText-BlackItalic </Text>
       <Text style={{fontFamily: 'HoeflerText-Italic'}}>HoeflerText-Italic </Text>
       <Text style={{fontFamily: 'HoeflerText-Regular'}}>HoeflerText-Regular </Text>
       <Text style={{fontFamily: 'Kailasa'}}>Kailasa </Text>
       <Text style={{fontFamily: 'Kailasa-Bold'}}>Kailasa-Bold </Text>
       <Text style={{fontFamily: 'Khmer Sangam MN'}}>Khmer Sangam MN </Text>
       <Text style={{fontFamily: 'KohinoorDevanagari-Light'}}>KohinoorDevanagari-Light </Text>
       <Text style={{fontFamily: 'KohinoorDevanagari-Regular'}}>KohinoorDevanagari-Regular </Text>
       <Text style={{fontFamily: 'KohinoorDevanagari-Semibold'}}>KohinoorDevanagari-Semibold </Text>
       <Text style={{fontFamily: 'KohinoorTelugu-Light'}}>KohinoorTelugu-Light </Text>
       <Text style={{fontFamily: 'KohinoorTelugu-Medium'}}>KohinoorTelugu-Medium </Text>
       <Text style={{fontFamily: 'KohinoorTelugu-Regular'}}>KohinoorTelugu-Regular </Text>
       <Text style={{fontFamily: 'Lao Sangam MN'}}>Lao Sangam MN </Text>
       <Text style={{fontFamily: 'Malayalam Sangam MN'}}>Malayalam Sangam MN </Text>
       <Text style={{fontFamily: 'MalayalamSangamMN'}}>MalayalamSangamMN </Text>
       <Text style={{fontFamily: 'MalayalamSangamMN-Bold'}}>MalayalamSangamMN-Bold </Text>
       <Text style={{fontFamily: 'Marker Felt'}}>Marker Felt </Text>
       <Text style={{fontFamily: 'MarkerFelt-Thin'}}>MarkerFelt-Thin </Text>
       <Text style={{fontFamily: 'MarkerFelt-Wide'}}>MarkerFelt-Wide </Text>
       <Text style={{fontFamily: 'Menlo'}}>Menlo </Text>
       <Text style={{fontFamily: 'Menlo-Bold'}}>Menlo-Bold </Text>
       <Text style={{fontFamily: 'Menlo-BoldItalic'}}>Menlo-BoldItalic </Text>
       <Text style={{fontFamily: 'Menlo-Italic'}}>Menlo-Italic </Text>
       <Text style={{fontFamily: 'Menlo-Regular'}}>Menlo-Regular </Text>
       <Text style={{fontFamily: 'Mishafi'}}>Mishafi </Text>
       <Text style={{fontFamily: 'Noteworthy'}}>Noteworthy </Text>
       <Text style={{fontFamily: 'Noteworthy-Bold'}}>Noteworthy-Bold </Text>
       <Text style={{fontFamily: 'Noteworthy-Light'}}>Noteworthy-Light </Text>
       <Text style={{fontFamily: 'Optima'}}>Optima </Text>
       <Text style={{fontFamily: 'Optima-Bold'}}>Optima-Bold </Text>
       <Text style={{fontFamily: 'Optima-BoldItalic'}}>Optima-BoldItalic </Text>
       <Text style={{fontFamily: 'Optima-ExtraBlack'}}>Optima-ExtraBlack </Text>
       <Text style={{fontFamily: 'Optima-Italic'}}>Optima-Italic </Text>
       <Text style={{fontFamily: 'Optima-Regular'}}>Optima-Regular </Text>
       <Text style={{fontFamily: 'Palatino'}}>Palatino </Text>
       <Text style={{fontFamily: 'Palatino-Bold'}}>Palatino-Bold </Text>
       <Text style={{fontFamily: 'Palatino-BoldItalic'}}>Palatino-BoldItalic </Text>
       <Text style={{fontFamily: 'Palatino-Italic'}}>Palatino-Italic </Text>
       <Text style={{fontFamily: 'Palatino-Roman'}}>Palatino-Roman </Text>
       <Text style={{fontFamily: 'Papyrus'}}>Papyrus </Text>
       <Text style={{fontFamily: 'Papyrus-Condensed'}}>Papyrus-Condensed </Text>
       <Text style={{fontFamily: 'Party LET'}}>Party LET </Text>
       <Text style={{fontFamily: 'PartyLetPlain'}}>PartyLetPlain </Text>
       <Text style={{fontFamily: 'PingFang HK'}}>PingFang HK </Text>
       <Text style={{fontFamily: 'PingFang SC'}}>PingFang SC </Text>
       <Text style={{fontFamily: 'PingFang TC'}}>PingFang TC </Text>
       <Text style={{fontFamily: 'PingFangHK-Light'}}>PingFangHK-Light </Text>
       <Text style={{fontFamily: 'PingFangHK-Medium'}}>PingFangHK-Medium </Text>
       <Text style={{fontFamily: 'PingFangHK-Regular'}}>PingFangHK-Regular </Text>
       <Text style={{fontFamily: 'PingFangHK-Semibold'}}>PingFangHK-Semibold </Text>
       <Text style={{fontFamily: 'PingFangHK-Thin'}}>PingFangHK-Thin </Text>
       <Text style={{fontFamily: 'PingFangHK-Ultralight'}}>PingFangHK-Ultralight </Text>
       <Text style={{fontFamily: 'PingFangSC-Light'}}>PingFangSC-Light </Text>
       <Text style={{fontFamily: 'PingFangSC-Medium'}}>PingFangSC-Medium </Text>
       <Text style={{fontFamily: 'PingFangSC-Regular'}}>PingFangSC-Regular </Text>
       <Text style={{fontFamily: 'PingFangSC-Semibold'}}>PingFangSC-Semibold </Text>
       <Text style={{fontFamily: 'PingFangSC-Thin'}}>PingFangSC-Thin </Text>
       <Text style={{fontFamily: 'PingFangSC-Ultralight'}}>PingFangSC-Ultralight </Text>
       <Text style={{fontFamily: 'PingFangTC-Light'}}>PingFangTC-Light </Text>
       <Text style={{fontFamily: 'PingFangTC-Medium'}}>PingFangTC-Medium </Text>
       <Text style={{fontFamily: 'PingFangTC-Regular'}}>PingFangTC-Regular </Text>
       <Text style={{fontFamily: 'PingFangTC-Semibold'}}>PingFangTC-Semibold </Text>
       <Text style={{fontFamily: 'PingFangTC-Thin'}}>PingFangTC-Thin </Text>
       <Text style={{fontFamily: 'PingFangTC-Ultralight'}}>PingFangTC-Ultralight </Text>
       <Text style={{fontFamily: 'Savoye LET'}}>Savoye LET </Text>
       <Text style={{fontFamily: 'SavoyeLetPlain'}}>SavoyeLetPlain </Text>
       <Text style={{fontFamily: 'Sinhala Sangam MN'}}>Sinhala Sangam MN </Text>
       <Text style={{fontFamily: 'SinhalaSangamMN'}}>SinhalaSangamMN </Text>
       <Text style={{fontFamily: 'SinhalaSangamMN-Bold'}}>SinhalaSangamMN-Bold </Text>
       <Text style={{fontFamily: 'Snell Roundhand'}}>Snell Roundhand </Text>
       <Text style={{fontFamily: 'SnellRoundhand-Black'}}>SnellRoundhand-Black </Text>
       <Text style={{fontFamily: 'SnellRoundhand-Bold'}}>SnellRoundhand-Bold </Text>
       <Text style={{fontFamily: 'Symbol'}}>Symbol </Text>
       <Text style={{fontFamily: 'Tamil Sangam MN'}}>Tamil Sangam MN </Text>
       <Text style={{fontFamily: 'TamilSangamMN-Bold'}}>TamilSangamMN-Bold </Text>
       <Text style={{fontFamily: 'Thonburi'}}>Thonburi </Text>
       <Text style={{fontFamily: 'Thonburi-Bold'}}>Thonburi-Bold </Text>
       <Text style={{fontFamily: 'Thonburi-Light'}}>Thonburi-Light </Text>
       <Text style={{fontFamily: 'Times New Roman'}}>Times New Roman </Text>
       <Text style={{fontFamily: 'TimesNewRomanPS-BoldItalicMT'}}>TimesNewRomanPS-BoldItalicMT </Text>
       <Text style={{fontFamily: 'TimesNewRomanPS-BoldMT'}}>TimesNewRomanPS-BoldMT </Text>
       <Text style={{fontFamily: 'TimesNewRomanPS-ItalicMT'}}>TimesNewRomanPS-ItalicMT </Text>
       <Text style={{fontFamily: 'TimesNewRomanPSMT'}}>TimesNewRomanPSMT </Text>
       <Text style={{fontFamily: 'Trebuchet MS'}}>Trebuchet MS </Text>
       <Text style={{fontFamily: 'Trebuchet-BoldItalic'}}>Trebuchet-BoldItalic </Text>
       <Text style={{fontFamily: 'TrebuchetMS-Bold'}}>TrebuchetMS-Bold </Text>
       <Text style={{fontFamily: 'TrebuchetMS-Italic'}}>TrebuchetMS-Italic </Text>
       <Text style={{fontFamily: 'Verdana'}}>Verdana </Text>
       <Text style={{fontFamily: 'Verdana-Bold'}}>Verdana-Bold </Text>
       <Text style={{fontFamily: 'Verdana-BoldItalic'}}>Verdana-BoldItalic </Text>
       <Text style={{fontFamily: 'Verdana-Italic'}}>Verdana-Italic </Text>
       <Text style={{fontFamily: 'Zapf Dingbats'}}>Zapf Dingbats </Text>
       <Text style={{fontFamily: 'ZapfDingbatsITC'}}>ZapfDingbatsITC </Text>
       <Text style={{fontFamily: 'Zapfino'}}>Zapfino </Text>
     </ScrollView>
            }
                    


        </>

    );



    return (
        <View style={layout.screenContainer}>
            <View style={[layout.rowContainer, layout.headerContainer, { marginTop: insets.top }]}>
                <Pressable onPress={() => incrementPointer()} hitSlop={50}>
                    <Text style={layout.regularText} >{"Nav Index"}</Text>
                </Pressable>
            </View>
            <View style={layout.articleTestViewContainer}>

                {fonts}

            </View></View>

    );
}
/*                  


                <View style={styles.articleTestViewContainerdumy}> <Text>{"1"}</Text></View>
                <View style={styles.articleTestViewContainerdumy}> <Text>{"2"}</Text></View>
                <View style={styles.articleTestViewContainerdumy}> <Text>{"3"}</Text></View>

{/* <WebView source={{ uri: urls[navIndex] }} style={styles.webone} onScroll={onScrollArticleView} allowsInlineMediaPlayback={true} mediaPlaybackRequiresUserAction={true} />
                <WebView source={{ uri: urls[navIndex + 1] }} style={styles.webhidden} onScroll={onScrollArticleView} allowsInlineMediaPlayback={true} mediaPlaybackRequiresUserAction={true} />
                <WebView source={{ uri: urls[navIndex + 2] }} style={styles.webhidden} onScroll={onScrollArticleView} allowsInlineMediaPlayback={true} mediaPlaybackRequiresUserAction={true} />    */
const styles = StyleSheet.create({

    webhidden: {
        flex: 2
    },
    webone: {
        flex: 1
    },
    articleTestViewContainerdumy: {
        flex: 1,
        backgroundColor: 'green',
    }

});

export default Webview;