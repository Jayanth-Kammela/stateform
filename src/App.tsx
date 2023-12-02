import React, { useState, useEffect, FormEvent } from 'react';
import InputComponent from './components/InputComponent';
import StatesComponent from './components/StatesComponent';
import { FormData, email, firstName, lastName, mobileNumber, qualification } from './utils/utils';
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

  const forFormChange = (e: any) => {
    const { name, value } = e.target;
    const formatData = name === 'mobileNumber' ? parseInt(value, 10) : value;
    setForm({ ...form, [name]: formatData });
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

  const forSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (parseInt(form.captcha.userAnswer, 10) === form.captcha.answer) {
      console.log({ ...form, state: selectedState, district: selectedDistrict });
      toast.success('Form submitted successfully!')
    } else {
      toast.error('Captcha is incorrect. Please try again.')
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
              <InputComponent data={firstName} changeFunction={forFormChange} />
              <InputComponent data={lastName} changeFunction={forFormChange} />
              <InputComponent data={mobileNumber} changeFunction={forFormChange} />
              <InputComponent data={email} changeFunction={forFormChange} />
              <StatesComponent
                selectedState={selectedState}
                selectedDistrict={selectedDistrict}
                handleStateChange={handleStateChange}
                handleDistrictChange={handleDistrictChange}
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
                  <option selected disabled>Select Taluka</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              <div className="w-full md:w-1/2 my-4 px-3">
                <select
                  className="w-full bg-white text-md border-solid border-2 border-neutral-300 py-4 px-12 rounded"
                  id="grid-state"
                  value={form.qualification}
                  onChange={forFormChange}
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