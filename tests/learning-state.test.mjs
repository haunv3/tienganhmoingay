import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
function load(path,{blocked=false,writeBlocked=false,seed={}}={}){
  const data=new Map(Object.entries(seed));let notify=0;
  const compiled=ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  const context={exports:{},Event,Date,localStorage:{getItem:k=>{if(blocked)throw Error('blocked');return data.get(k)??null;},setItem:(k,v)=>{if(blocked || writeBlocked)throw Error('blocked');data.set(k,v);}},window:{addEventListener(){},removeEventListener(){},dispatchEvent(){notify++;}},require:()=>({useSyncExternalStore:(_subscribe,snapshot)=>snapshot()})};
  vm.runInNewContext(compiled,context);
  return {module:context.exports,data,notify:()=>notify};
}
test('selected level survives hook reads and blocked storage without touching old progress',()=>{
  for(const blocked of [false,true]){
    const w=load('src/lib/learning-level.ts',{blocked,seed:{tam_progress_v1:'existing-progress'}});
    assert.equal(w.module.useLearningLevel()[0],'foundation');
    w.module.useLearningLevel()[1]('A2');
    assert.equal(w.module.useLearningLevel()[0],'A2');
    assert.equal(w.data.get('tam_progress_v1'),'existing-progress');
    assert.equal(w.notify(),1);
  }
});
test('invalid level and invalid lesson step safely fall back; five-step lessons resume',()=>{
  const w=load('src/lib/learning-level.ts',{seed:{tam_learning_level:'B9'}});assert.equal(w.module.useLearningLevel()[0],'foundation');
  const step=load('src/lib/lesson-session.ts',{seed:{tam_step_sample:'4'}});
  assert.equal(step.module.useLessonStep('sample',4)[0],4);
  assert.equal(step.module.useLessonStep('sample',3)[0],0);
  step.module.useLessonStep('sample',4)[1](2);assert.equal(step.module.useLessonStep('sample',4)[0],2);
});
test('course completion preserves legacy slugs and does not duplicate completed lessons',()=>{
  const w=load('src/lib/progress.ts',{seed:{tam_progress_v1:JSON.stringify({completed:['bang-chu-cai','unit-01-to-be'],lastDate:null,streak:0})}});
  assert.equal(w.module.completeLesson('a2-ke-hoach'),true);
  w.module.completeLesson('a2-ke-hoach');
  assert.deepEqual(Array.from(w.module.getProgress().completed),['bang-chu-cai','unit-01-to-be','a2-ke-hoach']);
});
test('vocabulary identity distinguishes multiple meanings',()=>{
  const w=load('src/lib/vocabulary.ts');
  assert.notEqual(w.module.vocabularyId({en:'book',vi:'cuốn sách'}),w.module.vocabularyId({en:'book',vi:'đặt chỗ'}));
  assert.equal(w.module.vocabularyId({en:' BOOK ',vi:'cuốn sách'}),w.module.vocabularyId({en:'book',vi:'cuốn sách'}));
});

test('storage quota errors do not revert current level or lesson step to stale saved values',()=>{
  const level=load('src/lib/learning-level.ts',{writeBlocked:true,seed:{tam_learning_level:'A1'}});
  level.module.useLearningLevel()[1]('A2');assert.equal(level.module.useLearningLevel()[0],'A2');
  const step=load('src/lib/lesson-session.ts',{writeBlocked:true,seed:{tam_step_sample:'1'}});
  step.module.useLessonStep('sample',4)[1](3);assert.equal(step.module.useLessonStep('sample',4)[0],3);
});
test('B1, B2 and exam selections are restored with no change to older progress',()=>{
 for(const track of ['B1','B2','TOEIC','IELTS']){
   const w=load('src/lib/learning-level.ts',{seed:{tam_learning_level:track,tam_progress_v1:'old'}});
   assert.equal(w.module.useLearningLevel()[0],track);assert.equal(w.data.get('tam_progress_v1'),'old');
 }
});
