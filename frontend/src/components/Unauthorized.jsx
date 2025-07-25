import { Link, useNavigate } from "react-router"
import { StepBack } from "lucide-react";
import { LogOut } from 'lucide-react'

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <div className='min-h-screen bg-base-200'>
        <div className='container mx-auto px-4 py-8'>
            <div className='max-w-2xl mx-auto'>
            <h1 className='text-3xl font-bold text-primary font-mono tracking-tighter text-center h-10 mb-20'>Goalie</h1>
            <div className='card bg-base-100'>
                <div className='card-body'>
                <h2 className='card-title text-2xl mb-4'>Unauthorized</h2>
                    <div className='card-body flex-auto'>
                        <div className="card-actions">
                            <div className="float-left">
                            <Link to={goBack} className='btn btn-primary' onClick={goBack}>
                                {"Go Back"}
                                <StepBack className='size-5' />
                            </Link>
                            </div>
                            <div className="float-right">
                            <Link to={"/login"} className='btn btn-primary' onClick={goBack}>
                                {"Change User"}
                                <LogOut className='size-5' />
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Unauthorized