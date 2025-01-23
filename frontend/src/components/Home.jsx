import React from 'react';

const Home = () => {
  return (
    <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="text-center">
                <img 
                src="/image.png"
                alt="TableSprint Logo"
                className="h-24 w-54 mx-auto mb-4 mx-auto"
                />
                <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                Welcome to TableSprint admin
                </h1>
                <p className="text-gray-600">
                Your restaurant management solution
                </p>
            </div>
        </div>
        <div className='flex flex-col items-center justify-center bg-red-50 p-4'>
      </div>
    </>
  );
};

export default Home;
