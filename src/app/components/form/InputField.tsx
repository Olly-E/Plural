'use client'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import { Eye, EyeSlash } from 'iconsax-react'
import React from 'react'
import clsx from 'clsx'

import { Label } from '../Elements/Label'
import { ErrorMessage } from '../ErrorMessage'

interface InputFieldProps {
  type?: 'text' | 'number' | 'email' | 'password'
  label?: string
  className?: string
  placeholder?: string
  iconPosition?: 'start' | 'end'
  icon?: React.ReactNode
  isDisabled?: boolean
  hasError: FieldError | undefined
  withIcon?: boolean
  canPressSpace?: boolean
  registration: Partial<UseFormRegisterReturn>
  handleShowPassword?: () => void
  min?: string
  max?: string
  value?: string | number
  isRequired?: boolean
  errorMessage?: string | undefined
  inputHint?: boolean
  inputHintText?: string
  labelClassName?: string
}

export const InputField: React.FC<InputFieldProps> = ({
  type = 'text',
  icon,
  label,
  hasError,
  className,
  placeholder,
  registration,
  withIcon = false,
  iconPosition = 'end',
  canPressSpace = true,
  handleShowPassword,
  min,
  max,
  value,
  isDisabled = false,
  isRequired,
  errorMessage,
  inputHint = false,
  inputHintText,
  labelClassName,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyDown = (e: any) => {
    if (e.key === ' ') {
      e.preventDefault()
    }
  }

  const { name } = registration

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement
    inputElement.value = inputElement.value.replace(/[^a-zA-Z0-9-_,. ]/g, '')
  }

  const isAPassWordInput = name?.toLowerCase().includes('password')

  return (
    <div>
      {!!label && (
        <Label
          className={labelClassName}
          infoHint={inputHint}
          infoHintText={inputHintText}
          htmlFor={name}
          isRequired={isRequired}
        >
          {label}
        </Label>
      )}
      <div className="relative">
        <input
          className={clsx(
            'h-10 w-full border-[0.5px] border-gray-300 font-WorkSans rounded-md bg-transparent px-4 outline-none placeholder:text-sm placeholder:text-gray-300 placeholder:font-light focus-within:border-gray-550 disabled:bg-gray-100',
            hasError && 'border-red-500',
            className
          )}
          type={type}
          disabled={isDisabled}
          name={name}
          value={value}
          id={name}
          placeholder={placeholder}
          onKeyDown={canPressSpace ? undefined : handleKeyDown}
          min={min}
          max={max}
          onInput={
            type === 'text' && !isAPassWordInput ? handleInput : undefined
          }
          step={type === 'number' ? 'any' : undefined}
          {...registration}
        />
        {withIcon && (
          <span
            className={clsx(
              'absolute inset-y-0 flex items-center',
              iconPosition === 'start' ? 'left-0' : 'right-0'
            )}
          >
            {handleShowPassword ? (
              <button
                type="button"
                onClick={handleShowPassword}
                title={type === 'text' ? 'Hide password' : 'Show password'}
                className="focus:shadow-outline p-3 focus:outline-none"
              >
                {type === 'password' ? (
                  <>
                    <EyeSlash size="16" color="#9EA4AC" />
                    <span className="sr-only">Show password</span>
                  </>
                ) : (
                  <>
                    <Eye size="16" color="#9EA4AC" />
                    <span className="sr-only">Hide password</span>
                  </>
                )}
              </button>
            ) : (
              <span className="p-1">{icon}</span>
            )}
          </span>
        )}
      </div>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  )
}
