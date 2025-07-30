"use client";

import { socialPlatforms } from '@/Structure/DefaultStructures';
import React from 'react';
import FormInput from '../Forms/FormInput';


const SocialLinkSelector = ({ socialLinks = {}, setSocialLinks = ()=>{} }) => {
    const handleChange = (key, value) => {
        setSocialLinks({ ...socialLinks, [key]: value });
    };

    return (
        <div className="space-y-4 ">
            {socialPlatforms.map(({ name, icon, key }) => (
                <div key={key} className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded text-xl text-gray-700">
                        {icon}
                    </div>
                    <FormInput
                        value={socialLinks[key] || ''}
                        onChange={(e) => handleChange(key, e.target.value)}
                        size='small'
                        label={null}
                        placeholder={'Enter link'}
                    />
                </div>
            ))}
        </div>
    );
};

export default SocialLinkSelector;