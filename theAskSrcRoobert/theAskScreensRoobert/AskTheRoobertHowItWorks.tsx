import React from 'react';

interface AskTheRoobertHowItWorksProps {
    askTheDecision?: object;
    setAskTheRoobertPage: React.Dispatch<React.SetStateAction<any>>;
    onAskTheRoobertAction?: (event: GestureResponderEvent) => void;
}

import {
    Image as AskTheImage,
    TouchableOpacity as AskThePress,
    View as AskRoobertView,
    GestureResponderEvent,
    Text as AskTheText,
    Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { fonts as askTheFonts } from '../fonts';
import AskTheRoobertRadialYellowGradientProps from '../theAskComponentsRoobert/AskTheRoobertRadialYellowGradientProps';
import AskTheRoobertUniqueView from '../theAskComponentsRoobert/AskTheRoobertUniqueView';

const AskTheRoobertHowItWorks: React.FC<AskTheRoobertHowItWorksProps> = ({
    setAskTheRoobertPage,
}) => {
    const askDims = Dimensions.get('window');

    return (
        <AskRoobertView style={{ flex: 1 }}>
            <AskTheRoobertUniqueView>
                <AskRoobertView style={{
                    width: askDims.width * 0.8,
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    marginBottom: askDims.width * 0.04,
                }}>
                    <AskThePress onPress={() => {
                        setAskTheRoobertPage('Ask The Roobert Home Gen Screen');
                    }}>
                        <AskTheImage
                            source={require('../theAskAssetsRoobert/theAskIconsRoobert/askTheBack.png')}
                            style={{
                                marginRight: askDims.width * 0.02,
                                height: askDims.width * 0.07,
                                width: askDims.width * 0.07,
                            }}
                            resizeMode='contain'
                        />
                    </AskThePress>
                    <AskTheText
                        style={{
                            fontFamily: askTheFonts.askTheRoobertK2DBold,
                            fontSize: askDims.width * 0.070456,
                            color: '#FFC423',
                            textAlign: 'center',
                        }}
                    >
                        How it works?
                    </AskTheText>
                </AskRoobertView>

                <AskTheText
                    style={{
                        paddingHorizontal: askDims.width * 0.1,
                        color: 'white',
                        fontFamily: askTheFonts.askTheRoobertK2DRegular,
                        textAlign: 'left',
                        fontSize: askDims.width * 0.04,
                    }}
                >
                    {`How It Works
1. Add Your Options\nType in up to 4 choices — anything you want Roobert to decide on.
2. Use a Preset\nPick from ready-made categories like Yes or No, What’s for Dinner, or Weekend Plans.
3. Tap “Decide”\nRoobert instantly picks one for you with his signature style.
4. View the Result\nSee the chosen option and share it with friends or save it for later.
5. Check Your History\nLook back at past decisions anytime.`}
                </AskTheText>

                <AskThePress
                    onPress={() => {
                        // тут можна буде додати інтеграцію поширення
                    }}
                    style={{
                        gap: askDims.width * 0.0190345,
                        justifyContent: 'center',
                        marginVertical: askDims.width * 0.0160345,
                        height: askDims.height * 0.071,
                        borderColor: '#FFF3B9',
                        width: askDims.width * 0.48,
                        flexDirection: 'row',
                        shadowOffset: { width: 0, height: 0 },
                        borderWidth: askDims.width * 0.00350354,
                        alignItems: 'center',
                        shadowRadius: askDims.width * 0.04,
                        alignSelf: 'flex-start',
                        marginLeft: askDims.width * 0.1,
                        marginTop: askDims.width * 0.04,
                        shadowColor: '#000',
                        borderRadius: askDims.width * 0.070345,
                        shadowOpacity: 0.4,
                    }}
                    activeOpacity={0.8}
                >
                    <AskTheRoobertRadialYellowGradientProps
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                        borderRadius={askDims.height * 0.028}
                    />
                    <AskTheText
                        style={{
                            fontFamily: askTheFonts.askTheRoobertK2DBold,
                            textAlign: 'center',
                            color: '#191549',
                            fontSize: askDims.width * 0.048,
                        }}
                    >
                        Share app
                    </AskTheText>
                </AskThePress>
            </AskTheRoobertUniqueView>
        </AskRoobertView>
    );
};

export default AskTheRoobertHowItWorks;
