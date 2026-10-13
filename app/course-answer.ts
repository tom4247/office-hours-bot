export type Citation = {
  document: string;
  section: string;
  page?: number;
};

export type AnswerResponse = {
  answer: string;
  citation: Citation | null;
};

const courseKnowledge = [
  {
    keywords: ['attendance', 'attend', 'present'],
    answer:
      'Attendance is required for class participation and is tracked in the course syllabus. Students are expected to attend scheduled sessions, arrive on time, and participate in class activities as listed in the course schedule and attendance policy.',
    citation: { document: 'Example Syllabus', section: 'Attendance Policy' },
  },
  {
    keywords: ['deadline', 'due date', 'assignment', 'submit', 'submission', 'due', 'friday', '11:59'],
    answer:
      'All assignments are due Fridays at 11:59 PM through the course portal. Assignment deadlines are listed in the course schedule and should be checked before submission. Late work is handled according to the late policy described in the syllabus.',
    citation: { document: 'Example Syllabus', section: 'Course Schedule and Assignment Deadlines' },
  },
  {
    keywords: ['late', 'late policy', 'late work', 'extend', 'extension', '10%', '3 days'],
    answer:
      'Late work is accepted only under the conditions described in the late policy section of the syllabus. Assignments submitted up to 3 days after the deadline receive a 10% penalty per day, and extensions are not automatic unless approved by the instructor in advance.',
    citation: { document: 'Example Syllabus', section: 'Late Work Policy' },
  },
  {
    keywords: ['office hours', 'hours', 'contact', 'office', 'instructor', 'tuesday', 'thursday', '3:00', '4:30', 'room 214'],
    answer:
      'Office hours are Tuesday and Thursday from 3:00 PM to 4:30 PM in Room 214, or by appointment. Students should attend office hours or contact Dr. Sarah Chen at sarah.chen@university.edu for questions about course concepts, assignments, grading, and course policies.',
    citation: { document: 'Example Syllabus', section: 'Office Hours and Contact Information' },
  },
  {
    keywords: ['grade', 'grading', 'percent', 'weight', 'final grade'],
    answer:
      'The final grade is based on the categories and weights described in the grading section of the syllabus. Students should review the grading breakdown for participation, assignments, quizzes, and the final project before the semester begins.',
    citation: { document: 'Example Syllabus', section: 'Grading Breakdown' },
  },
  {
    keywords: ['participation', 'class participation', 'engagement'],
    answer:
      'Participation is part of the grade and is based on attendance, preparation, and active classroom engagement. Students should come prepared and contribute to class activities as described in the participation policy.',
    citation: { document: 'Example Syllabus', section: 'Participation Requirements' },
  },
  {
    keywords: ['email', 'contact', 'questions', 'reach out', 'sarah', 'dr. sarah'],
    answer:
      'Students should contact Dr. Sarah Chen through the university email address listed in the syllabus, sarah.chen@university.edu, for questions that are not answered in class or during office hours. The preferred contact method is the course email listed in the course information section.',
    citation: { document: 'Example Syllabus', section: 'Course Contact Information' },
  },
  {
    keywords: ['schedule', 'class schedule', 'session', 'week'],
    answer:
      'The course schedule lists the weekly topics, required readings, and assignment deadlines. Students should check the schedule before each week to stay on track with upcoming work and expectations.',
    citation: { document: 'Example Syllabus', section: 'Course Schedule' },
  },
  {
    keywords: ['extension', 'extensions', 'excused absence', 'miss class', 'absence', 'excused', 'three unexcused absences'],
    answer:
      'Students may request an extension or excused absence only under the conditions described in the course policies section of the syllabus. More than three unexcused absences may affect the final grade, and absences or extensions are not automatic; students should contact the instructor as early as possible.',
    citation: { document: 'Example Syllabus', section: 'Absence and Extension Policies' },
  },
  {
    keywords: ['exam', 'final exam', 'midterm', 'test', 'october 18', 'december 12', '10:00 am', '9:00 am'],
    answer:
      'The midterm exam is scheduled for October 18 at 10:00 AM, and the final exam is scheduled for December 12 at 9:00 AM. Course exams and assessments are scheduled according to the exam policy in the syllabus, and students should review the exam dates and academic integrity expectations before each assessment.',
    citation: { document: 'Example Syllabus', section: 'Exams and Assessment Policy' },
  },
  {
    keywords: ['reading', 'readings', 'required reading', 'textbook', 'materials'],
    answer:
      'Required readings and course materials are listed in the weekly schedule and course overview. Students are expected to complete the assigned readings before class to be prepared for discussions and activities.',
    citation: { document: 'Example Syllabus', section: 'Required Reading and Materials' },
  },
];

export function matchCourseAnswer(question: string): AnswerResponse {
  const normalized = question.toLowerCase();

  const match = courseKnowledge
    .flatMap((entry) =>
      entry.keywords
        .filter((keyword) => normalized.includes(keyword))
        .map((keyword) => ({ entry, keyword }))
    )
    .sort((first, second) => second.keyword.length - first.keyword.length)[0]?.entry;

  if (!match) {
    return {
      answer:
        'I cannot determine from the available course materials. Please ask about course content or contact the instructor for clarification.',
      citation: null,
    };
  }

  return {
    answer: match.answer,
    citation: match.citation,
  };
}
