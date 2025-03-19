import s from './Spinner.module.css';

export const Spinner = () => {
  return (
    <div id="preloder">
      <div className={s.loader}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
