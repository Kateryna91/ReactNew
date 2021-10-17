import React, {useRef} from 'react'
import validationFields from './validation';
import { Formik, Form} from 'formik';
import MyTextInput from '../../common/MyTextInput';
import MyPhotoInput from '../../common/MyPhotoInput';
import http from "../../../http_common";

const RegisterPage = () => {

    const initState = {
        email: '',
        password: '',
        confirmPassword: '',
        fio: '',
        photo: null
    };

    const formikRef = useRef();

    const onSubmitHandler = (values) => {

        //Робимо форму, у якій можна відправити файл
        const formData = new FormData();
        //formData.append("email", values.email);
        //у форічі біжимо по initState і передаємо дані в форму 
        //key - email, value-ff@dd.dd
        Object.entries(values).forEach(([key, value]) => formData.append(key, value));

        http.post("api/account/register", formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(resp => {
            console.log("Good Result", resp);
        }, bad =>{
            console.log(bad.response.data);
        });

        // console.log("Server submit data", values);

        // console.log("Server submit file", JSON.stringify(
        //     { 
        //       fileName: values.photo.name, 
        //       type: values.photo.type,
        //       size: `${values.photo.size} bytes`
        //     },
        //     null,
        //     2
        //   ));
    }


    return (
        <div className="row">
            <h1 className="text-center">Реєстрація</h1>
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