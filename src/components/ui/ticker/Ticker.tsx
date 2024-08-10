import { PropsWithChildren } from 'react';

interface ITickerProps extends PropsWithChildren {
  title?: string
}

const Ticker: React.FC<ITickerProps> = (props) => {

  return (
    <div className='ticker' aria-label={props.title}>
      <ul className='ticker__inner' aria-hidden="true">
        {props.children}
        {props.children}
        {props.children}
        {props.children}
      </ul>
    </div>
  );
};

export default Ticker;
