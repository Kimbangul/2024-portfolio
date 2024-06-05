import { link } from '@/data';
import Ticker from '@/components/ui/ticker/Ticker';
import SYMBOL from '/public/icon/common/footer_symbol.svg';

const tickerData = ['Web Publisher', 'Front-end Developer', 'UI Developer'];

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__inner'>
        <div className='footer__symbol'>
          <SYMBOL />
        </div>
        <p className='footer__copy'>
          <span className='footer__copy-icon'>©</span>
          Park Ye rim
        </p>
        <ul className='footer__info'>
          <li className='footer__info-item footer__year'>© 2024</li>
          <li className='footer__info-item'>
            <a className='footer__info-link' href={link.mail} target='_blank'>
              highcolor9871@gmail.com
            </a>
          </li>
          <li className='footer__info-item'>
            <a className='footer__info-link' href={link.resume} target='_blank'>
              resume
            </a>
          </li>
          <li className='footer__info-item'>
            <a className='footer__info-link' href={link.velog} target='_blank'>
              Velog
            </a>
          </li>
          <li className='footer__info-item'>
            <a className='footer__info-link' href={link.github} target='_blank'>
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
  );
};

export default Footer;
