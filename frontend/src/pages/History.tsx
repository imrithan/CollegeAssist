import React, { useState, useEffect } from 'react';
import { ChevronRight, X, Clock, Database, Globe, Building2, Briefcase } from 'lucide-react';
import { CounselingHistoryItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { apiUrl } from '../config/api';

export const History: React.FC = () => {
  const { token } = useAuth();
  const [history, setHistory] = useState<CounselingHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<CounselingHistoryItem | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl('/api/history'), {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      } else {
        fallbackHistory();
      }
    } catch (err) {
      fallbackHistory();
    } finally {
      setLoading(false);
    }
  };

  const fallbackHistory = () => {
    setHistory([
      {
        id: 1,
        date_time: '2025-09-20 10:24 AM',
        query: 'Best colleges for computer science in Tamil Nadu',
        response_summary: 'IIT Madras, Anna University, Coimbatore Institute of Technology',
        full_response: `Based on your interest in Computer Science and your location (Tamil Nadu), here are some top colleges you can consider:
1. IIT Madras – B.Tech in Computer Science and Engineering
2. Anna University – B.Tech in Computer Science and Engineering
3. Coimbatore Institute of Technology – B.Tech in CSE

Would you like more details about admission criteria, fees or placements?`,
        source: 'College Database'
      },
      {
        id: 2,
        date_time: '2025-09-18 03:12 PM',
        query: 'Courses after 12th for science students',
        response_summary: 'B.Tech, B.Sc, Integrated Programmes',
        full_response: `Top recommended courses for Class 12 Science graduates:
• B.Tech / B.E. in specialized computer science, AI, electronics
• B.Sc (Research) in Computational Science and Data Analytics
• 5-Year Integrated M.Tech programmes at premier institutes`,
        source: 'University Website'
      },
      {
        id: 3,
        date_time: '2025-09-15 11:45 AM',
        query: 'Scholarships for engineering students',
        response_summary: 'Merit and Government Scholarships',
        full_response: `Comprehensive scholarship options include:
1. Central Sector Scheme of Scholarship for College and University Students
2. AICTE Pragati Scholarship for Girls
3. State Government First Graduate Concession (Tamil Nadu)
4. Institute Merit-cum-Means (MCM) assistance`,
        source: 'Government Portal'
      },
      {
        id: 4,
        date_time: '2025-09-10 02:30 PM',
        query: 'Career options in AI and ML',
        response_summary: 'Data Scientist, ML Engineer, Researcher',
        full_response: `Prominent career pathways:
1. Machine Learning Engineer (median package ₹12-28 LPA)
2. Applied Data Scientist
3. AI Research Scientist & NLP Specialist
4. Computer Vision Architect`,
        source: 'Career Portal'
      }
    ]);
  };

  const getSourceBadge = (source: string) => {
    switch (source) {
      case 'College Database':
        return 'text-slate-700';
      case 'University Website':
        return 'text-slate-700';
      case 'Government Portal':
        return 'text-slate-700';
      case 'Career Portal':
        return 'text-slate-700';
      default:
        return 'text-slate-700';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Outer Card matching Figure 14 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-10">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            Counseling History
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            View your previous queries, responses and source information.
          </p>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-xl border border-slate-200/90">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-[#F8FAFC] text-slate-800 text-[13.5px] font-semibold">
                <th className="py-4 px-6 w-1/5">Date & Time</th>
                <th className="py-4 px-6 w-1/4">Query</th>
                <th className="py-4 px-6 w-1/3">Response Summary</th>
                <th className="py-4 px-6 w-1/6">Source</th>
                <th className="py-4 px-4 w-12 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {history.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => setSelectedItem(row)}
                  className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-6 text-slate-700 text-xs font-normal whitespace-nowrap">
                    {row.date_time}
                  </td>
                  <td className="py-4 px-6 text-slate-800 text-xs font-normal">
                    {row.query}
                  </td>
                  <td className="py-4 px-6 text-slate-700 text-xs font-normal leading-relaxed">
                    {row.response_summary}
                  </td>
                  <td className={`py-4 px-6 text-xs font-normal ${getSourceBadge(row.source)}`}>
                    {row.source}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors inline-block" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Query Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-xs text-slate-500">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{selectedItem.date_time}</span>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Query Asked
                </p>
                <p className="text-base font-semibold text-slate-900 bg-blue-50/50 p-3.5 rounded-xl border border-blue-100/50">
                  {selectedItem.query}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Counselor Response
                </p>
                <div className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-line">
                  {selectedItem.full_response || selectedItem.response_summary}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium">
                  Source: {selectedItem.source}
                </span>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 bg-[#2563EB] text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
