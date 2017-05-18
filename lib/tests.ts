declare var describe: Mocha.IContextDefinition;

import { expect } from 'chai';
import {sprintf} from './index';

describe('sprintf.js', function(){

    describe('checks with function sources:', function(){

        it('with function code only', (testDone) => {
            const func = function(){return 'test';};
            const placeholder = function(){
                return /%funcSource%/;
            };
            const expected = func();
            const src = sprintf(placeholder.toString(), {'/%funcSource%/': func.toString()});
            const result = new Function(`return ${src};`)();
            
            expect(result()()).to.eql(expected);
            testDone();
        });
    });
});
