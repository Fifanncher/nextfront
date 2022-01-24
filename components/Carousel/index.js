import React, {useRef, useEffect, useState} from 'react';
import Carousel from 'react-bootstrap/Carousel'
import Nophoto from "../../public/nophoto.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import s from './carousel.module.scss';
import Image from 'next/image';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import {IconButton} from '@mui/material';
import styles from "../mainLayout.module.scss";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const CarouselView = ({imgs, width, className}) => {
    const carouselRef = useRef(null);
    const carouselBlockRef = useRef(null);

    const keyDownHandler = ({key}) => {
        const node = carouselRef.current;

        if (!node) {
            return;
        }

        switch (key) {
            case 'ArrowRight':
            case 'd':
                node.slideRight();
                break;
            case 'ArrowLeft':
            case 'a':
                node.slideLeft();
                break;
            case 'Enter':
                node.fullScreen();
                break;
            case 'Escape':
                node.exitFullScreen();
                break;
        }
    };

    let images;

    if (!imgs) {
        images = [{original: Nophoto}];
    }

    images = imgs.map(({src}, index) => <Carousel.Item key={index} className={s.itemCarousel}>
        <img alt="Third slide" src={src}/>
    </Carousel.Item>);

    useEffect(() => {
        const node = carouselBlockRef.current;

        if (node) {
            node.addEventListener('keydown', keyDownHandler);
        }

        return () => node.removeEventListener('keydown', keyDownHandler);
    }, []);

    return (
        <div ref={carouselBlockRef}>
            <Carousel
                prevIcon={
                    <IconButton size={'large'} className={s.upButton}>
                        <ArrowBackIosNewIcon className={s.icon}/>
                    </IconButton>
                }
                nextIcon={
                    <IconButton size={'large'} className={s.upButton}>
                        <ArrowForwardIosIcon className={s.icon}/>
                    </IconButton>
                }
                interval={null}
                className={s.carouselHeight}>
                {images}
            </Carousel>
        </div>
    )
}

export default CarouselView;
