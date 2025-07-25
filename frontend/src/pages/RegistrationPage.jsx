import { UserPlus, Check, X, Info, ArrowLeftIcon } from "lucide-react";
import {  } from "lucide-react";
import toast from "react-hot-toast";
import { useRef, useState, useEffect } from "react";;
import api from "../lib/axios";
import { Link, useNavigate } from "react-router";

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
        <div className='min-h-screen bg-base-200'>
        <div className='container mx-auto px-4 py-8'>
            <div className='max-w-2xl mx-auto'>
            <h1 className='text-3xl font-bold text-primary font-mono tracking-tighter text-center h-10'>Goalie</h1>

            <Link to={"/login"} className='btn btn-ghost mb-6'>
                <ArrowLeftIcon className='size-5' />
                Back to Login
            </Link>
            <div className='card bg-base-100'>
                <div className='card-body'>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                <h2 className='card-title text-2xl mb-4'>Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-control mb-4'>
                    <label className='label' htmlFor="username">
                        <span className='label-text'>Username</span>
                        {/* <Check className={validName ? "valid" : "hide"} />
                        <X className={validName || !user ? "hide" : "invalid"} /> */}
                    </label>
                    <input type='text' placeholder='Enter Username' className='input input-bordered' id="username" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user}/>
                    </div>

                    <div className='form-control mb-4'>
                    <label className='label' htmlFor="password">
                        <span className='label-text'>Password</span>
                        {/* <Check className={validPwd ? "valid" : "hide"} />
                        <X className={validPwd || !pwd ? "hide" : "invalid"} /> */}
                    </label>
                    <input type='password' placeholder='Enter Password' className='input input-bordered' id="password" onChange={(e) => setPwd(e.target.value)} value={pwd}/>
                    </div>
                
                    <div className='form-control mb-4'>
                    <label className='label' htmlFor="confirm_pwd">
                        <span className='label-text'>Confirm Password</span>
                        {/* <Check className={validMatch && matchPwd ? "valid" : "hide"} />
                        <X className={validMatch || !matchPwd ? "hide" : "invalid"} /> */}
                    </label>
                    <input type='password' placeholder='Enter Password' className='input input-bordered' id="confirm_pwd" onChange={(e) => setMatchPwd(e.target.value)} value={matchPwd}/>
                    </div>

                    <div className="card-actions justify-end">
                    <button type="submit" className="btn btn-primary" disabled={!validName || !validPwd || !validMatch ? true : false}>
                        {"Create Account"}
                        <UserPlus className='size-5' />
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };

export default RegistrationPage;