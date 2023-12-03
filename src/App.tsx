import React, { useState, useEffect, FormEvent } from 'react';
import InputComponent from './components/InputComponent';
import StatesComponent from './components/StatesComponent';
import { Errors, FormData, email, emailRegex, firstName, lastName, mobileNumber, qualification } from './utils/utils';
import { statesData } from './utils/States';
import styles from "./app.module.css";
import toast from 'react-hot-toast';
import PHN from "../src/assets/phn.png";

const App: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: null,
    state: '',
    district: '',
    isTaluka: null,
    qualification: 'Select qualification',
    captcha: {
      operand1: 0,
      operand2: 0,
      answer: 0,
      userAnswer: '',
    },
  });

  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    state: "",
    email: "",
    qualification: "",
    isTaluka:'',
    captcha: '',
  });

  useEffect(() => {
    generateRandomAdditionProblem();
  }, []);

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = event.target.value;
    setSelectedState(newState);
    const districts = statesData.find((state: any) => state.state === newState)?.districts || [];
    setSelectedDistrict(districts[0] || '');
  };

  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDistrict = event.target.value;
    setSelectedDistrict(newDistrict);
  };

  const validateEmail = (value: string) => {
    if (!emailRegex.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email address' }));
      return false;
    }
    setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    return true;
  };

  const validateAlphabets = (name: string, value: string) => {
    if (!/^[a-zA-Z]+$/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: 'Only alphabets are allowed' }));
      return false;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    return true;
  };

  const forFormChange = (e: any) => {
    const { name, value } = e.target;
    let isValid = true;

    if (name === 'email') {
      isValid = validateEmail(value);
    } else if (name === 'firstName' || name === 'lastName' || name === 'state') {
      isValid = validateAlphabets(name, value);
    }

    if (isValid) {
      const formatData = name === 'mobileNumber' ? parseInt(value, 10) : value;
      setForm({ ...form, [name]: formatData });
    }
  };

  const forQualificationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setForm({ ...form, qualification: value });
  };

  const generateRandomAdditionProblem = () => {
    const operand1 = Math.floor(Math.random() * 10);
    const operand2 = Math.floor(Math.random() * 10);
    const answer = operand1 + operand2;

    setForm((prevForm) => ({
      ...prevForm,
      captcha: {
        operand1,
        operand2,
        answer,
        userAnswer: '',
      },
    }));
  };

  const resetForm = () => {
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: null,
      state: '',
      district: '',
      isTaluka: null,
      qualification: 'Select qualification',
      captcha: {
        operand1: 0,
        operand2: 0,
        answer: 0,
        userAnswer: '',
      },
    });
    setSelectedState('');
    setSelectedDistrict('');
    setErrors({
      firstName: "",
      lastName: "",
      mobileNumber: "",
      state: "",
      email: "",
      qualification: "",
      isTaluka:'',
      captcha: '',
    });
  };

  const forSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Errors = {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      state: "",
      email: "",
      qualification: "",
      isTaluka:'',
      captcha: '',
    };

    if (!form.firstName) {
      newErrors.firstName = 'First name is required';
    }

    if (!form.lastName) {
      newErrors.lastName = 'Last name is required';
    }

    if (form.mobileNumber === null || form.mobileNumber.toString().length !== 10) {
      newErrors.mobileNumber = 'Mobile number must be 10 digits';
    }

    if (!selectedState) {
      newErrors.state = 'State is required';
    }

    if (!form.email) {
      newErrors.email = 'Email is required';
    } else {
      validateEmail(form.email);
    }

    if (form.qualification === 'Select qualification') {
      newErrors.qualification = 'Please select a qualification';
    }

    if (!form.isTaluka) {
      newErrors.isTaluka = 'Taluka is required';
    }

    if (!form.captcha.userAnswer) {
      newErrors.captcha = 'Captcha is required';
    } else if (parseInt(form.captcha.userAnswer, 10) !== form.captcha.answer) {
      newErrors.captcha = 'Invalid captcha';
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== '')) {
      toast.error('Please fill all fields');
      return;
    }

    if (parseInt(form.captcha.userAnswer, 10) === form.captcha.answer) {
      console.log({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        state: selectedState,
        district: selectedDistrict,
        qualification: form.qualification,
        isTaluka: form.isTaluka,
      });
      toast.success('Form submitted successfully!');
      resetForm();
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-col p-12">
        <div className="flex justify-center items-center lg:justify-center lg:flex-row md:flex-col sm:flex-col flex-col w-full md:w-8/12 lg:w-11/12 mx-auto">
          <div className="text-center md:text-left">
            <h1 className={`text-4xl font-bold ${styles.jobtxt}`}>#JOB</h1>
            <h1 className={`text-5xl font-bold ${styles.maintxt}`}>Get <span className={styles.jobtxt}>IT jobs</span> in your <br />city</h1>
            <p className="text-slate-500 md:w-full">Explore exciting career opportunities at PHN technology</p>
          </div>
          <div className="mt-4 md:mt-0 md:w-full lg:w-1/2">
            <img src={PHN} className="w-full h-auto" alt="" />
          </div>
        </div>

        <div className={styles.container}>
          <form className="w-full max-w-lg" onSubmit={forSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <InputComponent value={form.firstName} data={firstName} changeFunction={forFormChange} error={errors.firstName} />
              <InputComponent value={form.lastName} data={lastName} changeFunction={forFormChange} error={errors.lastName} />
              <InputComponent value={form.mobileNumber} data={mobileNumber} changeFunction={forFormChange} error={errors.mobileNumber} />
              <InputComponent data={email} changeFunction={forFormChange} error={errors.email} />
              <StatesComponent
                selectedState={selectedState}
                selectedDistrict={selectedDistrict}
                handleStateChange={handleStateChange}
                handleDistrictChange={handleDistrictChange} error={errors.state}
              />
              <div className="w-full md:w-1/2 my-4 px-3">
                <select
                  className="w-full bg-white text-md border-solid border-2 border-neutral-300 py-4 px-12 rounded"
                  id="grid-state"
                  value={form.isTaluka === null ? 'Select Taluka' : form.isTaluka ? 'Yes' : 'No'}
                  onChange={(e) => {
                    const value = e.target.value === 'Yes' ? true : e.target.value === 'No' ? false : null;
                    setForm({ ...form, isTaluka: value });
                  }}
                >
                  <option disabled>Select Taluka</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
                {errors.isTaluka && <div className="text-red-500">{errors.isTaluka}</div>}
              </div>

              <div className="w-full md:w-1/2 my-4 px-3">
                <select
                  className="w-full bg-white text-md border-solid border-2 border-neutral-300 py-4 px-12 rounded"
                  id="grid-qualification"
                  value={form.qualification}
                  onChange={forQualificationChange}
                >
                  <option value="Select qualification" disabled>Select qualification</option>
                  {qualification.map((item: string) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
                {errors.qualification && <div className="text-red-500">{errors.qualification}</div>}
              </div>

              <div className="flex justify-center lg:flex-row md:flex-col sm:flex-col flex-col items-center mt-8">
                <p className='mb-4'>
                  Captcha: {form.captcha.operand1} + {form.captcha.operand2} =
                </p>
                <input
                  type="text" placeholder='Enter addition'
                  value={form.captcha.userAnswer}
                  onChange={(e) => setForm({ ...form, captcha: { ...form.captcha, userAnswer: e.target.value } })}
                  className="ml-2 p-2 border-solid border-2 border-neutral-300 rounded"
                />
                {errors.captcha && <div className="text-red-500">{errors.captcha}</div>}
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button type="submit" className="bg-blue-700 text-white font-bold py-1 px-4 rounded">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
