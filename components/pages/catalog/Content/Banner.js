import Banner from "../../../Banner";
import React, {Component} from 'react';
import 'react-multi-carousel/lib/styles.css';
import {inject, observer} from 'mobx-react';


@inject(({RootStore: {deviceType}}) => {
    return {
        deviceType: deviceType
    };
})
@observer
class BannerView extends Component {
    render() {
        const {deviceType, className} = this.props;

        return (
            <Banner deviceType={deviceType} className={className} items={items}/>
        );
    }
}

const items = [
    {
        img: 'https://master-pola.com/dashboard/uploads/m_L8_Qf_Tg_WY_60e2162b7e.jpg',
        background: 'https://master-pola.com/dashboard/uploads/photo_2022_04_15_18_35_36_27e3ad8e90.jpg',
        title: 'Кварцвинил вместо керамогранита?',
        text: 'Не все знают, что керамогранит в коридоре, кухне и в любом жилом помещении можно заменить на SPC👇🏻\n' +
            'Выходит дешевле, по тактильным ощущениям мягче и теплее, есть дизайны под бетон, камень и мрамор. Особенно если в квартире маленький ребёнок, то лучше предпочесть SPC вместо холодного керамогранита\n' +
            '\n' +
            'Сегодня в нашем салоне выбирали с клиентом SPC бренда AlpineFloor на всю квартиру, остановились на двух вариантах - один светлый, другой более тёмный. Пока думаем что выбрать😬😅 А вам какой больше нравится?',
        link: '/blog/article/kvarzvinyl_vmesto_keramogranita',
        textButton: 'Подробнее'
    },
    {
        img: 'https://master-pola.com/dashboard/uploads/w_Fh_XC_Fyvoe_M_308d68e83e.jpg',
        background: 'https://master-pola.com/dashboard/uploads/IV_Xh_O_Beh8_Pw_b36daa9e88.jpg',
        title: 'Ламинат за тысячу? Такое сейчас бывает?',
        text: 'ДА! Представляем импортозамещение. Мы очень долго искали ламинат Российского производства с отличными характеристиками и высокой репутацией и нашли его🤩 Ламинат Sunfloor от 919 ₽/м2👇🏻 Большой выбор расцветок💥' +
            'Здесь сделали подборку из самых ходовых цветов, а в следующем посте расскажем чем заслуживает уважения данный ламинат 🔥 Качество и в правду не уступает импортным стандартам - честно, даже сами не ожидали 🙈😅',
        link: '/blog/article/laminat_za_tysuachy',
        textButton: 'Подробнее',
        reverse: true
    },
    {
        background: 'https://master-pola.com/dashboard/uploads/28638_valik_igolchatyy_200mm_sibrt_0837cff587.jpg',
        title: 'У меня ровный пол от застройщика - ошибка №1!',
        text: 'У меня ровная стяжка от застройщика, зачем мне ещё выравнивать пол?\n' +
            'Самая распространённая ошибка при ремонте🙄\n' +
            '1. Ровный пол нужен под любое покрытие\n' +
            '2. От основания зависит срок службы вашего покрытия. Если основание будет плохо подготовлено к укладке - самый дорогой ламинат, кварцвинил, паркет и тд прослужат вам недолго\n' +
            '3. Даже если у вас ровная стяжка от застройщика и вам кажется, что полы ровные - и выравнивание вам не нужно - то, скорее всего, это не так',
        link: '/blog/article/y_menya_rovny_pol_ot_zastroyshika',
        textButton: 'Подробнее'
    }
]

export default BannerView;
