'use client';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import { Section } from '@/components/ui/section';
import { getTimeForDay, springOption } from '@/utils';
import { blurDataUrl } from '@/data';

const Posts = (props: IPostsProps) => {
  return (
    <Section className='post' autoheight={true}>
      <h2 className='sc__title'>Recent Posts</h2>
      <ul className='post__list'>
        {props.posts.map((el, idx) => (
          <PostItem {...el} key={`post__${idx}`} />
        ))}
      </ul>
    </Section>
  );
};

const PostItem = (props: TPostsItemProps) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ['-30% end', 'end end'],
    target: itemRef,
  });

  const imgMotion = {
    scale: useSpring(
      useTransform(scrollYProgress, [0, 1], [1.2, 1]),
      springOption
    ),
    rotate: useSpring(
      useTransform(scrollYProgress, [0, 1], [3, 0]),
      springOption
    ),
    filter: useTransform(
      scrollYProgress,
      (v) => `blur(${(1 - v) * 1}rem) brightness(${0 + v})`
    ),
  };

  return (
    <li className='post__item' ref={itemRef}>
      <a
        className='post__item-link'
        href={`${'https://velog.io/@kimbangul/' + props.url_slug}` || '#'}
        target='_blank'
      >
        <div className='post__item-thumb'>
          <motion.div
            className='post__item-thumb-inner'
            style={{
              scale: imgMotion.scale,
              rotate: imgMotion.rotate,
              filter: imgMotion.filter,
            }}
          >
            <Image
              src={props.thumbnail}
              fill
              alt=''
              placeholder='blur'
              blurDataURL={blurDataUrl}
              sizes='(max-width: 768px) 90vw, 32vw'
            />
          </motion.div>
        </div>
        <div className='post__item-date'>
          {getTimeForDay(props.released_at)}
        </div>
        <h3 className='post__item-title'>{props.title}</h3>
      </a>
    </li>
  );
};

export interface IPostsProps {
  posts: TPostsItemProps[];
}

export type TPostsItemProps = {
  id: string;
  title: string;
  short_description: string;
  thumbnail: string;
  url_slug: string;
  released_at: string;
  updated_at: string;
  comments_count: number;
  tags: string[];
  likes: number;
};

export default Posts;
