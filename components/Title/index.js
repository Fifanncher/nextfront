import React from 'react';
import s from './style.module.scss';
import classNames from 'classnames';
import {Typography} from "@mui/material";

const Title = ({title, className}) => (
    <div className={s.header}>
        <Typography component={'h1'} variant={'h5'} className={classNames(s.title, className)}>{title}</Typography>
    </div>
);

export default Title;
