declare var describe: Mocha.IContextDefinition;

import { expect } from 'chai';
import {sprintf} from './index';

describe('sprintf.js', function(){

    describe('checks with function sources:', function(){

        it('with function code only, default mode', (testDone) => {
            const func = function(){return 'test';};
            const placeholder = function(){
                return /%funcSource%/;
            };
            const expected = func();
            const src = sprintf(placeholder.toString(), {funcSource: func.toString()});
            const result = new Function(`return ${src};`)();

            expect(result()()).to.eql(expected);
            testDone();
        });

        it('with function code only, sloppy mode', (testDone) => {
            const func = function(){return 'test';};
            const placeholder = function(){
                return /%funcSource%/;
            };
            const expected = func();
            const src = sprintf(placeholder.toString(), {funcSource: func.toString()}, 'sloppy');
            const result = new Function(`return ${src};`)();
            
            expect(result()()).to.eql(expected);
            testDone();
        });

        it('with function code & var, neat mode', (testDone) => {
            const func = function(){return 'test';};
            const placeholder = function(){
                const not_used = /%absentKey%/;
                return /%funcSource%/;
            };
            const expected = func();
            const src = sprintf(placeholder.toString(), {funcSource: func.toString()}, 'neat');
            const absent = /\/\%absentKey\%\//.test(src);
            const result = new Function(`return ${src};`)();
            expect(absent).to.eql(true);
            expect(result()()).to.eql(expected);
            testDone();
        });

        it('with function code & var, strict mode', (testDone) => {
            const func = function(){return 'test';};
            const placeholder = function(){
                const not_used = /%absentKey%/;
                return /%funcSource%/;
            };
            const expected = func();
            let src: string;
            try{
                src = sprintf(placeholder.toString(), {funcSource: func.toString()}, 'strict');
            }catch(err){
                expect(err.message).to.eql('gonzazoid.sprintf.js: missed absentKey entry in passed replacements');
                testDone();
            }
        });
    });
});
