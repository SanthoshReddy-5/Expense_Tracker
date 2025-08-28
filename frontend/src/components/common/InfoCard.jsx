import React from 'react'

const InfoCard = ({icon,label,value,color}) => {
  return (
    <div className='flex gap-6 bg-black p-6 rounded-2xl border border-white'>
       <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
        {icon}
       </div>
       <div>
          <h6 className='text-sm text-white mb-1'>{label}</h6>
          <span className='text-[22px] text-primary'>₹ {value}</span>
       </div>
    </div>
  )
}

export default InfoCard