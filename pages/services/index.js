import React from 'react';
import s from './Works.module.scss';
import Callme from '../../components/Callme';
import Card from "../../components/ServiceCard";
import {inject, observer} from "mobx-react";
import Hierarchy from "../../components/HierarchyNew";
import Meta from "../../components/HeadComponent";
import Title from "../../components/Title";
import Image from "next/image";
import PlayerView from "../../components/VideoPlayer";
import TitleBlock from "../../components/TitleBlock";
import CardMedia from "@mui/material/CardMedia";
import Description from "../../components/Footer/DescriptionPage";
import Link from "next/link";
import Warranty from "../../components/Icons/Warranty";
import Reliable from "../../components/Icons/Reliable";


const media = <Image
    placeholder={'blur'}
    blurDataURL="/blur.png"
    loader={() => '/masterMain.jpg'}
    src={'/masterMain.jpg'}
    width={250}
    height={270}
    alt={'Монтаж напольных покрытий в Тюмени. Укладка кварцвинила и ламината'}
    className={'image'}
/>;
const title = 'Монтаж и укладка напольных покрытий в Тюмени - ламинат, керамогранит, паркет, ковролин'
const text = <>
    <p>
        Даже самое дорогое покрытие может прослужить вам недолго из-за неправильного монтажа.
    </p>
    <p>
        Поэтому доверьте укладку и монтаж ламината, кварцвинила, керамогранита, паркета и другие напольных покрытий
        нашим мастерам. Мы профессионально предоставляем весь комплекс услуг по укладке напольных покрытий любой
        сложности.
    </p>
    <p>
        А также правильно подобрать напольное покрытие для своей квартиры, дома, офиса и любых других помещений вам
        помогут опытные сотрудники нашего салона.
    </p>
</>

const _images = [
    '/services/1.jpg',
    '/services/3.jpg',
    '/services/2.jpg',
    '/services/4.jpg',
    '/services/5.jpg',
    '/services/6.jpg',
]

const _video = [
    'https://master-pola.com/static/video/kl_kv.mp4',
    'https://master-pola.com/static/video/alsafloorlaminate.mp4',
    'https://master-pola.com/static/video/spm_otl.mp4',
    'https://master-pola.com/static/video/IMG_9469.mp4',
    'https://master-pola.com/static/video/reel1.mp4',
    'https://master-pola.com/static/video/reel2.mp4',
    'https://master-pola.com/static/video/reel3.mp4'
]

@inject(({RootStore: {ServicesStore}}) => {
    return {
        services: ServicesStore.services || []
    };
})
@observer
class Works extends React.Component {
    get images() {
        return _images.map(img =>
            <div key={img} className={s.imgBox}>
                <CardMedia
                    className={s.img}
                    image={img}
                />
            </div>
        )
    }

    get video() {
        return _video.map(src =>
            <PlayerView
                key={src}
                muted={'true'}
                classNameContainer={s.verticalContainerPlayer}
                classNamePlayer={s.verticalPlayer}
                src={src}
            />
        )
    }

    get cards() {
        const {services} = this.props;

        return services.map((item, index) => (<Card key={index} {...item}/>));
    }


    render() {
        return (
            <React.Fragment>
                <Meta
                    desc={'Проффесионально предоставляем услуги монтажа и укладки ламината, керамогранита, кварцвинила, ПВХ плитки и дверей. Наши специалисты имеют многолетний опыт. На все выполненные работы предоставлется гарантия'}
                    title={'Монтаж и укладка напольных покрытий в Тюмени - Мастер Пола'}
                />
                <Title title={'Монтаж и укладка напольных покрытий в Тюмени'}/>
                <Hierarchy hierarchy={[{pathname: '/services', name: 'Услуги'}]}/>
                <div className={s.content}>
                    <div className={s.preview}>
                        <div className={s.text}>
                            <h4>
                                Хочешь сделать что-то хорошо – сделай сам.
                                <br/> Хочешь идеальные полы – обратись к
                                Мастер
                                Пола!
                            </h4>
                            <span>
                              <p>
                                Наши специалисты имеют многолетний опыт в укладке напольных покрытий и профессионально
                                выполнят весь комплекс работ.
                            </p>
                            <p>
                                 Вы можете узнать стоимость монтажа по телефону
                                <span className={s.phone}> 8 (982) 988-15-22 </span>  или оставив заявку на сайте.
                                Из-за плотного графика наших специалистов рекоммендуем заранее согласовывать и бронировать нужное и удобное для вас время.
                            </p>
                          </span>
                            <Callme className={s.button} buttonText={'Оставить заявку'}/>
                        </div>
                        <div className={s.videoContainer}>
                            <video
                                className={s.video} src={'service.mp4'}
                                autoPlay={true} muted={true} loop={true}
                                playsInline={true}/>
                        </div>
                    </div>
                    <div className={s.container}>
                        <div className={s.headerTitle}>
                            <TitleBlock title={'Наши работы'}/>
                            <Link href={{
                                pathname: '/works',
                            }}
                                  as={`/works`}
                                  passHref
                            >
                                <a> Все работы </a>
                            </Link>
                        </div>
                        <div className={s.media}>
                            {this.images}
                        </div>
                    </div>

                    <div className={s.aboutContainer}>
                        <h2> Опытные и надежные мастера Тюмени </h2>
                        <div className={s.aboutBock}>
                            <div className={s.image}>
                                <Image src={'/master2.jpg'} layout='fill' priority={true}/>
                            </div>
                            <div className={s.textAbout}>
                                <div className={s.divider}/>
                                <p>
                                    Залог <b> идеального пола </b> = качественное покрытие + профессиональные мастера.
                                    В нашей команде только настоящие специалисты своего дела - <b>проверенные временем и
                                    делом</b>.
                                    Но самое главное - мы <b>любим</b> свою работу и делаем все качественно и <b>как для
                                    себя</b>.
                                </p>
                                <div className={s.iconsblock}>
                                    <div>
                                        <Warranty className={s.iconAbout}/>
                                        <h5> Лучший материал и качество </h5>
                                        <span className={s.iconText}>
                                            Поможем подобрать качественные и надежные смеси, клея и сопутсвующие товары.
                                        </span>
                                    </div>
                                    <div>
                                        <Reliable className={s.iconAbout}/>
                                        <h5> Гарантия на монтаж </h5>
                                        <span className={s.iconText}>
                                            Наши специалисты имеют опыт более 15 лет. За все время было уже уложено боле 80 000 м2     весь комплекс работ
            </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={s.container}>
                        <div className={s.headerTitle}>
                            <TitleBlock title={'В моменте'}/>
                            <Link href={{
                                pathname: '/blog',
                            }}
                                  as={`/blog`}
                                  passHref
                            >
                                <a> Все видео </a>
                            </Link>
                        </div>
                        <div className={s.media}>
                            {this.video}
                        </div>
                    </div>
                    <div className={s.container}>
                        <TitleBlock title={'Услуги'}/>
                        <div className={s.cards}>
                            {this.cards}
                        </div>
                    </div>
                    <Description text={text}
                                 media={media}
                                 title={title}
                    />
                </div>
            </React.Fragment>
        );
    }
}

Works.getInitialProps = async ({MobxStore}) => {
    await MobxStore.RootStore.ServicesStore.getServices();

    return {MobxStore};
}


export default Works;
