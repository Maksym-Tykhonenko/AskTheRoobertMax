interface AskTheRoobertCreateTheDecideProps {
    setAskTheRoobertPage: React.Dispatch<React.SetStateAction<any>>;
    isOpenedRandomizer: boolean;
    setIsOpenedRandomizer: React.Dispatch<React.SetStateAction<boolean>>;
    preset?: {
        colors: string[];
        optionMode: number;
        title: string;
        options: string[];
    } | null;
}
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Animated, Easing, Share } from 'react-native';


import {
    Text as RoobertText,
    ImageBackground,
    Image as RoobertImage,
    TextInput as RoobertInput,
    TouchableOpacity as RoobertPress,
    Dimensions,
    View as RoobertView,
    ScrollView as RoobertScrollView,
} from 'react-native';

import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import RoobertContainer from '../theAskComponentsRoobert/AskTheRoobertUniqueView';
import { fonts as roobertFonts } from '../fonts';
import RoobertYellowRadial from '../theAskComponentsRoobert/AskTheRoobertRadialYellowGradientProps';

const AskTheRoobertCreateTheDecide: React.FC<AskTheRoobertCreateTheDecideProps> = ({
    setAskTheRoobertPage,
    isOpenedRandomizer,
    setIsOpenedRandomizer,
    preset
}) => {
    const askDims = Dimensions.get('window');

    // State for form
    const [options, setOptions] = useState(['', '', '', '']);
    const [optionColors, setOptionColors] = useState(['#FF2F33', '#3DC000', '#26A4FF', '#FF6DEB']);
    const [optionMode, setOptionMode] = useState(4);
    const [presetTitle, setPresetTitle] = useState('');

    // Apply preset if present and randomizer is opened
    React.useEffect(() => {
        if (preset && isOpenedRandomizer) {
            setPresetTitle(preset.title);
            setOptionMode(preset.optionMode);
            setOptions(preset.options.concat(Array(4 - preset.options.length).fill('')));
            setOptionColors(preset.colors.concat(optionColors.slice(preset.colors.length)));
        }
    }, [preset, isOpenedRandomizer]);

    // Handle option text change
    const handleOptionChange = (idx: number, text: string) => {
        const newOptions = [...options];
        newOptions[idx] = text;
        setOptions(newOptions);
    };

    const allFilled = presetTitle.trim() !== '' && options.slice(0, optionMode).every(opt => opt.trim() !== '');

    // Randomizer state
    const [showResult, setShowResult] = useState(false);
    const arrowRotation = React.useRef(new Animated.Value(0)).current;
    const [isSpinning, setIsSpinning] = useState(false);
    const [randomResultIdx, setRandomResultIdx] = useState<number | null>(null);

    // Sector angles for 2 and 4 options (degrees)
    const sectorAngles = {
        2: [225, 45], // left, right
        4: [315, 225, 45, 135], // top-right, top-left, bottom-right, bottom-left
    };

    // Start randomizer
    const spinRandomizer = async () => {
        if (isSpinning) return;
        setIsSpinning(true);
        setShowResult(false);

        // Reset arrow rotation before spin
        arrowRotation.setValue(0);

        const idx = Math.floor(Math.random() * optionMode);
        setRandomResultIdx(idx);

        // Format date as DD.MM.YYYY
        const now = new Date();
        const dateStr = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()}`;

        // Save to AsyncStorage
        const archiveObj = {
            header: presetTitle,
            label: optionMode === 2 ? '2 options' : '4 options',
            choices: options.slice(0, optionMode).map((text, i) => ({
                text,
                color: optionColors[i],
            })),
            date: dateStr,
        };
        try {
            const prev = await AsyncStorage.getItem('askTheRobertArchive');
            const arr = prev ? JSON.parse(prev) : [];
            arr.unshift(archiveObj);
            await AsyncStorage.setItem('askTheRobertArchive', JSON.stringify(arr));
        } catch (e) {
            // handle error silently
        }

        // Calculate target angle
        const targetAngle = sectorAngles[optionMode][idx];
        // Add spins for animation
        const spins = 4;
        const finalAngle = spins * 360 + targetAngle;

        Animated.timing(arrowRotation, {
            toValue: finalAngle,
            duration: 1800,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start(() => {
            setIsSpinning(false);
            setShowResult(true);
        });
    };

    // Reset randomizer
    const resetRandomizer = () => {
        setIsOpenedRandomizer(false);
        setRandomResultIdx(null);
        arrowRotation.setValue(0);
    };

    return (
        <RoobertView style={{ flex: 1 }}>
            {isOpenedRandomizer && (
                !showResult ? (
                    <RoobertImage
                        source={require('../theAskAssetsRoobert/theAskImagesRoobert/roobertImage.png')}
                        style={{
                            marginBottom: -askDims.height * 0.08,
                            height: askDims.width,
                            width: askDims.width,
                        }}
                    />
                ) : (
                    <RoobertView pointerEvents="none">
                        <Video
                            volume={0}
                            repeat={false}
                            source={require('../theAskAssetsRoobert/theAskVideosRoobert/kendarooSurprized.mp4')}
                            controls={false}
                            muted
                            resizeMode="contain"
                            style={{ width: askDims.width, height: askDims.width, marginBottom: -askDims.height * 0.08, }}
                        />
                    </RoobertView>
                )
            )}
            <RoobertContainer>
                {!isOpenedRandomizer ? (
                    <>
                        <RoobertView style={{
                            width: askDims.width * 0.8,
                            alignItems: 'center',
                            alignSelf: 'center',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                        }}>
                            <RoobertPress onPress={() => {
                                setAskTheRoobertPage('Ask The Roobert Home Gen Screen');
                            }}>
                                <RoobertImage
                                    source={require('../theAskAssetsRoobert/theAskIconsRoobert/askTheBack.png')}
                                    style={{
                                        height: askDims.width * 0.07,
                                        width: askDims.width * 0.07,
                                        marginRight: askDims.width * 0.02,
                                    }}
                                    resizeMode='contain'
                                />
                            </RoobertPress>
                            <RoobertText
                                style={{
                                    fontFamily: roobertFonts.askTheRoobertK2DBold,
                                    fontSize: askDims.width * 0.070456,
                                    color: '#FFC423',
                                    textAlign: 'center',
                                }}
                            >
                                Create the decide
                            </RoobertText>
                        </RoobertView>

                        <RoobertScrollView
                            style={{ width: askDims.width, paddingTop: askDims.height * 0.01 }}
                            contentContainerStyle={{ paddingBottom: askDims.height * 0.098345 }}
                            showsVerticalScrollIndicator={false}
                        >
                            {/* Preset title */}
                            <RoobertText
                                style={{
                                    marginLeft: askDims.width * 0.11,
                                    fontSize: askDims.width * 0.045,
                                    fontFamily: roobertFonts.askTheRoobertK2DBold,
                                    color: 'white',
                                    marginBottom: askDims.height * 0.01,
                                }}
                            >
                                Preset title
                            </RoobertText>
                            <RoobertInput
                                onChangeText={setPresetTitle}
                                value={presetTitle}
                                placeholderTextColor="#8D86DA"
                                placeholder="Type here"
                                style={{
                                    width: askDims.width * 0.78,
                                    color: 'white',
                                    fontFamily: roobertFonts.askTheRoobertK2DBold,
                                    borderColor: '#8D86DA',
                                    paddingHorizontal: askDims.width * 0.04,
                                    borderRadius: askDims.width * 0.04,
                                    paddingVertical: askDims.height * 0.018,
                                    backgroundColor: 'transparent',
                                    alignSelf: 'center',
                                    fontSize: askDims.width * 0.045,
                                    marginBottom: askDims.height * 0.019,
                                    borderWidth: askDims.width * 0.003,
                                }}
                            />

                            {/* Option mode */}
                            <RoobertText
                                style={{
                                    marginBottom: askDims.height * 0.01,
                                    fontSize: askDims.width * 0.045,
                                    marginLeft: askDims.width * 0.11,
                                    color: 'white',
                                    fontFamily: roobertFonts.askTheRoobertK2DBold,
                                }}
                            >
                                Option mode
                            </RoobertText>
                            <RoobertView style={{
                                width: askDims.width * 0.8,
                                alignSelf: 'center',
                                marginBottom: askDims.height * 0.019,
                                flexDirection: 'row',
                            }}>
                                {[
                                    { label: '2 options', value: 2 },
                                    { label: '4 options', value: 4 }
                                ].map(({ label, value }, idx) => {
                                    const selected = optionMode === value;
                                    return (
                                        <RoobertPress
                                            key={value}
                                            onPress={() => setOptionMode(value)}
                                            style={{
                                                marginRight: idx === 0 ? askDims.width * 0.03 : 0,
                                                justifyContent: 'center',
                                                borderRadius: askDims.width * 0.04,
                                                borderWidth: askDims.width * 0.003,
                                                paddingVertical: askDims.height * 0.018,
                                                backgroundColor: selected ? '#FFC423' : 'transparent',
                                                borderColor: selected ? '#FFC423' : '#8D86DA',
                                                alignItems: 'center',
                                                flex: 1,
                                            }}
                                        >
                                            <RoobertText
                                                style={{
                                                    color: selected ? '#191549' : 'white',
                                                    fontFamily: roobertFonts.askTheRoobertK2DBold,
                                                    fontSize: askDims.width * 0.045,
                                                }}
                                            >
                                                {label}
                                            </RoobertText>
                                        </RoobertPress>
                                    );
                                })}
                            </RoobertView>

                            {/* Options */}
                            <RoobertText
                                style={{
                                    marginBottom: askDims.height * 0.01,
                                    marginLeft: askDims.width * 0.11,
                                    fontSize: askDims.width * 0.045,
                                    color: 'white',
                                    fontFamily: roobertFonts.askTheRoobertK2DBold,
                                }}
                            >
                                Options
                            </RoobertText>
                            {Array.from({ length: optionMode }).map((_, idx) => (
                                <RoobertView
                                    key={idx}
                                    style={{
                                        width: askDims.width * 0.78,
                                        flexDirection: 'row',
                                        marginBottom: askDims.height * 0.018,
                                        alignSelf: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <RoobertView
                                        style={{
                                            borderColor: '#8D86DA',
                                            width: askDims.height * 0.064,
                                            borderRadius: askDims.width * 0.05,
                                            borderWidth: askDims.width * 0.003,
                                            backgroundColor: optionColors[idx],
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: askDims.width * 0.03,
                                            height: askDims.height * 0.064,
                                        }}
                                    >
                                        <RoobertText
                                            style={{
                                                color: 'white',
                                                fontFamily: roobertFonts.askTheRoobertK2DBold,
                                                fontSize: askDims.width * 0.04,
                                            }}
                                        >
                                            {idx + 1}
                                        </RoobertText>
                                    </RoobertView>
                                    <RoobertInput
                                        value={options[idx]}
                                        onChangeText={text => handleOptionChange(idx, text)}
                                        placeholder="Your option"
                                        placeholderTextColor="#8D86DA"
                                        style={{
                                            backgroundColor: 'transparent',
                                            fontFamily: roobertFonts.askTheRoobertK2DBold,
                                            borderRadius: askDims.width * 0.04,
                                            borderWidth: askDims.width * 0.003,
                                            borderColor: '#8D86DA',
                                            paddingHorizontal: askDims.width * 0.04,
                                            height: askDims.height * 0.064,
                                            color: 'white',
                                            fontSize: askDims.width * 0.045,
                                            flex: 1,
                                        }}
                                    />
                                </RoobertView>
                            ))}

                            {/* Ask the Roobert button */}
                            <RoobertPress
                                onPress={() => {
                                    setIsOpenedRandomizer(true);
                                }}
                                disabled={!allFilled}
                                style={{
                                    shadowRadius: askDims.width * 0.04,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderColor: '#FFC423',
                                    width: askDims.width * 0.8,
                                    alignSelf: 'center',
                                    height: askDims.height * 0.071,
                                    marginTop: askDims.height * 0.019,
                                    overflow: 'hidden',
                                    shadowOpacity: 0.4,
                                    borderWidth: askDims.width * 0.003,
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowColor: '#000',
                                    borderRadius: askDims.width * 0.07,
                                }}
                                activeOpacity={0.8}
                            >
                                {allFilled ? (
                                    <RoobertYellowRadial
                                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                                        borderRadius={askDims.height * 0.028}
                                    />
                                ) : (
                                    <LinearGradient
                                        colors={['#493fac', '#191549']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{
                                            borderRadius: askDims.width * 0.07,
                                            top: 0,
                                            left: 0,
                                            right: 0, bottom: 0,
                                            position: 'absolute',
                                        }}
                                    />
                                )}
                                <RoobertText
                                    style={{
                                        fontFamily: roobertFonts.askTheRoobertK2DBold,
                                        textAlign: 'center',
                                        fontSize: askDims.width * 0.048,
                                        color: allFilled ? '#191549' : 'white',
                                    }}
                                >
                                    Ask the Roobert
                                </RoobertText>
                            </RoobertPress>
                        </RoobertScrollView>
                    </>
                ) : (
                    <>
                        <RoobertView style={{
                            justifyContent: 'center',
                            width: askDims.width * 0.8,
                            alignItems: 'center',
                            height: askDims.width * 0.8,
                            alignSelf: 'center',
                        }}>
                            <ImageBackground
                                source={optionMode === 4
                                    ? require('../theAskAssetsRoobert/theAskImagesRoobert/radiusOfRandomFor4.png')
                                    : require('../theAskAssetsRoobert/theAskImagesRoobert/radiusOfRandomFor2.png')}
                                style={{
                                    alignSelf: 'center',
                                    height: askDims.width * 0.71,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: askDims.width * 0.71,
                                }}
                                resizeMode='contain'
                            >
                                {/* Animated Arrow - smaller radius and rotated 180deg */}
                                <Animated.View
                                    style={{
                                        alignItems: 'center',
                                        position: 'absolute',
                                        width: askDims.width * 0.71,
                                        top: 0,
                                        height: askDims.width * 0.71,
                                        left: 0,
                                        justifyContent: 'center',
                                        transform: [{
                                            rotate: arrowRotation.interpolate({
                                                inputRange: [0, 360],
                                                outputRange: ['0deg', '360deg'],
                                            })
                                        }]
                                    }}
                                    pointerEvents="none"
                                >
                                    <RoobertImage
                                        source={require('../theAskAssetsRoobert/theAskImagesRoobert/randomizerArrow.png')}
                                        style={{
                                            position: 'absolute',
                                            height: askDims.width * 0.07,
                                            left: (askDims.width * 0.71 - askDims.width * 0.07) / 2,
                                            width: askDims.width * 0.07,
                                            // smaller radius: move arrow closer to center
                                            top: askDims.width * 0.111,
                                            // rotate arrow 180deg so it points inward
                                            transform: [{ rotate: '180deg' }],
                                        }}
                                        resizeMode='contain'
                                    />
                                </Animated.View>

                                {/* Result Circle */}
                                <RoobertView style={{
                                    borderWidth: askDims.width * 0.01,
                                    width: askDims.width * 0.4,
                                    alignItems: 'center',
                                    borderColor: '#4940AE',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    borderRadius: askDims.width * 0.5,
                                    shadowColor: '#000',
                                    elevation: 5,
                                    shadowOpacity: 0.4,
                                    shadowRadius: askDims.width * 0.08,
                                    height: askDims.width * 0.4,
                                    shadowOffset: { width: 0, height: 0 },
                                }}>
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{
                                            bottom: 0,
                                            position: 'absolute',
                                            top: 0,
                                            borderRadius: askDims.width * 0.5,
                                            right: 0,
                                            left: 0,
                                        }}
                                        colors={['#4940AE', '#09072C']}
                                    />
                                    {/* Show result only after animation */}
                                    {(randomResultIdx === null || !showResult) ? (
                                        <RoobertText
                                            style={{
                                                fontFamily: roobertFonts.askTheRoobertK2DBold,
                                                fontSize: askDims.width * 0.053,
                                                color: 'white',
                                                textAlign: 'center',
                                            }}
                                        >
                                            {presetTitle}
                                        </RoobertText>
                                    ) : (
                                        <>
                                            <RoobertText
                                                style={{
                                                    color: '#8D86DA',
                                                    fontFamily: roobertFonts.askTheRoobertK2DBold,
                                                    textAlign: 'center',
                                                    fontSize: askDims.width * 0.045,
                                                }}
                                            >
                                                Result:
                                            </RoobertText>
                                            <RoobertText
                                                style={{
                                                    marginTop: askDims.height * 0.01,
                                                    fontFamily: roobertFonts.askTheRoobertK2DBold,
                                                    textAlign: 'center',
                                                    color: '#FFC423',
                                                    fontSize: askDims.width * 0.053,
                                                }}
                                            >
                                                {options[randomResultIdx]}
                                            </RoobertText>
                                        </>
                                    )}
                                </RoobertView>
                            </ImageBackground>
                        </RoobertView>
                        <RoobertView
                            style={{
                                bottom: askDims.height * 0.05,
                                marginTop: askDims.width * 0.04,
                                alignSelf: 'center',
                                width: askDims.width * 0.86,
                                position: 'absolute',
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            {/* Back Button */}
                            <RoobertPress
                                onPress={resetRandomizer}
                                style={{
                                    borderColor: '#4940AE',
                                    alignItems: 'center',
                                    height: askDims.height * 0.075,
                                    elevation: 5,
                                    justifyContent: 'center',
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 0 },
                                    borderRadius: askDims.height * 0.028,
                                    shadowOpacity: 0.8,
                                    borderWidth: askDims.width * 0.0023,
                                    shadowRadius: askDims.width * 0.05,
                                    width: askDims.height * 0.075,
                                }}
                            >
                                <RoobertYellowRadial
                                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                                    borderRadius={askDims.height * 0.028}
                                />
                                <RoobertImage
                                    source={require('../theAskAssetsRoobert/theAskIconsRoobert/askTheBack.png')}
                                    style={{
                                        width: askDims.height * 0.031,
                                        height: askDims.height * 0.031,
                                        tintColor: '#191549'
                                    }}
                                />
                            </RoobertPress>

                            {/* Ask Again Button */}
                            <RoobertPress
                                onPress={spinRandomizer}
                                disabled={isSpinning}
                                style={{
                                    elevation: 5,
                                    shadowOpacity: 0.8,
                                    justifyContent: 'center',
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 0 },
                                    height: askDims.height * 0.075,
                                    flex: 1,
                                    shadowRadius: askDims.width * 0.05,
                                    alignItems: 'center',
                                    borderRadius: askDims.height * 0.028,
                                    opacity: isSpinning ? 0.5 : 1,
                                    borderColor: '#4940AE',
                                    marginHorizontal: askDims.width * 0.0250234,
                                    borderWidth: askDims.width * 0.0023,
                                }}
                            >
                                <RoobertYellowRadial
                                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                                    borderRadius={askDims.height * 0.028}
                                />
                                <RoobertText
                                    style={{
                                        textAlign: 'center',
                                        color: '#191549',
                                        fontSize: askDims.width * 0.053,
                                        fontFamily: roobertFonts.askTheRoobertK2DBold,
                                    }}
                                >
                                    {randomResultIdx === null || !showResult ? 'Ask the Roobert' : 'Ask again'}
                                </RoobertText>
                            </RoobertPress>

                            {/* Share Button */}
                            <RoobertPress
                                style={{
                                    alignItems: 'center',
                                    borderColor: '#4940AE',
                                    height: askDims.height * 0.075,
                                    shadowColor: '#000',
                                    width: askDims.height * 0.075,
                                    shadowOffset: { width: 0, height: 0 },
                                    borderRadius: askDims.height * 0.028,
                                    shadowOpacity: 0.8,
                                    borderWidth: askDims.width * 0.0023,
                                    elevation: 5,
                                    justifyContent: 'center',
                                    shadowRadius: askDims.width * 0.05,
                                }}
                                onPress={() => {
                                    Share.share({
                                        message: !showResult ? `Ask Roobert what the result of "${presetTitle}" will be. !`
                                            : `Roobert said you should choose ${options[randomResultIdx]}.`
                                    })
                                }}
                            >
                                <RoobertYellowRadial
                                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                                    borderRadius={askDims.height * 0.028}
                                />
                                <RoobertImage
                                    source={require('../theAskAssetsRoobert/theAskIconsRoobert/askShareDark.png')}
                                    style={{
                                        width: askDims.height * 0.037,
                                        height: askDims.height * 0.037,
                                    }}
                                />
                            </RoobertPress>
                        </RoobertView>
                    </>
                )}
            </RoobertContainer>
        </RoobertView>
    );
};

export default AskTheRoobertCreateTheDecide;
