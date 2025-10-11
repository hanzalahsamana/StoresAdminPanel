'use client';
import React from 'react';
import { FaExclamationTriangle, FaSignOutAlt, FaStore, FaUserSlash } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const SuspendedNotice = ({ type = 'user', reason, actions }) => {
  const isStore = type === 'store';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center border border-gray-200">
        {/* Warning Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-red-100 rounded-full">
            <FaExclamationTriangle className="w-10 h-10 text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-red-600 mb-2">{isStore ? 'Store Suspended' : 'Account Suspended'}</h2>

        {/* Message */}
        <p className="text-gray-600 mb-4">
          {isStore ? 'Your store has been temporarily suspended by the administrator.' : 'Your account has been temporarily suspended by the administrator.'}
        </p>

        {/* Reason */}
        {reason && (
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 mb-4 text-sm text-gray-700">
            <strong>Reason:</strong> {reason}
          </div>
        )}

        {/* Actions */}
        <div>{actions}</div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-gray-400 text-sm flex items-center gap-2">
        {isStore ? <FaStore className="w-4 h-4" /> : <FaUserSlash className="w-4 h-4" />}
        <span>{isStore ? 'Please contact support to reactivate your store.' : 'Please contact support to resolve this issue.'}</span>
        <HiOutlineMail className="w-4 h-4" />
      </div>
    </div>
  );
};

export default SuspendedNotice;
