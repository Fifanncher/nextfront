import React from 'react';
import {inject} from 'mobx-react';
import Typography from '@mui/material/Typography';
import s from './Rewiew.module.scss';
import TitleBlock from '../TitleBlock';
import Image from 'next/image';
import Button from '../Button';
import Carousel from 'react-multi-carousel';
import Card from '../Cards/Card';
import StarIcon from '@mui/icons-material/Star';
import ReviewsCard from './Card';

class ReviewsView extends React.Component {
  render() {
    return (
      <div className={s.container}>
        <div className={s.cards}>
          <ReviewsCard
            name={'Анна Гусельникова'}
            date={'13 августа 2023'}
            text={'Отличный магазин с большим выбором качественных материалов. Консультант Евгения вежливая, помогла с\n' +
            '              выбором напольного покрытия, спасибо! Николай Александрович и его команда большие молодцы. Сделали всё\n' +
            '              быстро, чётко и на отлично, одним словом профессионалы. Буду обязательно Вас рекомендовать. Желаю Вам\n' +
            '              успехов и процветания!'}
          />
          <ReviewsCard
            name={'Асель Тижбаева'}
            imgs={[
              {src: '/reviews/6.webp'},
              {src: '/reviews/7.webp'}
            ]}
            date={'11 августа 2023'}
            text={`Хороший магазин. Консультанты вежливые, помогли при выборе напольного покрытия 👍
                  Николай Александрович и его команда профессионалы 👍 Сделали заливку и постелили кварцвинил. Всё вовремя никаких задержек по времени и дате. Пол отличный налюбоваться не могу. Спасибо! 🤟`}
          />
        </div>
        <div>
          <div className={s.info}>
            <Typography variant={'h6'}> 1028 довольных клиентов</Typography>
            <Typography variant={'subtitle1'}>
              Удивлять вас высоким качеством услуг и превосходить любые ожидания — наша главная задача!
              За всё время работы мы заслужили репутацию надежной компании благодаря
              ответственному и качественному подходу,
              высоким компетенциям каждого сотрудника и знанию своего дела.
              Проверьте сами!
            </Typography>

            <a
              target={'_blank'}
              rel='noopener noreferrer'
              href='https://2gis.ru/tyumen/firm/70000001041302673/tab/reviews'
            >
              <Button
                variant={'text'}
                color={'secondary'}
              >
                {'Все отзывы из 2GIS'}
              </Button>
            </a>
          </div>

          <div className={s.media}>
            <div>
              <Image
                src={'/reviews/otzyv_3.webp'}
                width={280}
                height={270}
                alt={'Отзыв'}
              />
            </div>
            <div>
              <Image
                src={'/services/1.webp'}
                width={280}
                height={270}
                alt={'Отзыв'}
              />
            </div>
            <div>
              <Image
                src={'/reviews/otzyv_4.webp'}
                width={180}
                height={270}
                alt={'Отзыв'}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewsView;
