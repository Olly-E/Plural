import * as React from 'react';

// A debounced input react component
export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <div className="flex relative border items-center justify-center rounded">
      <input
        {...props}
        className="focus:border-purple-9 block w-full rounded bg-main-gray-bg-dark py-2.5 pl-[19px] pr-[40px] text-[14px] text-[#898989] transition duration-500 ease-in-out focus:outline-0
              focus:ring-2  md:text-sm"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <svg
      className='absolute right-3'
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.45605 0.639837C4.56248 0.640646 2.78378 1.54787 1.67147 3.08006C0.559029 4.61242 0.247197 6.58451 0.832706 8.38499C1.41838 10.1857 2.83035 11.5973 4.63133 12.1823C6.43219 12.7672 8.40423 12.4547 9.93626 11.3418L12.8827 14.2882C13.1172 14.5227 13.4591 14.6143 13.7795 14.5286C14.1 14.4426 14.3501 14.1924 14.4361 13.872C14.5219 13.5516 14.4303 13.2096 14.1958 12.9751L11.2493 10.0287C12.1099 8.84588 12.5013 7.38602 12.348 5.93134C12.1946 4.47665 11.5075 3.13056 10.4192 2.15309C9.331 1.17562 7.91886 0.636431 6.45627 0.639663L6.45605 0.639837ZM6.45605 10.6158C5.37924 10.6158 4.34659 10.1881 3.58518 9.42671C2.82376 8.6653 2.39605 7.63265 2.39605 6.55584C2.39605 5.47903 2.82376 4.44638 3.58518 3.68496C4.34659 2.92355 5.37924 2.49584 6.45605 2.49584C7.53286 2.49584 8.56551 2.92355 9.32693 3.68496C10.0883 4.44638 10.516 5.47903 10.516 6.55584C10.5148 7.63215 10.0867 8.66418 9.32548 9.42527C8.56439 10.1865 7.53241 10.6146 6.45605 10.6158Z"
          fill="#818181"
        />
      </svg>
    </div>
  );
}
