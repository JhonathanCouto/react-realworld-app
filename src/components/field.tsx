import { useFormContext } from 'react-hook-form';

type FieldProps = {
  name: string;
  type: string;
  placeholder: string;
};

export function Field({ name, type, placeholder }: FieldProps) {
  const { register } = useFormContext();

  return (
    <fieldset className='form-group'>
      <input
        {...register(name)}
        className='form-control form-control-lg'
        type={type}
        placeholder={placeholder}
      />
    </fieldset>
  )
}

