import React from 'react'
import { Star, Truck, Tag } from 'lucide-react';

const FooterCard = () => {
  return (
    <div className='flex justify-between gap-4 m-6'>
        <div className='bg-[#FEF3C7] p-8 outline-none rounded-lg'>
            <div className='flex items-center gap-2.5 font-bold text-[#92400E] mb-4'>
                <Star size={18}/>
                <p>Premium Quality</p>
            </div>
            <p className='text-[#92400E]'>Hand-picked fresh produce from local farms and trusted suppliers</p>
        </div>

        <div className='bg-[#DBEAFE] p-8 outline-none rounded-lg'>
            <div className='flex items-center gap-2.5 font-bold text-[#1E40AF] mb-4'>
                <Truck size={18}/>
                <p>Fast Delivery</p>
            </div>
            <p className='text-[#1E40AF]'>Get your groceries delivered in as fast as 1 hour to your doorstep</p>
        </div>

        <div className='bg-[#D1FAE5] p-8 outline-none rounded-lg'>
            <div className='flex items-center gap-2.5 font-bold text-[#065F46] mb-4'>
                <Tag size={18}/>
                <p>Best Prices</p>
            </div>
            <p className='text-[#065F46]'>Competitive prices with regular discounts and special offers</p>
        </div>
    </div>

    
  )
}

export default FooterCard