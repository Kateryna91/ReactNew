import React, { useRef, useState } from 'react'
import validationFields from './validation';
import { Formik, Form } from 'formik';
import MyTextInput from '../../common/MyTextInput';
import MyPhotoInput from '../../common/MyPhotoInput';
import http from "../../../http_common";
import { object } from 'prop-types';
import { useHistory } from 'react-router';

const RegisterPage = () => {

    const initState = {
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        fio: '',
        photo: null,
        // errors: {
        //     email: ''
        // }
    };

    const formikRef = useRef();
    const titleRef = useRef();

    const [invalid, setInvalid] = useState([]);
    const history = useHistory();

    function onSubmitHandler(values) {

        //Робимо форму, у якій можна відправити файл
        const formData = new FormData();
        //formData.append("email", values.email);
        //у форічі біжимо по initState і передаємо дані в форму 
        //key - email, value-ff@dd.dd
        Object.entries(values).forEach(
            ([key, value]) => formData.append(key, value)
        );

        http.post("api/account/register", formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(resp => {

                history.push("/");
            },
                bad => {
                    const errors = bad.response.data.errors;

                    Object.entries(errors).forEach(([key, values]) => {
                        let message = '';
                        values.forEach(text => message += text + " ");
                        formikRef.current.setFieldError(key, message);
                    });

                    setInvalid(errors.invalid);
                    console.log(bad.response.data);
                    titleRef.current.scrollIntoView({ behavior: 'smooth' });
                });


        // const {errors} = bad.response.data;
        // if(errors.email) {
        //     let stringa="";
        //     errors.email.forEach(message => {
        //         stringa += message + " ";
        //         console.log(message);
        //         formikRef.current.setFieldError("Email" ,message);
        //     });
        // }
    }



    return (
        <div className="row">
            <h1 ref={titleRef} className="text-center">Реєстрація</h1>
            {
                invalid && invalid.length > 0 &&
                <div className="alert alert-danger">
                    <ul>
                        {
                            invalid.map((text, index) => {
                                return (
                                    <li key={index}>{text}</li>

                                );
                            })
                        }
                    </ul>
                </div>

            }

            <div className="offset-md-3 col-md-6">
                <Formik
                    innerRef={formikRef}
                    initialValues={initState}
                    onSubmit={onSubmitHandler}
                    validationSchema={validationFields()}>
                    <Form>
                        <MyTextInput
                            label="ПІБ"
                            name="fio"
                            id="fio"
                            type="text"
                        />

                        <MyTextInput
                            label="Електронна пошта"
                            name="email"
                            id="email"
                            type="text"
                        />

                        <MyPhotoInput
                            myField="photo"
                            name="photo"
                            id="photo"
                            formikRef={formikRef}
                        />

                        <MyTextInput
                            label="Пароль"
                            name="password"
                            id="password"
                            type="password"
                        />
                        <MyTextInput
                            label="Повтор пароль"
                            name="confirmPassword"
                            id="confirmPassword"
                            type="password"
                        />


                        <button type="submit" className="btn btn-success">Реєстрація</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default RegisterPage;