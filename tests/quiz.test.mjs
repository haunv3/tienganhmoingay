import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const compiled=ts.transpileModule(fs.readFileSync('src/lib/quiz.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
const context={exports:{}};vm.runInNewContext(compiled,context);
const {matchesFill,countWords,normaliseAnswer}=context.exports;
test('accepted number spellings and case are supported without accepting extra words',()=>{
 const q={answer:'15',acceptedAnswers:['fifteen'],maxWords:1};
 assert.equal(matchesFill(q,' FIFTEEN '),true);assert.equal(matchesFill(q,'15'),true);
 assert.equal(matchesFill(q,'fifteen pounds'),false);assert.equal(matchesFill(q,'fifty'),false);
});
test('normalisation does not remove meaningful words or fabricate equivalence',()=>{
 assert.equal(normaliseAnswer('  I’m   ready  '),"i'm ready");
 assert.equal(matchesFill({answer:'is'},'IS'),true);assert.equal(matchesFill({answer:'is'},'are'),false);
 assert.equal(countWords(''),0);assert.equal(countWords('one   two\nthree'),3);
});
