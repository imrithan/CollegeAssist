import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Award, Sparkles, Filter } from 'lucide-react';
import { College } from '../types';
import { CollegeLogo } from '../components/CollegeLogos';
import { CollegeDetailsModal } from '../components/CollegeDetailsModal';
import { useAuth } from '../context/AuthContext';
import { apiUrl } from '../config/api';

export const Recommendations: React.FC = () => {
  const { profile, token } = useAuth();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchRecommendations();
  }, [profile]);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (profile) {
        if (profile.preferred_location) queryParams.append('location', profile.preferred_location);
        if (profile.preferred_degree) queryParams.append('degree', profile.preferred_degree);
        if (profile.academic_score) queryParams.append('score', profile.academic_score.toString());
        if (profile.interests && profile.interests.length > 0) {
          queryParams.append('interests', profile.interests.join(','));
        }
      }

      const res = await fetch(apiUrl(`/api/recommendations?${queryParams.toString()}`), {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });

      if (res.ok) {
        const data = await res.json();
        setColleges(data.recommendations || []);
      } else {
        fallbackColleges();
      }
    } catch (err) {
      fallbackColleges();
    } finally {
      setLoading(false);
    }
  };

  const fallbackColleges = () => {
    setColleges([
      {
        id: 1,
        name: 'IIT Madras',
        programme: 'B.Tech in Computer Science and Engineering',
        degree: 'B.Tech',
        stream: 'Computer Science',
        location: 'Chennai, Tamil Nadu',
        state: 'Tamil Nadu',
        duration: '4 Years',
        cutoff: '95+',
        min_cutoff: 95,
        nirf_rank: 1,
        fees: '₹2.1 Lakhs/year',
        placements: 'Average ₹21.4 LPA',
        logo_type: 'iitm'
      },
      {
        id: 2,
        name: 'Anna University',
        programme: 'B.Tech in Computer Science and Engineering',
        degree: 'B.Tech',
        stream: 'Computer Science',
        location: 'Chennai, Tamil Nadu',
        state: 'Tamil Nadu',
        duration: '4 Years',
        cutoff: '90+',
        min_cutoff: 90,
        nirf_rank: 14,
        fees: '₹55,000/year',
        placements: 'Average ₹8.5 LPA',
        logo_type: 'anna'
      },
      {
        id: 3,
        name: 'Coimbatore Institute of Technology',
        programme: 'B.Tech in Computer Science and Engineering',
        degree: 'B.Tech',
        stream: 'Computer Science',
        location: 'Coimbatore, Tamil Nadu',
        state: 'Tamil Nadu',
        duration: '4 Years',
        cutoff: '85+',
        min_cutoff: 85,
        nirf_rank: 102,
        fees: '₹75,000/year',
        placements: 'Average ₹7.2 LPA',
        logo_type: 'cit'
      }
    ]);
  };

  // The 3 primary colleges match Figure 13
  const topColleges = colleges.slice(0, 3);
  const remainingColleges = colleges.slice(3);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Outer Card matching Figure 13 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-10">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Recommended Programmes
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Based on your profile, here are the best programs for you:
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              <span>{showAll ? 'Show Top 3 Only' : `Explore All (${colleges.length})`}</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-slate-500">Matching your profile with 30+ programs...</p>
          </div>
        ) : (
          <div>
            {/* Top 3 Cards Grid exactly matching Figure 13 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topColleges.map((college) => (
                <div
                  key={college.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
                >
                  <div>
                    {/* College Logo */}
                    <div className="mb-5 flex justify-start">
                      <CollegeLogo
                        type={college.logo_type || college.name}
                        name={college.name}
                        className="w-16 h-16 shrink-0"
                      />
                    </div>

                    {/* Titles */}
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">
                      {college.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 mb-5">
                      {college.programme}
                    </p>

                    {/* Metadata list matching Figure 13 */}
                    <div className="space-y-3 text-xs text-slate-600 mb-6">
                      <div className="flex items-center space-x-2.5">
                        <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                        <span>Location: {college.location}</span>
                      </div>

                      <div className="flex items-center space-x-2.5">
                        <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                        <span>Course Duration: {college.duration}</span>
                      </div>

                      <div className="flex items-center space-x-2.5">
                        <Award className="w-4 h-4 text-slate-500 shrink-0" />
                        <span>Expected Cutoff: {college.cutoff}</span>
                      </div>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    id={`view-details-${college.id}`}
                    onClick={() => setSelectedCollege(college)}
                    className="w-full py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-lg text-sm shadow-sm transition-colors duration-150 text-center"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>

            {/* Additional Colleges Grid if expanded */}
            {showAll && remainingColleges.length > 0 && (
              <div className="mt-10 pt-8 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Other Relevant Programs for Your Profile</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {remainingColleges.map((college) => (
                    <div
                      key={college.id}
                      className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
                    >
                      <div>
                        <div className="mb-4">
                          <CollegeLogo
                            type={college.logo_type || college.name}
                            name={college.name}
                            className="w-14 h-14 shrink-0"
                          />
                        </div>
                        <h3 className="text-base font-bold text-slate-900">{college.name}</h3>
                        <p className="text-xs text-slate-500 font-medium mt-0.5 mb-4">{college.programme}</p>
                        <div className="space-y-2.5 text-xs text-slate-600 mb-6">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{college.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{college.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Award className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="font-semibold text-blue-700">Cutoff: {college.cutoff}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedCollege(college)}
                        className="w-full py-2 px-4 bg-slate-50 hover:bg-blue-600 hover:text-white text-blue-600 font-semibold rounded-lg text-xs border border-blue-200 hover:border-transparent transition-colors duration-150"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Details Modal */}
      <CollegeDetailsModal
        college={selectedCollege}
        onClose={() => setSelectedCollege(null)}
      />
    </div>
  );
};
