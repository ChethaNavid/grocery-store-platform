import React from 'react'

const AdsCard = ({ onShopNow }) => {
  return (
    <div className='py-5 px-4 text-white mt-8 mx-2.5 rounded-lg bg-gradient-to-b from-[#10B981] to-[#059669]'>
        <p className='text-2xl font-bold mb-4'>Fresh groceries delivered to your door</p>
        <p className='text-lg mb-8 font-light'>Shop from thousands of products and get them delivered in as fast as 1 hour</p>
        <button 
          className='bg-white text-primary font-semibold text-sm px-[12px] py-4 rounded-lg outline-none'
          onClick={onShopNow}
        >
          Shop Now
        </button>
    </div>
  )
}

export default AdsCard