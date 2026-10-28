import React from 'react';
import { User, GraduationCap, MessageSquare, BookmarkCheck, ArrowRight, Sparkles, MapPin, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HomeProps {
  onNavigate: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { user, profile } = useAuth();

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Welcome Hero Card */}
      <div className="bg-gradient-to-r from-[#0F243A] via-[#153456] to-[#1E4574] rounded-2xl p-8 md:p-10 text-white shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-200 border border-blue-400/30 px-3.5 py-1 rounded-full text-xs font-semibold mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>AI Admission Counselor Online</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Welcome back, {user?.full_name || 'Rithan V'}!
          </h1>
          <p className="mt-2 text-slate-300 text-sm md:text-base leading-relaxed">
            Your personalized admission counselor is ready with tailored college recommendations, cutoff analyses, and scholarship guidelines.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('recommendations')}
              className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center space-x-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>View Recommendations</span>
            </button>
            <button
              onClick={() => onNavigate('chat')}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg backdrop-blur-sm transition-colors flex items-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask AI Counselor</span>
            </button>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
              <User className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Student Profile</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Configured for {profile?.class_12_stream || 'Computer Science'} in {profile?.preferred_location || 'Tamil Nadu'}.
            </p>
            <div className="space-y-1.5 text-xs text-slate-600 mb-6 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p><span className="font-semibold text-slate-700">Preferred Degree:</span> {profile?.preferred_degree || 'B.Tech'}</p>
              <p><span className="font-semibold text-slate-700">Academic Score:</span> {profile?.academic_score || 92}%</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('profile')}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#2563EB] hover:text-blue-800"
          >
            <span>Update Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Top Matches Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Program Matches</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Top 3 matches evaluated based on your academic score and state preference.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-semibold text-slate-800">IIT Madras</span>
                <span className="text-blue-600 font-medium">95+ Cutoff</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-semibold text-slate-800">Anna University</span>
                <span className="text-blue-600 font-medium">90+ Cutoff</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('recommendations')}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#2563EB] hover:text-blue-800"
          >
            <span>Explore All Matches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Recent Counseling Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Counseling Logs</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Recorded questions, verified answers and verified portal references.
            </p>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600 mb-6">
              <p className="font-medium text-slate-800 truncate">Latest: Best colleges for computer science in Tamil Nadu</p>
              <p className="text-slate-500 mt-0.5">Source: College Database</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('history')}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#2563EB] hover:text-blue-800"
          >
            <span>Review Full History</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
