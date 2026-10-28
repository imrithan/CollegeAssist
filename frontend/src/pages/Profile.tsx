import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown, X, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { StudentProfile } from '../types';
import { apiUrl } from '../config/api';

export const Profile: React.FC = () => {
  const { profile, updateProfileState, token } = useAuth();

  const [name, setName] = useState('Rithan V');
  const [dob, setDob] = useState('2006-05-12');
  const [stream, setStream] = useState('Computer Science');
  const [location, setLocation] = useState('Tamil Nadu');
  const [interests, setInterests] = useState<string[]>(['Computer Science', 'Artificial Intelligence']);
  const [degree, setDegree] = useState('B.Tech');
  const [academicScore, setAcademicScore] = useState<number | string>(92);

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [interestDropdownOpen, setInterestDropdownOpen] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name || 'Rithan V');
      setDob(profile.dob || '2006-05-12');
      setStream(profile.class_12_stream || 'Computer Science');
      setLocation(profile.preferred_location || 'Tamil Nadu');
      if (Array.isArray(profile.interests) && profile.interests.length > 0) {
        setInterests(profile.interests);
      }
      setDegree(profile.preferred_degree || 'B.Tech');
      setAcademicScore(profile.academic_score ?? 92);
    }
  }, [profile]);

  const streamOptions = [
    'Computer Science',
    'Science (PCM)',
    'Science (PCB)',
    'Commerce',
    'Arts & Humanities'
  ];

  const locationOptions = [
    'Tamil Nadu',
    'Karnataka',
    'Maharashtra',
    'Delhi NCR',
    'Telangana',
    'Andhra Pradesh',
    'Kerala',
    'West Bengal',
    'Rajasthan'
  ];

  const degreeOptions = [
    'B.Tech',
    'B.E.',
    'B.Sc',
    'BCA',
    'Integrated M.Tech',
    'BBA'
  ];

  const availableInterests = [
    'Computer Science',
    'Artificial Intelligence',
    'Machine Learning',
    'Data Science',
    'Cyber Security',
    'Robotics',
    'Information Technology',
    'Software Engineering'
  ];

  const handleRemoveInterest = (item: string) => {
    setInterests(interests.filter((i) => i !== item));
  };

  const handleAddInterest = (item: string) => {
    if (!interests.includes(item)) {
      setInterests([...interests, item]);
    }
    setInterestDropdownOpen(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    const payload: StudentProfile = {
      name: name.trim(),
      dob,
      class_12_stream: stream,
      preferred_location: location,
      interests,
      preferred_degree: degree,
      academic_score: Number(academicScore)
    };

    try {
      const res = await fetch(apiUrl('/api/profile'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        updateProfileState(data.profile || payload);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3500);
      } else {
        alert('Failed to save profile. Please check all fields.');
      }
    } catch (err) {
      // Local fallback
      updateProfileState(payload);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Outer White Card matching Figure 12 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Student Profile
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Please fill in your details to get personalized recommendations.
            </p>
          </div>

          {savedSuccess && (
            <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-xl text-xs font-semibold animate-fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Profile Saved Successfully</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSave}>
          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="profile-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="profile-dob"
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 appearance-none pr-10"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Class 12 Stream */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Class 12 Stream <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="profile-stream"
                    value={stream}
                    onChange={(e) => setStream(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 appearance-none pr-10"
                  >
                    {streamOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Preferred Location */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Preferred Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="profile-location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 appearance-none pr-10"
                  >
                    {locationOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Interests Multi-Select */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Interests <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div
                    onClick={() => setInterestDropdownOpen(!interestDropdownOpen)}
                    className="min-h-[46px] w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white flex flex-wrap items-center gap-2 cursor-pointer focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-600 pr-10"
                  >
                    {interests.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-[#EBF3FE] text-blue-700 text-xs font-semibold border border-blue-100"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveInterest(item);
                          }}
                          className="hover:text-blue-900 focus:outline-none"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                    {interests.length === 0 && (
                      <span className="text-slate-400 text-sm">Select interests...</span>
                    )}
                  </div>
                  <ChevronDown
                    className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 cursor-pointer"
                    onClick={() => setInterestDropdownOpen(!interestDropdownOpen)}
                  />

                  {interestDropdownOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-40 max-h-52 overflow-y-auto">
                      {availableInterests.map((item) => {
                        const isSelected = interests.includes(item);
                        return (
                          <div
                            key={item}
                            onClick={() => {
                              if (isSelected) handleRemoveInterest(item);
                              else handleAddInterest(item);
                            }}
                            className={`px-3.5 py-2 text-sm flex items-center justify-between cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-blue-50 text-blue-700 font-medium'
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>{item}</span>
                            {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Preferred Degree */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Preferred Degree <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="profile-degree"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 appearance-none pr-10"
                  >
                    {degreeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Academic Score */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Academic Score (out of 100) <span className="text-red-500">*</span>
                </label>
                <input
                  id="profile-score"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  required
                  value={academicScore}
                  onChange={(e) => setAcademicScore(e.target.value)}
                  placeholder="92"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Bottom Right Save Button matching Figure 12 */}
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              id="save-profile-btn"
              type="submit"
              disabled={saving}
              className="px-7 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors duration-150 text-sm flex items-center space-x-2"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
