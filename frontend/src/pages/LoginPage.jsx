import { UserPlus } from "lucide-react";
import { LogIn } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router";
import useAuth from '../hooks/useAuth';
import api from "../lib/axios";

const LOGIN_URL = '/auth';

const LoginPage = () => {
  const { setAuth } = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      userRef.current.focus();
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.trim() || !pwd.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
        const response = await api.post(LOGIN_URL,
            JSON.stringify({ user, pwd }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        // console.log(JSON.stringify(response?.data));
        //console.log(JSON.stringify(response));
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({ user, pwd, roles, accessToken });
        setUser('');
        setPwd('');
        navigate(from, { replace: true });
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        errRef.current.focus();
    }
}

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <h1 className='text-3xl font-bold text-primary font-mono tracking-tighter text-center h-10 mb-20'>Goalie</h1>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Login</h2>
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className='label' htmlFor="username">
                    <span className='label-text'>Username</span>
                  </label>
                  <input type='text' placeholder='Enter Username' className='input input-bordered' id="username" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user}/>
                </div>

                <div className='form-control mb-4'>
                  <label className='label' htmlFor="password">
                    <span className='label-text'>Password</span>
                  </label>
                  <input type='password' placeholder='Enter Password' className='input input-bordered' id="password" onChange={(e) => setPwd(e.target.value)} value={pwd}/>
                </div>

                <div className="card-actions float-left">
                  <Link to={"/registration"} className='btn btn-primary' disabled={loading}>
                    {loading ? "Loading..." : "Registeration"}
                    <UserPlus className='size-5' />
                  </Link>
                </div>

                <div className="card-actions float-right">
                  <button type="submit" className="btn btn-primary">
                  {/* <button type="submit" className="btn btn-primary" disabled={loading}> */}
                    {"Log In"}
                    {/* {loading ? "Loggin in..." : "Log In"} */}
                    <LogIn className='size-5' />
                  </button>
                </div>
              </form>
              <div className='card-body flex-auto'>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;