import React from 'react';
import Typography from '@mui/material/Typography';
import s from './Style.module.scss';
import Image from 'next/image';
import ReviewsCard from '../../Reviews/Card';
import Button from '../../Button';
class Delivery extends React.Component {

  render() {
    //const count = 1021+ getNumberOfDays('08.20.2023');

    return (
      <React.Fragment>
        <div className={s.header}>
          <div className={s.info}>
            <Typography variant={'h4'} component={'h2'}>
              1021 довольных клиентов
            </Typography>
            <div className={s.text}>
              <Typography variant={'h5'}>
                Удивлять вас высоким качеством услуг и превосходить любые ожидания — наша главная задача!
                За всё время работы мы заслужили репутацию надежной компании благодаря
                ответственному и качественному подходу,
                высоким компетенциям каждого сотрудника и знанию своего дела.
                Проверьте сами!
              </Typography>
            </div>

            <div className={s.reviews}>
              <ReviewsCard
                name={'Асель Тижбаева'}
                imgs={[
                  {src: '/reviews/6.jpg'},
                  {src: '/reviews/7.jpg'}
                ]}
                date={'11 августа 2023'}
                text={`Хороший магазин. Консультанты вежливые, помогли при выборе напольного покрытия 👍
                  Николай Александрович и его команда профессионалы 👍 Сделали заливку и постелили кварцвинил. Всё вовремя никаких задержек по времени и дате. Пол отличный налюбоваться не могу. Спасибо! 🤟`}
              />
              <ReviewsCard
                imgs={[
                  {src: '/reviews/3.jpg'},
                  {src: '/reviews/4.jpg'},
                  {src: '/reviews/5.jpg'}
                ]}
                name={'Ирина Кравченко'}
                date={'28 июля 2023'}
                text={`Работу выполнял мастер Николай со своей командой. Сделано просто супер. Быстро и качественно. Сначала пол заливали, затем положили кварцвинил замковый. Все аккуратно, чистенько, все пожелания выполнены и даже мусор после выполненных работ весь убран. Спасибо большое за проделанную работу.`}
              />
              <ReviewsCard
                imgs={[
                  {src: '/reviews/1.jpg'},
                  {src: '/reviews/2.jpg'}
                ]}
                name={'Voldemar Naumov'}
                date={'14 мая 2023 '}
                text={`Долго ждали, когда у нас будет кварцвинил клеевой. И вот...все ожидания позади . Мы можем наслаждаться и любоваться полом. Красота, мы с женой очень рады!!! Спасибо, компании Мастер пола. Замечательные люди, внимательны, чуткие к хотелкам заказчиков. Руководителю компании Наталье, менеджеру Евгении. Ну и особое Большое спасибо, профессионалу своего дела, мастеру Золотые руки Николаю. Всё чётко, быстро, без сучка и зазоринки. Мы не жалеем, а только очень рады, что именно у Вас заказали кварцвинил и его укладку. И спасибо большое ребятам, извините, так быстро Вы сработали, что даже не познакомились. Ребятки, что вместе работали с Николаем! Вы, просто волшебники.`}
              />
              <ReviewsCard
                name={'Анна Гусельникова'}
                date={'13 августа 2023'}
                text={'Отличный магазин с большим выбором качественных материалов. Консультант Евгения вежливая, помогла с\n' +
                '              выбором напольного покрытия, спасибо! Николай Александрович и его команда большие молодцы. Сделали всё\n' +
                '              быстро, чётко и на отлично, одним словом профессионалы. Буду обязательно Вас рекомендовать. Желаю Вам\n' +
                '              успехов и процветания!'}
              />
            </div>
          </div>
        </div>
        {/*<Title title={'Отзывы'} />*/}
        {/*<Hierarchy hierarchy={[{pathname: '/reviews', name: 'Отзывы'}]} />*/}

        <div className={s.container}>
          <div>
            <Image
              src={'/reviews/otzyv.png'}
              width={310}
              height={420}
              quality={100}
              alt={'Отзыв'}
            />
          </div>

          <div className={s.text}>
            <Typography variant={'h6'}>
              Мы помогаем подобрать лучшее для Вас покрытие
            </Typography>

            <Typography>
              Залог идеального пола = качественное покрытие + профессиональные мастера.
            </Typography>
            <Typography>
              В нашей команде только настоящие
              специалисты своего дела - проверенные временем и делом. Но самое главное - мы любим свою работу и делаем
              все качественно и как для себя.
            </Typography>

            <div className={s.links}>
              <Typography variant={'h5'}>
                Больше отзывов от наших клиентов &#8250;
              </Typography>

              <div className={s.list}>
                <a
                  target={'_blank'}
                  rel="noopener noreferrer"
                  href="https://2gis.ru/tyumen/firm/70000001041302673/tab/reviews"
                >
                  <Button
                    variant={'text'}
                    color={'secondary'}
                  >
                    {'Отзывы 2GIS'}
                  </Button>
                </a>
                <a
                  target={'_blank'}
                  rel="noopener noreferrer"
                  href="https://vk.com/topic-211269206_48335014"
                >
                  <Button
                    variant={'text'}
                    color={'secondary'}
                  >
                    {'Отзывы VK'}
                  </Button>
                </a>
                <a
                  target={'_blank'}
                  rel="noopener noreferrer"
                  href="https://yandex.ru/profile/197071784139"
                >
                  <Button
                    variant={'text'}
                    color={'secondary'}
                  >
                    {'Отзывы Яндекс'}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default Delivery;
