import React from 'react';
import s from './Article.module.scss';

const VkIframe = ({src, classNameContainer, classNamePlayer, ...props}) => {
  const [oid, id] = src.split('_');

  return (
    <div className={s.vkContainer}>
      <iframe src={`https://vk.com/video_ext.php?oid=-${oid}&id=${id}&hd=2&autoplay=1`}
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
              frameBorder="0"
              allowFullScreen>
      </iframe>
    </div>
  );
}

export default VkIframe;
