import React from 'react';
import { statesData } from '../utils/States';

interface StatesComponentProps {
    selectedState: string;
    selectedDistrict: string;
    handleStateChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleDistrictChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    error?:any
}

const StatesComponent: React.FC<StatesComponentProps> = ({ selectedState, selectedDistrict, handleStateChange, handleDistrictChange,error }) => {

    return (
        <React.Fragment>
            <div className="flex lg:flex-row md:flex-row md:flex-row flex-col ">
                <div className="w-full my-4 px-3">
                    <select value={selectedState} onChange={handleStateChange} className="w-full bg-white text-md border-solid border-2 border-neutral-300 py-4 px-12 rounded" id="grid-state">
                        <option value="" disabled>Select State</option>
                        {statesData.map((state) => (
                            <option key={state.state} value={state.state}>
                                {state.state}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                    <p className="text-red-500">{error}</p>
                </div>
                

                <div className="w-full my-4 px-3">
                    <select value={selectedDistrict} onChange={handleDistrictChange} className="w-full bg-white text-md border-solid border-2 border-neutral-300 py-4 px-12  rounded" id="grid-state">
                        {selectedState ? (
                            statesData
                                .find((state) => state.state === selectedState)
                                ?.districts.map((district) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))
                        ) : (
                            <option value="" disabled>Select District</option>
                        )}
                    </select>
                </div>
            </div>
        </React.Fragment>
    );
};

export default StatesComponent;