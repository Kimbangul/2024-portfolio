import { common } from '@/components/ui/icon';

export const LinkArrow = () => {
  return (
    <div className='icon__link'>
      <div className='icon__link-inner'>
        <span className='icon__link-item'>{common.ARROW_LINK}</span>
        <span className='icon__link-item'>{common.ARROW_LINK}</span>
      </div>
    </div>
  );
};

export const DownArrow = () => {
  return (
    <span className='icon__down'>
      <span className='icon__down-inner'>
        <span className='icon__down-item'>{common.ARROW_DOWN}</span>
        <span className='icon__down-item'>{common.ARROW_DOWN}</span>
      </span>
    </span>
  );
};
