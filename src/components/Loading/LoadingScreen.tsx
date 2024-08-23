// components/LoadingScreen.tsx

import React from 'react';

export const LoadingScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="text-white text-xl">Loading...</div>
        </div>
    );
};
