import { common } from '@/components/ui/icon';

const LinkArrow = () => {
  return (
    <div className='icon__link'>
      <div className='icon__link-inner'>
        <span className='icon__link-item'>{common.ARROW_LINK}</span>
        <span className='icon__link-item'>{common.ARROW_LINK}</span>
      </div>
    </div>
  );
};

export default LinkArrow;
