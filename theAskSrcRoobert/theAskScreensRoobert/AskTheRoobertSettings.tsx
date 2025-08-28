import React, { useCallback, useEffect, useState, } from 'react';
import {
    Dimensions,
    TouchableOpacity as AskThePress,
    Switch,
    View as AskRoobertView,
    Text as AskTheText,
    Image as AskTheImage,
    Share,
} from 'react-native';
import AskTheRoobertUniqueView from '../theAskComponentsRoobert/AskTheRoobertUniqueView';
import { fonts as askTheFonts } from '../fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
    sound: 'settings_sound_enabled',
    vibration: 'settings_vibration_enabled',
};

type SettingsItem = {
    label: string;
    value: boolean;
    onChange: () => void;
};

const AskTheRoobertSettings: React.FC<{ setAskTheRoobertPage: React.Dispatch<React.SetStateAction<any>> }> = ({ setAskTheRoobertPage }) => {
    const [isVibrationOn, setIsVibrationOn] = useState(true);
    const askDims = Dimensions.get('window');
    const [isSoundOn, setIsSoundOn] = useState(true);

    // завантаження збережених налаштувань
    useEffect(() => {
        const loadSettings = async () => {
            const savedSound = await AsyncStorage.getItem(STORAGE_KEYS.sound);
            const savedVibration = await AsyncStorage.getItem(STORAGE_KEYS.vibration);

            if (savedSound !== null) setIsSoundOn(savedSound === 'true');
            if (savedVibration !== null) setIsVibrationOn(savedVibration === 'true');
        };
        loadSettings();
    }, []);

    const handleSoundToggle = useCallback(async () => {
        const next = !isSoundOn;
        setIsSoundOn(next);
        await AsyncStorage.setItem(STORAGE_KEYS.sound, next.toString());
    }, [isSoundOn]);

    const handleVibrationToggle = useCallback(async () => {
        const next = !isVibrationOn;
        setIsVibrationOn(next);
        await AsyncStorage.setItem(STORAGE_KEYS.vibration, next.toString());
    }, [isVibrationOn]);

    const settingsList: SettingsItem[] = [
        { label: 'Sound', value: isSoundOn, onChange: handleSoundToggle },
        { label: 'Vibration', value: isVibrationOn, onChange: handleVibrationToggle },
    ];

    return (
        <AskRoobertView style={{ flex: 1 }}>
            <AskTheRoobertUniqueView>

                <AskRoobertView
                    style={{
                        marginBottom: askDims.width * 0.04,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignSelf: 'center',
                        alignItems: 'center',
                        width: askDims.width * 0.8,
                    }}
                >
                    <AskThePress onPress={() => setAskTheRoobertPage('Ask The Roobert Home Gen Screen')}>
                        <AskTheImage
                            source={require('../theAskAssetsRoobert/theAskIconsRoobert/askTheBack.png')}
                            style={{
                                width: askDims.width * 0.07,
                                height: askDims.width * 0.07,
                                marginRight: askDims.width * 0.02,
                            }}
                            resizeMode="contain"
                        />
                    </AskThePress>
                    <AskTheText
                        style={{
                            fontFamily: askTheFonts.askTheRoobertK2DBold,
                            fontSize: askDims.width * 0.070456,
                            color: '#FFC423',
                        }}
                    >
                        Settings
                    </AskTheText>
                </AskRoobertView>

                {/* Settings block */}
                <AskRoobertView
                    style={{
                        shadowRadius: askDims.width * 0.04,
                        paddingVertical: askDims.width * 0.02,
                        backgroundColor: 'white',
                        width: askDims.width * 0.85,
                        shadowOpacity: 0.08,
                        marginTop: askDims.width * 0.01,
                        alignSelf: 'center',
                        shadowColor: '#000',
                        borderRadius: askDims.width * 0.06,
                    }}
                >
                    {settingsList.map((item, idx) => (
                        <AskRoobertView
                            key={item.label}
                            style={{
                                borderBottomColor: '#eee',
                                alignItems: 'center',
                                borderBottomWidth: idx < settingsList.length ? 1 : 0,
                                justifyContent: 'space-between',
                                paddingHorizontal: askDims.width * 0.06,
                                paddingVertical: askDims.width * 0.04,
                                flexDirection: 'row',
                            }}
                        >
                            <AskTheText
                                style={{
                                    fontFamily: askTheFonts.askTheRoobertK2DRegular,
                                    fontSize: askDims.width * 0.05,
                                    color: '#000',
                                }}
                            >
                                {item.label}
                            </AskTheText>
                            <Switch
                                thumbColor="#fff"
                                trackColor={{ false: '#eee', true: '#4FC96F' }}
                                onValueChange={item.onChange}
                                value={item.value}
                            />
                        </AskRoobertView>
                    ))}

                    {/* Share option */}
                    <AskThePress
                        style={{
                            paddingVertical: askDims.width * 0.04,
                            justifyContent: 'space-between',
                            paddingHorizontal: askDims.width * 0.06,
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                        onPress={() => {
                            Share.share({
                                message: 'Can\'t decide? Roobert will help you with this. Download the Ask The Roobert app and make your choice easier.'
                            })
                        }}
                    >
                        <AskTheText
                            style={{
                                fontFamily: askTheFonts.askTheRoobertK2DRegular,
                                fontSize: askDims.width * 0.05,
                                color: '#191549',
                            }}
                        >
                            Share app
                        </AskTheText>
                        {/* кнопка поширення можна додати тут */}
                    </AskThePress>
                </AskRoobertView>
            </AskTheRoobertUniqueView>
        </AskRoobertView>
    );
};

export default AskTheRoobertSettings;
