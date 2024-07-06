'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/components/register/gsap';
import { DownArrow } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { scrollToSection } from '@/utils';

const Video = () => {
  // PARAM dom
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timer = useRef<NodeJS.Timeout>();

  const [videoTime, setVideoTime] = useState(videoRef.current?.currentTime);

  // FUNCTION 현재 비디오 시간 구하기
  useEffect(() => {
    timer.current = setInterval(() => {
      setVideoTime(videoRef.current?.currentTime);
    }, 1000);
    return () => clearInterval(timer.current);
  }, []);

  const remainTime = useMemo(() => {
    if (!videoRef.current || !videoTime) return '00';
    const remainTime = parseInt(`${videoRef.current.duration - videoTime}`);
    return remainTime < 10 ? `0${remainTime}` : `${remainTime}`;
  }, [videoTime]);

  // FUNCTION motion
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: videoSectionRef.current,
        start: () => '0 0',
        end: () => '1px 0',
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (self.progress >= 1) {
            gsap.to(moreRef.current, {
              yPercent: -200,
              opacity: 0,
              duration: 0.3,
            });
          } else {
            gsap.to(moreRef.current, {
              yPercent: 0,
              opacity: 1,
              duration: 0.3,
            });
          }
        },
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.querySelector('body'),
          scrub: true,
          start: () => '0 0',
          end: () => `+=${(window.innerHeight / 3) * 2}`,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        titleRef.current,
        {
          yPercent: () => -80,
        },
        'fade-out'
      );

      tl.to(
        videoSectionRef.current,
        {
          opacity: 0,
        },
        'fade-out+=0.2'
      );
    },
    { scope: videoSectionRef }
  );

  // FUNCTION scroll for more 버튼 클릭 시 실행
  const onClickscrollToVisual = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection('.visual');
  };

  // FUNCTION video 재생/일시 정지
  const onClickVideoControl = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
      setVideoTime(videoRef.current?.currentTime);
    }
  };

  return (
    <Section className='video' dom={videoSectionRef}>
      <h2 className='sound-only'>상단 비디오 영역</h2>
      <div className='video__container'>
        <video
          src='/video/main_video.mp4'
          loop
          autoPlay={true}
          muted
          playsInline
          poster='/image/main_poster.webp'
          ref={videoRef}
        ></video>
      </div>
      <div className='video__title-container' ref={titleRef}>
        <p className='video__title'>Park Ye rim, UI Developer</p>
        <div className='video__info pc-only'>
          <p>Featured Reel ‘24</p>
          <button className='video__timer' onClick={onClickVideoControl}>
            <time dateTime={`00:${remainTime}`}>00:{remainTime}</time>
          </button>
        </div>
      </div>
      <button
        className='video__more'
        ref={moreRef}
        onClick={onClickscrollToVisual}
      >
        Scroll for more <DownArrow />
      </button>
    </Section>
  );
};

export default Video;
