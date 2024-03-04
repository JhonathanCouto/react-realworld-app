import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import { useAuthActions } from "../auth/use-auth-actions";
import { useAuthTokens } from "../auth/use-auth-tokens";
import { useAuthLoginService } from "../api/services/auth";
import { HTTP_CODES_ENUM } from "../types/http-codes";
import { Field } from "../components/field";
import { Link, useNavigate } from "react-router-dom";


type LoginFormData = {
  email: string;
  password: string;
};

const useValidationSchema = () => {
  return yup.object().shape({
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
      type="submit"
      disabled={isSubmitting}
      className="btn btn-lg btn-primary pull-xs-right"
    >
      Sign in
    </button>
  )
}

function Form() {
  const navigate = useNavigate();
  const { setUser } = useAuthActions();
  const { setTokensInfo } = useAuthTokens();
  const fetchAuthLogin = useAuthLoginService();
  const validationSchema = useValidationSchema();

  const methods = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (formData: LoginFormData) => {
    const { data, status } = await fetchAuthLogin(formData);

    if (status === HTTP_CODES_ENUM.OK) {
      setTokensInfo({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      setUser(data.user);
      navigate('/');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field name="email" type="text" placeholder="Email" />
        <Field name="password" type="password" placeholder="Password" />
        <FormActions />
      </form>
    </FormProvider>
  )
}

export function Login() {
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>

            <Form />
          </div>
        </div>
      </div>
    </div>
  )
}