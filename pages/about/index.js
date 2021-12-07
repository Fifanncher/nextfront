import React from 'react';
import s from './About.module.scss';
import YouTube from 'react-youtube';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import Image from 'next/image';
import Head from "next/head";

const About = () => (
  <React.Fragment>
      <Head>
          <title>   О нас | Мастер Пола</title>
      </Head>
    <div className={s.header}>
      <div className={s.title}>
         О НАС
        <div className={s.line} />
        <div className={s.preview}>
          <div className={s.text}>
            <p>
                            МАСТЕР ПОЛА – молодая и динамично развивающаяся торгово-монтажная организация,
                            осуществляющая как продажу так и монтаж напольных покрытий.
            </p>
            <p>
                            Наша компания давно зарекомендовала себя как ответственный и надежный исполнитель
                            ремонтно - монтажных работ в сфере напольных покрытий.
            </p>
            <span>
              <div className={s.chars}>
                <div>
                  <DoneOutlineIcon className={s.icon} /> Гарантия на выполненные работы до 3-х лет
                </div>
                <div> <DoneOutlineIcon className={s.icon} /> Материал премиум класса   </div>
                <div> <DoneOutlineIcon className={s.icon} /> Наши специалисты работают на рынке ремонтных работ уже более 10 лет   </div>
                <div> <DoneOutlineIcon className={s.icon} /> Все работы выполняются точно в срок   </div>
              </div>

            </span>
          </div>
        </div>
      </div>
      <YouTube
        opts={{
          width: '650',
          height: '100%'
        }}
        videoId={'bAmdyypn8OI'}
      />
    </div>
    <div className={s.content}>
      <div className={s.mediaBlock}>
        <Image src={'/about.jpg'} layout='fill' />
      </div>
      <div className={s.text}>
        <h2> Профессионализм </h2>
                Наши специалисты готовы выполнить работы любой сложности
        <ul>
          <li>Подготовка основания</li>
          <li>Финишное выравнивание основания</li>
          <li>Укладка ламината</li>
          <li> {'Монтаж паркетной доски "плавающим способом" и с приклеиванием'}</li>
          <li> Монтаж ПВХ/LVT/кварцвиниловой плитки</li>
          <li> Монтаж настенной и напольной пробки</li>
          <li> Укладка массивной/инженерной доски</li>
          <li> Укладка керамогранита и керамической плитки</li>
          <li> Устройство спортивных покрытий</li>
          <li> Монтаж коврового покрытия</li>
          <li> Обустройство лестниц ковролином</li>
          <li>Укладка коммерческих напольных покрытий</li>
          <li> Демонтаж/монтаж напольного покрытия/стяжки</li>
          <li> Нанесение декоративной штукатурки</li>
          <li> Изготовление художественных композиций из ковролина, кварцвиниловой плитки и рулонных
                        ПВХ-покрытий
          </li>
        </ul>
        <h2> Ответственность </h2>
                Индивидуальный подход к каждому клиенту.
        <br />Все работы выполняются точно в срок.
        <p>
                    Каждый Клиент для нас очень важен, мы всегда поможем выбрать, купить и сделать демонтаж/монтаж
                    напольных покрытий! Обращаясь к нам Вы останетесь довольны на 100%! Качество работы наших
                    профессионалов всегда на высоте!
        </p>
        <h2> Надежность </h2>
                Наши специалисты работают на рынке ремонтных работ уже более 10 лет.
        <br />В нашем штате исключительно опытные и квалифицированные мастера.
      </div>
    </div>
  </React.Fragment>
);

export default About;
