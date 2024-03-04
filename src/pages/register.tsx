import * as yup from 'yup';
import { useFormState, useForm, FormProvider } from 'react-hook-form';
import { useAuthActions } from '../auth/use-auth-actions';
import { useAuthTokens } from '../auth/use-auth-tokens';
import { useAuthLoginService, useAuthRegisterService } from '../api/services/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { HTTP_CODES_ENUM } from '../types/http-codes';
import { Field } from '../components/field';
import { Link } from 'react-router-dom';

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
};

const useValidationSchema = () => {
  return yup.object().shape({
    username: yup
      .string()
      .required(),
    email: yup
      .string()
      .email()
      .required(),
    password: yup
      .string()
      .min(6)
      .required(),
  });
};

function FormActions() {
  const { isSubmitting } = useFormState();

  return (
    <button
      type='submit'
      disabled={isSubmitting}
      className='btn btn-lg btn-primary pull-xs-right'
    >
      Sign up
    </button>
  );
}

function Form() {
  const { setUser } = useAuthActions();
  const { setTokensInfo } = useAuthTokens();
  const fetchAuthLogin = useAuthLoginService();
  const fetchAuthRegister = useAuthRegisterService();
  const validationSchema = useValidationSchema();

  const methods = useForm<RegisterFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (formData: RegisterFormData) => {
    await fetchAuthRegister(formData);

    const { data: dataLogin, status: statusLogin } = await fetchAuthLogin({
      email: formData.email,
      password: formData.password,
    });

    if (statusLogin === HTTP_CODES_ENUM.OK) {
      setTokensInfo({
        accessToken: dataLogin.accessToken,
        refreshToken: dataLogin.refreshToken,
      });
      setUser(dataLogin.user);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field name='username' type='text' placeholder='Username' />
        <Field name='email' type='text' placeholder='Email' />
        <Field name="password" type="password" placeholder="Password" />
        <FormActions />
      </form>
    </FormProvider>
  )
}

export function Register() {
  return (
    <div className="auth-page">
      <div className="container pag">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            <Form />
          </div>
        </div>
      </div>
    </div>
  )
}