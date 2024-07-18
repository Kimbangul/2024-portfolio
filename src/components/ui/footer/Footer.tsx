'use client';

import { useRef } from 'react';
import { link } from '@/data';
import Ticker from '@/components/ui/ticker/Ticker';

const tickerData = ['Web Publisher', 'Front-end Developer', 'UI Developer'];

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <footer className='footer' ref={footerRef} id='contact'>
        <div className='footer__inner'>
          <small className='footer__copy'>
            <span className='footer__copy-icon'>©</span>
            Park Ye rim
          </small>
          <ul className='footer__info'>
            <li className='footer__info-item footer__year'>© 2024</li>
            <li className='footer__info-item'>
              <a className='footer__info-link' href={link.mail} target='_blank'>
                yerime.dev@gmail.com
              </a>
            </li>
            <li className='footer__info-item'>
              <a
                className='footer__info-link'
                href={link.resume}
                target='_blank'
              >
                resume
              </a>
            </li>
            <li className='footer__info-item'>
              <a
                className='footer__info-link'
                href={link.velog}
                target='_blank'
              >
                Velog
              </a>
            </li>
            <li className='footer__info-item'>
              <a
                className='footer__info-link'
                href={link.github}
                target='_blank'
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <Ticker>
          {tickerData.map((el, idx) => (
            <li className='ticker__item' key={`ticker__${idx}`}>
              {el}
            </li>
          ))}
        </Ticker>
      </footer>
    </>
  );
};

export default Footer;
