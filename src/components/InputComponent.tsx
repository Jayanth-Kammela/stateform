import React from 'react';
import styles from '../app.module.css'

interface componetProps {
    data: any;
    changeFunction: any;
    error?:string;
    value?:any
}

const InputComponent: React.FC<componetProps> = (data) => {

    return (
        <React.Fragment>
            <div className="w-full my-4 md:w-1/2 px-3" key={data.data}>
                <input value={data.value} type={data.data.type} name={data.data.name} autoComplete='off' className={`${styles.input} py-3 px-4 my-1 block w-full bg-white text-md border-solid border-2 border-neutral-300`} placeholder={data.data.placeholder} onChange={data.changeFunction} />
                <p className="text-red-500">{data.error}</p>
            </div>
        </React.Fragment>
    )
}

export default InputComponent