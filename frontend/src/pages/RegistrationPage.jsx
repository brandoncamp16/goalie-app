// import { ArrowLeftIcon } from "lucide-react";
// import { UserPlus } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { Link, useNavigate } from "react-router";
// import api from "../lib/axios";

// const RegistrationPage = () => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title.trim() || !content.trim()) {
//       toast.error("All fields are required");
//       return;
//     }

//     setLoading(true);
//     try {
//       toast.success("Account Created Successfully");
//       navigate("/login");
//     } catch (error) {
//       console.log("Error creating entry", error);
//       if (error.response.status === 429) {
//         toast.error("Slow down! You're going too fast", {
//           duration: 4000,
//           icon: "🛑",
//         });
//       } else {
//         toast.error("Failed to create account");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='min-h-screen bg-base-200'>
//       <div className='container mx-auto px-4 py-8'>
//         <div className='max-w-2xl mx-auto'>
//           <h1 className='text-3xl font-bold text-primary font-mono tracking-tighter text-center h-10'>Goalie</h1>

//           <Link to={"/login"} className='btn btn-ghost mb-6'>
//             <ArrowLeftIcon className='size-5' />
//             Back to Login
//           </Link>
//           <div className='card bg-base-100'>
//             <div className='card-body'>
//               <h2 className='card-title text-2xl mb-4'>Registration</h2>
//               <form onSubmit={handleSubmit}>
//                 <div className='form-control mb-4'>
//                   <label className='label'>
//                     <span className='label-text'>Email Address</span>
//                   </label>
//                   <input type='text' placeholder='Enter Email' className='input input-bordered' value={title} onChange={(e) => setTitle(e.target.value)} />
//                 </div>

//                 <div className='form-control mb-4'>
//                   <label className='label'>
//                     <span className='label-text'>Password</span>
//                   </label>
//                   <input type='password' placeholder='Enter Password' className='input input-bordered' value={content} onChange={(e) => setContent(e.target.value)} />
//                 </div>

//                 <div className="card-actions justify-end">
//                   <button type="submit" className="btn btn-primary" disabled={loading}>
//                     {loading ? "Creating Account..." : "Create Account"}
//                     <UserPlus className='size-5' />
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default RegistrationPage;

import { useRef, useState, useEffect } from "react";
import { Info, X, Check } from "lucide-react";
import api from "../lib/axios";
import { Link } from "react-router";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const RegistrationPage = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await api.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                            <Check className={validName ? "valid" : "hide"} />
                            <X className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <Info />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor="password">
                            Password:
                            <Check className={validPwd ? "valid" : "hide"} />
                            <X className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <Info />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <Check className={validMatch && matchPwd ? "valid" : "hide"} />
                            <X className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <Info />
                            Must match the first password input field.
                        </p>

                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            <Link to="/">Sign In</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default RegistrationPage