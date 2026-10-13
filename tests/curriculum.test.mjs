import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const authored=JSON.parse(fs.readFileSync('content/course/levels.json','utf8'));
const advanced=JSON.parse(fs.readFileSync('content/course/advanced.json','utf8'));
const unit=JSON.parse(fs.readFileSync('content/course/unit-01-to-be.json','utf8'));
function readModule(path, imports = {}) {
  const compiled = ts.transpileModule(fs.readFileSync(path,'utf8'), {compilerOptions:{esModuleInterop:true,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  const context = {exports:{}, require(name) { assert.ok(name in imports, `Unexpected import: ${name}`); return imports[name]; }};
  vm.runInNewContext(compiled,context);
  return context.exports;
}
const course=readModule('src/lib/curriculum.ts',{'../../content/course/unit-01-to-be.json':unit,'../../content/course/levels.json':authored,'../../content/course/advanced.json':advanced});
const library=readModule('src/lib/library.ts');
test('all 72 track lessons are reachable, ordered and have cumulative checkpoints',()=>{
  assert.equal(course.COURSE_LESSONS.length,72);
  assert.equal(new Set(course.COURSE_UNITS.map(u=>u.slug)).size,72);
  for(const [level,count] of [['foundation',8],['A1',14],['A2',14],['B1',10],['B2',10],['TOEIC',8],['IELTS',8]]){
    const group=course.COURSE_LESSONS.filter(l=>l.level===level);
    assert.equal(group.length,count);
    group.forEach((l,i)=>assert.equal(l.order,i+1));
    assert.equal(group.at(-1).checkpoint,true);
    assert.equal(group.filter(l=>l.checkpoint).length,1);
  }
  assert.equal(course.COURSE_LESSONS.find(l=>l.slug==='unit-01-to-be').level,'A1');
  assert.equal(course.nextLesson('missing'),undefined);
  assert.equal(course.nextLesson(course.COURSE_LESSONS.at(-1).slug),undefined);
  assert.equal(course.nextLesson('foundation-on-tong-hop').slug,'unit-01-to-be');
});
test('every lesson has usable teaching, practice, references and valid quiz answers',()=>{
  const categories=new Set(library.CATEGORIES.map(c=>`/thu-vien/${c.slug}`));
  for(const l of course.COURSE_LESSONS){
    assert.ok(l.goal.length>20,l.slug);assert.ok(l.sections.length>=2,l.slug);
    assert.ok(l.vocab.length>=4,l.slug); assert.ok(l.quiz.length>=8,l.slug);
    assert.ok(l.reading.en && l.reading.vi,l.slug);
    assert.ok(l.practice.speaking && l.practice.writing && l.practice.model,l.slug);
    assert.ok(l.practice.checklist.length>=3,l.slug);
    assert.equal(l.passMark,.8);
    l.references.forEach(r=>assert.ok(categories.has(r.href)||r.href==='/lo-trinh'||r.href==='/thu-vien'||r.href==='/luyen-thi',r.href));
    for(const q of l.quiz){assert.ok(q.explain,l.slug);if(q.type==='fill')assert.ok(q.answer.trim());else{assert.ok(Number.isInteger(q.answer));assert.ok(q.answer>=0&&q.answer<q.options.length);assert.equal(new Set(q.options).size,q.options.length);}if(q.type==='listen')assert.ok(q.word);}
  }
  assert.equal(course.COURSE_LESSONS.reduce((n,l)=>n+l.quiz.length,0),604);
});
test('pass thresholds handle boundaries and empty quiz safely',()=>{
  assert.equal(course.lessonPassed(6,8),false);assert.equal(course.lessonPassed(7,8),true);
  assert.equal(course.lessonPassed(9,12),false);assert.equal(course.lessonPassed(10,12),true);
  assert.equal(course.lessonPassed(0,0),false);assert.equal(course.lessonPassed(3,5,.6),true);
});
test('beginner library separates expansion content and retains IPA coverage',()=>{
  assert.equal(library.IPA.length,44);assert.equal(new Set(library.IPA.map(e=>e.id)).size,44);
  assert.equal(library.TENSES.length,12);assert.equal(new Set(library.TOPICS.map(e=>e.topic)).size,6);
  assert.equal(library.TENSES.find(e=>e.title==='Tương lai hoàn thành tiếp diễn').level,'extension');
  for(const entries of [library.IPA,library.TENSES,library.STRUCTURES,library.PHRASES,library.TOPICS]){assert.equal(new Set(entries.map(e=>e.id)).size,entries.length);entries.forEach(e=>{assert.ok(e.title);assert.ok(e.en);});}
});

test('exam tracks never act as a CEFR promotion and retain writing materials',()=>{
  assert.equal(course.GENERAL_LEVELS.length,5);assert.equal(course.EXAM_TRACKS.length,2);
  assert.equal(course.nextLesson('a2-on-tong-hop').level,'B1');
  assert.equal(course.nextLesson('b1-on-tong-hop').level,'B2');
  assert.equal(course.nextLesson('b2-on-tong-hop'),undefined);
  assert.equal(course.nextLesson('toeic-on-tong-hop'),undefined);
  assert.equal(course.nextLesson('ielts-on-tong-hop'),undefined);
  const task1=course.COURSE_LESSONS.find(l=>l.slug==='ielts-writing-task-1');
  const task2=course.COURSE_LESSONS.find(l=>l.slug==='ielts-writing-task-2');
  assert.ok(task1.practice.model.split(/\s+/).length>=150);
  assert.ok(task2.practice.model.split(/\s+/).length>=250);
  assert.equal(task1.practice.minWords,150);assert.equal(task2.practice.minWords,250);
  assert.equal(task1.table.rows[0][1],'60%');assert.equal(task1.table.rows[0][2],'45%');
  const toeic=course.COURSE_LESSONS.filter(l=>l.level==='TOEIC');
  assert.ok(toeic.find(l=>l.slug==='toeic-on-tong-hop').visual);
  toeic.filter(l=>['toeic-part-1','toeic-part-2','toeic-part-3','toeic-part-4'].includes(l.slug)).forEach(l=>assert.ok(l.quiz.some(q=>q.type==='listen')));
});
test('reading answers keep their intended meaning after review option randomisation',()=>{
  const part7=course.COURSE_LESSONS.find(l=>l.slug==='toeic-part-7');
  assert.equal(part7.quiz[0].options[part7.quiz[0].answer],'9 a.m.');
  const task1=course.COURSE_LESSONS.find(l=>l.slug==='ielts-writing-task-1');
  assert.equal(task1.quiz[0].options[task1.quiz[0].answer],'Car');
  const b2=course.COURSE_LESSONS.find(l=>l.slug==='b2-qua-trinh-va-ket-qua');
  assert.equal(b2.quiz[0].options[b2.quiz[0].answer],'I have written three reports.');
});
test('exam fill questions have audio and every local visual exists',()=>{
 const listening=course.COURSE_LESSONS.find(l=>l.slug==='ielts-listening');
 listening.quiz.filter(q=>q.type==='fill').forEach(q=>{assert.ok(q.audio);assert.equal(q.maxWords,1);});
 course.COURSE_LESSONS.filter(l=>l.visual).forEach(l=>assert.ok(fs.existsSync(`public${l.visual.src}`)));
 const review=course.COURSE_LESSONS.find(l=>l.slug==='toeic-on-tong-hop');
 assert.ok(review.visual,'photo questions need a visible illustration in the review');
});
