// Virtual filesystem: maps "files" the visitor can `ls`/`cat` to the command
// that renders their contents.
export const files: Record<string, string> = {
  'about.txt': 'about',
  'experience.md': 'experience',
  'projects.md': 'projects',
  'skills.txt': 'skills',
  'contact.txt': 'contact',
  'resume.pdf': 'resume',
};
