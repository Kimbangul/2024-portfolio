'use client';
import { gsap, useGSAP } from '@/components/register/gsap';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import LOGO from '/public/icon/logo.svg';
import { LinkArrow, common } from '@/components/ui/icon';
import { link, menu } from '@/data';
import { useResize } from '@/hooks/useResize';
import useTime, { getFormattedTime } from '@/hooks/useTime';
import { scrollToSection } from '@/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const size = useResize();
  const time = useTime();

  // FUNCTION window 사이즈가 pc 사이즈일 경우 메뉴 끄기
  useEffect(() => {
    if (!size.width) return;
    if (isMenuOpen && size.width > 990) {
      setIsMenuOpen(false);
    }
  }, [size.width, isMenuOpen]);

  // FUNCTION menu link버튼 클릭 시 실행
  const onClickMenuLink = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    scrollToSection(href);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className='header'>
        <div className='header__inner'>
          <div className='header__logo'>
            <a href='/' title='홈으로'>
              <span className='sound-only'>Yerim.e</span>
              <LOGO className='logo'/>
            </a>
          </div>
          <nav className='header__nav'>
            <div className='header__clock pc-only'>
              Seoul, Korea
              <time dateTime={`${time.hour}:${time.min}`}>
                {getFormattedTime(time.formattedHour)}
                <span className='header__clock-spliter'>:</span>
                {getFormattedTime(time.min)} {time.amPm}
              </time>
            </div>
            <ul className='header__nav-list pc-only' role='menu'>
              {menu.map((el) => (
                <li
                  className='header__nav-item'
                  role='menuitem'
                  key={`header-menu__${el.text}`}
                >
                  <a
                    className='header__nav-item-link'
                    href={el.href}
                    onClick={(e) => {
                      onClickMenuLink(e, el.href);
                    }}
                  >
                    {el.text}
                  </a>
                </li>
              ))}
            </ul>
            <button
              className='header__nav-opener tb-only'
              aria-haspopup='true'
              aria-controls='menu'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className='header__nav-opener-inner'>
              <div className='header__nav-opener-title'>Menu</div>
              <div
                className='header__nav-opener-icon'
                data-isopen={isMenuOpen}
              ></div>
              </span>
            </button>
          </nav>
        </div>
        <Menu isOpen={isMenuOpen} onClickMenuLink={onClickMenuLink} />
      </header>
    </>
  );
};

const Menu = (props: IHeaderMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const menuFixerAnimation = {
    initial: { backdropFilter: 'blur(0)' },
    animate: { backdropFilter: 'blur(24px)' },
    exit: { backdropFilter: 'blur(0)' },
  };
  const menuAnimation = {
    initial: { height: '0', backDropfilter: 'blur(0)' },
    animate: {
      height: '100%',
      backDropfilter: 'blur(4rem)',
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
    exit: {
      height: '0',
      backDropfilter: 'blur(0)',
      transition: { delay: 0.5, duration: 0.5, ease: 'easeInOut' },
    },
  };

  useGSAP(
    () => {
      if (!props.isOpen) return;
      const tl = gsap.timeline({
        yoyo: true,
        paused: true,
      });
      const link = gsap.utils.toArray('.menu__item-link');

      tl.fromTo(
        link,
        { yPercent: 100 },
        { yPercent: 0, stagger: 0.05, duration: 0.3 },
        'fade-in'
      );
      tl.fromTo(
        '.menu__info-title-inner',
        { yPercent: 200 },
        { yPercent: 0 },
        'fade-in'
      );
      tl.fromTo(
        '.menu__info-item a',
        { yPercent: 100 },
        { yPercent: 0, stagger: 0.05 },
        'fade-in'
      );

      if (props.isOpen) {
        tl.play();
      } else {
        tl.reverse(0);
      }
    },
    { scope: menuRef, dependencies: [props.isOpen] }
  );

  useEffect(() => {
    const html = document.querySelector('html');
    if (!html) return;
    if (props.isOpen) {
      html.style.height = '100vh';
      html.style.overflowY = 'hidden';
    } else {
      html.style.height = 'auto';
      html.style.overflowY = 'visible';
    }
  }, [props.isOpen]);

  return (
    <>
      <AnimatePresence initial={false} mode='wait'>
        {props.isOpen && (
          <motion.div
            className='menu__fixer'
            variants={menuFixerAnimation}
            initial='initial'
            animate='animate'
            exit='exit'
          >
            <motion.div
              className='menu'
              variants={menuAnimation}
              initial='initial'
              animate='animate'
              exit='exit'
              ref={menuRef}
            >
              <div className='menu__inner'>
                <ul className='menu__list' role='menu'>
                  {menu.map((el) => (
                    <li
                      className='menu__item'
                      key={`mb-menu__${el.text}`}
                      role='menuitem'
                    >
                      <a
                        className='menu__item-link'
                        href={el.href}
                        onClick={(e) => props.onClickMenuLink(e, el.href)}
                      >
                        <span className='menu__item-link-text'>{el.text}</span>
                        <span className='menu__item-arrow'>
                          {common.ARROW_RIGHT}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className='menu__info'>
                  <div className='menu__info-left'>
                    <div className='menu__info-title'>
                      <span className='menu__info-title-inner'>Connect</span>
                    </div>
                    <ul className='menu__info-list'>
                      <li className='menu__info-item'>
                        <a href={link.mail}>yerime.dev@gmail.com</a>
                      </li>
                    </ul>
                  </div>
                  <div className='menu__info-right'>
                    <ul className='menu__info-list'>
                      <li className='menu__info-item'>
                        <a href={link.resume} target='_blank'>
                          Resume <LinkArrow />
                        </a>
                      </li>
                      <li className='menu__info-item'>
                        <a href={link.github} target='_blank'>
                          Github <LinkArrow />
                        </a>
                      </li>
                      <li className='menu__info-item'>
                        <a href={link.velog} target='_blank'>
                          Velog <LinkArrow />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <ul className='menu__category'></ul>
                <p className='menu__copy'>Copyright ©2024 | Park Ye rim</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface IHeaderMenuProps {
  isOpen: boolean;
  onClickMenuLink: (e: React.MouseEvent, href: string) => void;
}

export default Header;
