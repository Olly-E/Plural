import React from 'react';

type IndeterminateCheckboxProps = {
  indeterminate?: boolean;
} & React.HTMLProps<HTMLInputElement>;

export const IndeterminateCheckbox = ({
  indeterminate,
  className = '',
  ...rest
}: IndeterminateCheckboxProps) => {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return <input type="checkbox" ref={ref} className={className + ' cursor-pointer'} {...rest} />;
};