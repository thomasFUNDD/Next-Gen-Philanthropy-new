import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const OrderCard = () => {
  const initialValues = {
    persontitle: '',
    firstName: '',
    lastName: '',
    emailInput: '',
    inputLanguage: 'en-GB',
    inputNationality: 'GBR',
    addressInput1: '',
    addressInput2: '',
    addressInput3: '',
    countryCodeSelect: 'GBR',
    callingCodeSelect: '+44',
    mobileNumberInput: '',
    cityInput: 'London',
    postcodeInput: '',
    accountNumber: '146',
    personGender: '',
    enterDOB: '',
    termsCheckbox: false,
  };

  const validationSchema = Yup.object({
    persontitle: Yup.string().required('Please select a title'),
    firstName: Yup.string().required('Please enter your first name'),
    lastName: Yup.string().required('Please enter your last name'),
    emailInput: Yup.string().email('Invalid email address').required('Please enter your email'),
    addressInput1: Yup.string().required('Please enter your address'),
    mobileNumberInput: Yup.string().required('Please enter your mobile number'),
    postcodeInput: Yup.string().required('Please enter your postcode'),
    personGender: Yup.string().required('Please select your gender'),
    enterDOB: Yup.date().required('Please enter your date of birth'),
    termsCheckbox: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission logic here
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className="order-card-container">
      <header className="page-heading">
        <h1>Apply for a UTA donor card</h1>
      </header>
      <main className="page-content">
        <section className="section">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="form">
                <div className="form-group">
                  <label htmlFor="persontitle">Title:</label>
                  <Field as="select" name="persontitle" id="persontitle">
                    <option value="">Select Title</option>
                    <option value="Mr">Mr</option>
                    <option value="Miss">Miss</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                  </Field>
                  <ErrorMessage name="persontitle" component="div" className="error-message" />
                </div>
                <div className="form-group">
                  <label htmlFor="firstName">First Name:</label>
                  <Field type="text" name="firstName" id="firstName" placeholder="First Name" />
                  <ErrorMessage name="firstName" component="div" className="error-message" />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name:</label>
                  <Field type="text" name="lastName" id="lastName" placeholder="Last Name" />
                  <ErrorMessage name="lastName" component="div" className="error-message" />
                </div>
                <div className="form-group">
                  <label htmlFor="emailInput">Email:</label>
                  <Field type="email" name="emailInput" id="emailInput" placeholder="Email" />
                  <ErrorMessage name="emailInput" component="div" className="error-message" />
                </div>
                <div className="form-group">
                  <label htmlFor="inputLanguage">Language:</label>
                  <Field type="text" name="inputLanguage" id="inputLanguage" value="en-GB" readOnly />
                </div>
                <div className="form-group">
                  <label htmlFor="inputNationality">Nationality:</label>
                  <Field as="select" name="inputNationality" id="inputNationality">
                    <option value="GBR">United Kingdom</option>
                  </Field>
                </div>
                <div className="form-group">
                  <label htmlFor="addressInput1">Shipping Address 1:</label>
                  <Field type="text" name="addressInput1" id="addressInput1" placeholder="Address line" />
                  <ErrorMessage name="addressInput1" component="div" className="error-message" />
                </div>
                <div className="form-group">
                  <label htmlFor="addressInput2">Shipping Address 2:</label>
                  <Field
                    type="text"
                    name="addressInput2"
                    id="addressInput2"
                    placeholder="Optional Address line"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="addressInput3">Shipping Address 3:</label>
                  <Field
                    type="text"
                    name="addressInput3"
                    id="addressInput3"
                    placeholder="Optional Address line"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="countryCodeSelect">Country:</label>
                  <Field as="select" name="countryCodeSelect" id="countryCodeSelect">
                    <option value="GBR">United Kingdom</option>
                  </Field>
                </div>
                <div className="form-group">
                  <label htmlFor="callingCodeSelect">Calling code:</label>
                  <div className="calling-code-group">
                    <Field as="select" name="callingCodeSelect" id="callingCodeSelect">
                      <option value="+44">(+44) United Kingdom</option>
                    </Field>
                    <Field
                      type="text"
                      name="mobileNumberInput"
                      id="mobileNumberInput"
                      placeholder="Mobile Number"
                    />
                  </div>
                  <ErrorMessage name="mobileNumberInput" component="div" className="error-message" />
                </div>
                <div className="form-group">
                  <label htmlFor="cityInput">Shipping City:</label>
                  <Field type="text" name="cityInput" id="cityInput" value="London" readOnly />
                </div>
                <div className="form-group">
                  <label htmlFor="postcodeInput">Postcode:</label>
                  <Field type="text" name="postcodeInput" id="postcodeInput" placeholder="Enter your postcode" />
                  <ErrorMessage name="postcodeInput" component="div" className="error-message" />
                </div>
                <div className="form-group">
                  <label htmlFor="accountNumber">Account number:</label>
                  <Field type="text" name="accountNumber" id="accountNumber" value="146" readOnly />
                </div>
                <div className="form-group">
                  <label htmlFor="personGender">Gender:</label>
                  <Field as="select" name="personGender" id="personGender">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  <ErrorMessage name="personGender" component="div" className="error-message" />
                </div>
                <div className="form-group">
                  <label htmlFor="enterDOB">Enter DOB:</label>
                  <Field type="date" name="enterDOB" id="enterDOB" />
                  <ErrorMessage name="enterDOB" component="div" className="error-message" />
                </div>
                <div className="terms-group">
                  <Field type="checkbox" name="termsCheckbox" id="termsCheckbox" />
                  <label htmlFor="termsCheckbox">
                    The UTA donor card is subject to the terms and conditions of which can be read here by
                    completing this application you acknowledge that you have read the terms and conditions and
                    agree to abide by them:
                    <a
                      href="./assets/Documents/UTA_PAYRNET-LIMITED-MASTERCARD-TCs.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      I accept the Terms & Conditions
                    </a>
                  </label>
                  <ErrorMessage name="termsCheckbox" component="div" className="error-message" />
                </div>
                <button type="submit" id="orderCardSubmit" disabled={isSubmitting}>
                  Order Card
                </button>
              </Form>
            )}
          </Formik>
        </section>
      </main>
      <footer className="footer">
        <p>© 2023 UTA</p>
        <p>
          The UTA Prepaid Mastercard® Card is issued by PayrNet Limited and licensed by Mastercard International
          Incorporated. PayrNet Limited is authorised by the Financial Conduct Authority (FCA) to conduct
          electronic money service activities under the Electronic Money Regulations 2011 (Firm Reference Number
          900594). Mastercard is a registered trademark, and the circles design is a trademark of Mastercard
          International Incorporated.
        </p>
      </footer>
    </div>
  );
};

export default OrderCard;