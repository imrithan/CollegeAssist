import React from 'react';
import { X, MapPin, Calendar, Award, ExternalLink, IndianRupee, Briefcase, BookOpen } from 'lucide-react';
import { College } from '../types';
import { CollegeLogo } from './CollegeLogos';

interface ModalProps {
  college: College | null;
  onClose: () => void;
}

export const CollegeDetailsModal: React.FC<ModalProps> = ({ college, onClose }) => {
  if (!college) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50 rounded-t-2xl">
          <div className="flex items-center space-x-4">
            <CollegeLogo type={college.logo_type || college.name} name={college.name} className="w-16 h-16 shrink-0" />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-bold text-slate-900">{college.name}</h3>
                {college.nirf_rank && (
                  <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    NIRF #{college.nirf_rank}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-blue-600 mt-0.5">{college.programme}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Key Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <p className="text-xs text-slate-500 font-medium">Location</p>
                <p className="text-sm font-semibold text-slate-800">{college.location}</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <p className="text-xs text-slate-500 font-medium">Course Duration</p>
                <p className="text-sm font-semibold text-slate-800">{college.duration}</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3">
              <Award className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <p className="text-xs text-slate-500 font-medium">Expected Cutoff</p>
                <p className="text-sm font-semibold text-blue-700">{college.cutoff}</p>
              </div>
            </div>
          </div>

          {/* Fees and Placements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <div className="flex items-center space-x-2 text-emerald-800 font-semibold text-sm mb-1">
                <IndianRupee className="w-4 h-4" />
                <span>Estimated Tuition Fees</span>
              </div>
              <p className="text-sm text-emerald-950 font-medium">{college.fees || 'Standard Government/University Norms'}</p>
            </div>

            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
              <div className="flex items-center space-x-2 text-blue-800 font-semibold text-sm mb-1">
                <Briefcase className="w-4 h-4" />
                <span>Placement Highlights</span>
              </div>
              <p className="text-sm text-blue-950 font-medium">{college.placements || 'High placement percentage with top tech firms'}</p>
            </div>
          </div>

          {/* Description & Overview */}
          <div>
            <div className="flex items-center space-x-2 text-slate-800 font-semibold text-sm mb-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Program & Institute Overview</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {college.description || 'Comprehensive degree program with recognized curriculum, state-of-the-art computational labs, hands-on project opportunities, and experienced faculty mentorship.'}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between rounded-b-2xl">
          {college.website ? (
            <a
              href={college.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800"
            >
              <span>Visit Official Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <div />
          )}

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert(`Application information for ${college.name} has been added to your counseling wishlist!`);
                onClose();
              }}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#2563EB] hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              Shortlist College
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
