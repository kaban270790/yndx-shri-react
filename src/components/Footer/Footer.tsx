import './Footer.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import Text, {Mods as TextMods} from "../Text/Text";

const cnFooter = cn('Footer');

export default () => {
    const textMods: TextMods = {color: 'gray', size: 13};
    return <div className={cnFooter()}>
        <Text className={cnFooter('TradeSecret')} mods={textMods}
        >Trade secrets of Yandex LLC. 16, Lev Tolstoy Str., Moscow, Russia, 119021</Text>
        <Text className={cnFooter('UiVersion')} mods={textMods}>
            UI: 0.1.15
        </Text>
        <Text className={cnFooter('Copyright')} mods={textMods}>
            &copy; 2017 - 2019
        </Text>
        <Text tag={"a"} href={"https://ya.ru"} className={cnFooter('YandexLink')}
              mods={{underline: 'non', color: 'link', ...textMods}}>
            Yandex
        </Text>
    </div>;
};
