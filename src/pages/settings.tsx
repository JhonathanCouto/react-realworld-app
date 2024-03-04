import { FormProvider, useForm, useFormState } from "react-hook-form";
import { useAuth } from "../auth/use-auth"
import * as yup from 'yup';
import { useAuthActions } from "../auth/use-auth-actions";
import { useAuthPatchMeService } from "../api/services/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { HTTP_CODES_ENUM } from "../types/http-codes";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type EditProfileFormData = {
  username: string | undefined | null;
  email: string | undefined | null;
  password: string | undefined | null;
  bio?: string | undefined | null;
  image?: string | undefined | null;
}

const useValidationSchema = () => {
  return yup.object().shape({
    username: yup
      .string()
      .nullable(),
    email: yup
      .string()
      .optional()
      .email(),
    password: yup
      .string()
      .nullable(),
    bio: yup
      .string()
      .nullable(),
    image: yup
      .string()
      .nullable(),
  });
};

function FormActions() {
  const { isSubmitting } = useFormState();

  return (
    <button
      type="submit"
      className="btn btn-lg btn-primary pull-xs-right"
      disabled={isSubmitting}
    >
      Update Settings
    </button>
  );
}

function Form() {
  const { setUser } = useAuthActions();
  const { user } = useAuth();
  const fetchAuthPatchMe = useAuthPatchMeService();
  const validationSchema = useValidationSchema();

  const methods = useForm<EditProfileFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      bio: "",
      image: "",
    },
  });

  const { handleSubmit, reset, register } = methods;

  const onSubmit = async (formData: EditProfileFormData) => {
    const { data, status } = await fetchAuthPatchMe(formData);

    if (status === HTTP_CODES_ENUM.OK) {
      setUser(data);
    }
  }

  useEffect(() => {
    reset({
      image: user?.image ?? '',
      username: user?.username ?? '',
      bio: user?.bio ?? '',
      email: user?.email ?? '',
    });
  }, [user, reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              {...register('image')}
              placeholder="URL of profile picture"
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              {...register('username')}
              placeholder="Your Name"
            />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows={8}
              {...register('bio')}
              placeholder="Short bio about you"
            ></textarea>
          </fieldset>
          <fieldset className="form-group">
            <input className="form-control form-control-lg"  {...register('email')} type="text" placeholder="Email" />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="Password"
              {...register('password')}
            />
          </fieldset>
          <FormActions />
        </fieldset>
      </form>
    </FormProvider>
  )
}




export function Settings() {
  const navigate = useNavigate();
  const { logOut } = useAuthActions();

  function handleLogout() {
    logOut();
    navigate('/');
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <Form />

            <hr />

            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}