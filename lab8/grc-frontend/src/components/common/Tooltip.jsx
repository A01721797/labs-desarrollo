import { useId } from 'react';

export default function Tooltip({ text, children }) {
  const id = useId();
  return (
    <span className="tooltip">
      <span aria-describedby={id}>{children}</span>
      <span role="tooltip" id={id} className="tooltip__text">{text}</span>
    </span>
  );
}
