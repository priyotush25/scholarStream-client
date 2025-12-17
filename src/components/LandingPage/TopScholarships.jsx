import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ScholarshipCard from '../common/Scholarships/Card/ScholarshipCard';

const TopScholarships = () => {
    const axiosSecure = useAxiosSecure()
    const { data: topScholarships = [] } = useQuery({
        queryKey: ['top-scholarships'],
        queryFn: async () => {
            const res = await axiosSecure('/scholarships/top')
            return res.data
        }
    })
    
    return (
      <div className="group mt-10 bg-gray-900/95 border border-purple-800/30 rounded-2xl p-6 hover:bg-gray-900 hover:border-purple-500/50 transition-all duration-300 shadow-md shadow-black/30 hover:shadow-purple-500/10">
        <h3 className="text-2xl text-center py-5 font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Our Top Scholarship
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {topScholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
          ))}
        </div>
      </div>
    );
};

export default TopScholarships;