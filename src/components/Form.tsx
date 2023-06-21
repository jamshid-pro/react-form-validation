
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";

interface FormData {
    username?: string;
    age?: number;
    email: string;
    password: string;

}


const Form = () => {
    const [login, setLogin] = useState<boolean>(false);

    const schema: ZodType<FormData> = z.object({
        username: z?.string()?.min(6),
        age: z?.number()?.min(18),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema),
    });
    

    // Styles
    const styles = {
        formContainer: 'flex items-center justify-center w-full h-screen px-4',
        form: 'w-[400px] sm:max-w-[400px] bg-[#fff] p-5 rounded-[20px]',
        formTitle: 'text-3xl font-semibold text-center my-5 ',
        input:'border-black p-5 my-4 placeholder:text-[#444]',
        submitButton:'w-full bg-blue-500 hover:bg-blue-400 p-2 text-[#fff] mt-4',
        singButton: 'text-cyan-600 font-semibold ml-2'
    }

    const submitData  = (data: FormData) => {
        console.log(data);
    }


  return (
    <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(submitData)} className={styles.form}>
            <h2 className={styles.formTitle}>{login ? "Sign In" : "Sign Up"}</h2>
            {!login && <>
                <input className={`${styles.input}`} {...register('username')} placeholder='Enter Your Username...' type="text" />
                {errors.username && <p className="text-red-500">{errors.username.message}</p>}
            </> }
            {!login && <>
                <input className={`${styles.input}`} {...register('age', {valueAsNumber: true})}  placeholder='Enter Your Age...' type="number" />
                {errors.age && <p className="text-red-500">{errors.age.message}</p>}
            </>}
            <input className={`${styles.input}`} {...register('email')} placeholder='Enter Your Email' type="email" />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            <input className={`${styles.input}`} {...register('password')} placeholder='Enter Your Password' type="password" />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            <button type="submit" className={styles.submitButton}>Submit</button>

            <p className="mt-2">
                {login ? 'If you don\'t have account': 'If you have account'} 
                <button onClick={() => setLogin(prev => !prev)} className={styles.singButton}>{login ? 'Sign Up': 'Sign In'}</button>
            </p>
        </form>
    </div>
  )
}

export default Form