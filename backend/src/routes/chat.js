const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { optionalAuth } = require('../middleware/auth');

function formatTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 becomes 12
  return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
}

function formatDate(date) {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// POST /api/chat
router.post('/', optionalAuth, async (req, res) => {
  try {
    const userId = req.user ? req.user.id : 1;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    const query = message.trim();
    const queryLower = query.toLowerCase();

    let response = '';
    let responseSummary = '';
    let source = 'College Database';

    // 1. Check for exact or close match to Figure 11
    if (
      (queryLower.includes('computer science') || queryLower.includes('cse')) &&
      (queryLower.includes('tamil nadu') || queryLower.includes('tamilnadu') || queryLower.includes('colleges for me'))
    ) {
      response = `Based on your interest in Computer Science and your location (Tamil Nadu), here are some top colleges you can consider:
1. IIT Madras – B.Tech in Computer Science and Engineering
2. Anna University – B.Tech in Computer Science and Engineering
3. Coimbatore Institute of Technology – B.Tech in CSE

Would you like more details about admission criteria, fees or placements?`;
      responseSummary = 'IIT Madras, Anna University, Coimbatore Institute of Technology';
      source = 'College Database';
    } else if (queryLower.includes('scholarship') || queryLower.includes('financial aid') || queryLower.includes('fee waiver')) {
      response = `Here are prime scholarship options for undergraduate engineering students:
1. AICTE Pragati Scholarship for Girls (Up to ₹50,000/year plus allowances)
2. Central Sector Scheme of Scholarships for College and University Students
3. State Post-Matric and First Graduate Tuition Fee Concession (Tamil Nadu)
4. Merit-cum-Means (MCM) Scholarships at IITs and NITs for families earning under ₹5 LPA.`;
      responseSummary = 'Merit and Government Scholarships';
      source = 'Government Portal';
    } else if (queryLower.includes('after 12th') || queryLower.includes('after 12') || queryLower.includes('courses for science')) {
      response = `Top courses after 12th Science (PCM/CS):
1. B.Tech / B.E. in Computer Science, Artificial Intelligence, Robotics, and Data Science
2. 5-Year Integrated M.Tech in Computing Systems (IIITs and Anna University)
3. B.Sc (Research) in Computational Science & Mathematical Computing (IISc Bangalore)
4. BCA with Cloud Computing and Full-Stack Development specializations.`;
      responseSummary = 'B.Tech, B.Sc, Integrated Programmes';
      source = 'University Website';
    } else if (queryLower.includes('career') || queryLower.includes('ai') || queryLower.includes('machine learning') || queryLower.includes('job')) {
      response = `Career prospects in AI and Computer Science:
1. Machine Learning Engineer (Starting package ₹12 - 28 LPA at top tier product companies)
2. Full Stack Software Engineer (High demand in cloud services, SaaS, fintech)
3. Data Scientist & Quantitative Analyst
4. Autonomous Systems & Robotics Researcher.`;
      responseSummary = 'Data Scientist, ML Engineer, Researcher';
      source = 'Career Portal';
    } else if (queryLower.includes('cutoff') || queryLower.includes('criteria') || queryLower.includes('admission')) {
      response = `Admission criteria & cutoffs for top engineering institutions:
• IIT Madras: JEE Advanced qualified; top 20 percentile in Class 12 or 75%+ aggregate.
• Anna University (CEG Campus): TNEA counseling cutoff typically 197.5+ out of 200 for CSE (approx 98%+ in PCM).
• Coimbatore Institute of Technology (CIT): TNEA cutoff around 190-194 for general category B.Tech CSE.`;
      responseSummary = 'IIT JEE Advanced & TNEA Cutoffs';
      source = 'College Database';
    } else if (queryLower.includes('fee') || queryLower.includes('cost')) {
      response = `Standard fee structures:
• Government Quota / State Universities (e.g. Anna University): ₹50,000 - ₹75,000 per year.
• Premier National Institutes (IITs/NITs): ₹1.4 - ₹2.2 Lakhs per year (with 100% fee waiver for SC/ST and income < ₹1 Lakh).
• Top Private & Deemed Universities (VIT/BITS): ₹1.9 - ₹5.4 Lakhs per year.`;
      responseSummary = 'Fee Structures by College Type';
      source = 'University Website';
    } else {
      // General contextual response using database
      const colleges = db.prepare('SELECT name, programme, location, cutoff FROM colleges LIMIT 3').all();
      const listStr = colleges.map((c, i) => `${i + 1}. ${c.name} (${c.location}) - ${c.programme} [Cutoff: ${c.cutoff}]`).join('\n');
      response = `Great question! Based on admission records and student trends, here are recommended pathways:\n\n${listStr}\n\nFeel free to ask about specific cutoffs, application deadlines, syllabus comparison, or placement statistics!`;
      responseSummary = colleges.map(c => c.name).join(', ');
      source = 'College Database';
    }

    const now = new Date();
    const dateTimeStr = `${formatDate(now)} ${formatTime(now)}`;

    // Automatically record interaction into Counseling History
    const insertHistory = db.prepare(`
      INSERT INTO counseling_history (user_id, date_time, query, response_summary, full_response, source)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const historyResult = insertHistory.run(userId, dateTimeStr, query, responseSummary, response, source);

    return res.json({
      query,
      response,
      responseSummary,
      source,
      dateTime: dateTimeStr,
      historyId: Number(historyResult.lastInsertRowid)
    });
  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({ error: 'Failed to process counseling request.' });
  }
});

module.exports = router;
